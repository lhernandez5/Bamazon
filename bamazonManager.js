// Create a new Node application called bamazonManager.js. Running this application will:
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

var mysql = require("mysql");
var inquirer = require("inquirer");
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
              for (var i = 0; i < results.length; i++) {
                console.log(
                  "ID: " +
                    results[i].item_id +
                    " | Quantity: " +
                    results[i].stock_quantity +
                    " | Product: " +
                    results[i].product_name
                );
              }
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
              console.log(
                results[parseInt(answer.choice) - 1].stock_quantity +
                  parseInt(answer.quantity)
              );
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
                  // connection.query("SELECT * FROM products", function(
                  //   err,
                  //   results
                  // ) {
                  //   if (err) throw err;
                  //   for (var i = 0; i < results.length; i++) {
                  //     console.log(
                  //       "ID: " +
                  //         results[i].item_id +
                  //         " | Quantity: " +
                  //         results[i].stock_quantity +
                  //         " | Product: " +
                  //         results[i].product_name
                  //     );
                  //   }
                  //   
                  // });
                  readProducts();
                  start();
                }
              );
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
                message: "What department does the item belong to?",
              },
              {
                name: "price",
                type: "input",
                message: "What will be the price of the item?",
              },
              {
                name: "quantity",
                type: "input",
                message: "How many items would you like to add?",
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
                  console.log("Your auction was created successfully!");
                  for (var i = 0; i < results.length; i++) {
                    console.log(
                      "ID: " +
                        results[i].item_id +
                        " | Quantity: " +
                        results[i].stock_quantity +
                        " | Product: " +
                        results[i].product_name
                    );
                  }
                  start();
                }
              );
            });
        }
      });
  });
}

function readProducts(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log(
        "ID: " +
          results[i].item_id +
          " | Quantity: " +
          results[i].stock_quantity +
          " | Product: " +
          results[i].product_name
      );
    }
  });
}
