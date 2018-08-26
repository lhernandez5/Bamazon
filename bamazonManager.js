var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");
var data, output;
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
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "action",
          type: "rawlist",
          message: "What action would you like to make?",
          choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
          ],
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        if (answer.action === "View Products for Sale") {
          readProducts();
          start();
        } else if (answer.action === "View Low Inventory") {
          // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
          connection.query(
            "SELECT * FROM products WHERE stock_quantity < 5",
            function(err, results) {
              if (err) throw err;
              data = [];
              data.push([
                "item_id",
                "product_name",
                "department_name",
                "price",
                "stock_quantity",
                "product_sales"
              ]);
              for (var i = 0; i < results.length; i++) {
                data.push([
                  results[i].item_id,
                  results[i].product_name,
                  results[i].department_name,
                  results[i].price.toFixed(2),
                  results[i].stock_quantity,
                  results[i].product_sales.toFixed(2)
                ]);
              }
              output = table(data);
              console.log(output);
              start();
            }
          );
        } else if (answer.action === "Add to Inventory") {
          inquirer
            .prompt([
              {
                name: "choice",
                type: "rawlist",
                choices: function() {
                  var choiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                    choiceArray.push(
                      results[i].item_id + " " + results[i].product_name
                    );
                  }
                  return choiceArray;
                },
                message: "What item would you like to add to?"
              },
              {
                name: "quantity",
                type: "input",
                message: "How many items you would like to add?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }
            ])
            .then(function(answer) {
              var amount =
                results[parseInt(answer.choice) - 1].stock_quantity +
                parseInt(answer.quantity);
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: amount
                  },
                  {
                    item_id: parseInt(answer.choice)
                  }
                ],
                function(err, res) {
                  if (err) throw err;
                }
              );
              readProducts();
              start();
              console.log("Your update was successful.");
            });
        } else if (answer.action === "Add New Product") {
          inquirer
            .prompt([
              {
                name: "add",
                type: "input",
                message: "What item would you like to add?"
              },
              {
                name: "department",
                type: "input",
                message: "What department does the item belong to?"
              },
              {
                name: "price",
                type: "input",
                message: "What will be the price of the item?"
              },
              {
                name: "quantity",
                type: "input",
                message: "How many items would you like to add?"
              }
            ])
            .then(function(answer) {
              connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answer.add,
                  department_name: answer.department,
                  price: parseFloat(answer.price),
                  stock_quantity: parseInt(answer.quantity)
                },
                function(err) {
                  if (err) throw err;
                  console.log("You added another product successfully!");
                });

              readProducts();
              start();
            });
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
      "product_sales"
    ]);
    for (var i = 0; i < results.length; i++) {
      data_1.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price.toFixed(2),
        results[i].stock_quantity,
        results[i].product_sales.toFixed(2)
      ]);
    }
    output_1 = table(data_1);
    console.log(output_1);
  });
}
