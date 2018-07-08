var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;
var purchase = 0;
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  //after we have made our connection we will run the start function
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.log(results);
    for (var i = 0; i < results.length; i++) {
      console.log(
        "ID: " +
          results[i].item_id +
          "  Quantity: " +
          results[i].stock_quantity +
          "  Product: " +
          results[i].product_name +
          "  Product Sales: " +
          results[i].product_sales
      );
    }
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          message: "What is the id of the item you would like to buy?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "amount",
          type: "input",
          message: "How many items you would like to buy?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var itemQuant = 0;
        var newStockAmount = 0;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.item_id)) {
            chosenItem = results[i].product_name;
            itemPrice = results[i].price;
            itemQuant = parseInt(answer.amount);
            // console.log(chosenItem);
            // console.log(itemPrice);
            // console.log(itemQuant);
            // console.log(results[i].stock_quantity);
            if (results[i].stock_quantity >= parseInt(answer.amount)) {
              newStockAmount = results[i].stock_quantity - itemQuant;
              console.log(newStockAmount);
              purchase = results[i].price * parseFloat(answer.amount);
              total += purchase;
              var productSales = results[i].product_sales;
              productSales += purchase;
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newStockAmount,
                    product_sales: productSales
                  },
                  {
                    item_id: results[i].item_id
                  }
                ],
                function(err) {
                  if (err) throw err;
                  console.log("Purchase was made successfully!");
                }
              );
              console.log("Your total is $" + total.toFixed(2));
              start();
            } else {
              console.log("Insufficient quantity!");
              start();
            }
          }
        }
      });
  });
}
