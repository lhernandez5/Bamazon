var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;
var purchase = 0;
var { table } = require("table");
var data_1, output_1;
var connection = mysql.createConnection({
  host: "localhost",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  user: "root",
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  //after we have made our connection we will run the start function
  readProducts();
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          message: "What is the 'item_id' of the item you would like to buy?",
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
            if (results[i].stock_quantity >= parseInt(answer.amount)) {
              newStockAmount = results[i].stock_quantity - itemQuant;
              purchase = results[i].price * parseFloat(answer.amount);
              total += purchase;
              productSales += purchase;
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newStockAmount,
                    // product_sales: productSales
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
              readProducts();
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

function readProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    data_1 = [];
    data_1.push([
      "item_id",
      "product_name",
      "department_name",
      "price",
      "stock_quantity",
      // "product_sales"
    ]);
    for (var i = 0; i < results.length; i++) {
      data_1.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price.toFixed(2),
        results[i].stock_quantity,
        // results[i].product_sales.toFixed(2)
      ]);
    }
    output_1 = table(data_1);
    console.log(output_1);
  });
}