var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");
var data, output;
var data_1, output_1;
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
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What action would you like to make?",
        choices: ["View Products Sales By Department", "Create New Department"],
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      if (answer.action === "View Products Sales By Department") {
        var query =
          "SELECT products.department_name, COALESCE(departments.over_head_costs,0) as over_head_costs, COALESCE(SUM(products.product_sales),0) AS product_sales, COALESCE(departments.over_head_costs-products.product_sales,0)as total_profit "
        query +=
          "FROM departments RIGHT JOIN products ON departments.department_name=products.department_name ";
        query +=
          "GROUP BY departments.department_name ORDER BY departments.department_id";

        connection.query(query, function(err, res) {
          data = [];
          data.push([
            "department_name",
            "over_head_costs",
            "product_sales",
            "total_profit"
          ]);
          for (var i = 0; i < res.length; i++) {
            data.push([
              res[i].department_name,
              res[i].over_head_costs.toFixed(2),
              res[i].product_sales.toFixed(2),
              res[i].total_profit.toFixed(2)
            ]);
          }
          output = table(data);
          console.log(output);
          start();
        });
      } else if (answer.action === "Create New Department") {
        inquirer
          .prompt([
            {
              name: "department",
              type: "input",
              message: "Name the department you would like to add?"
            },
            {
              name: "over_head_costs",
              type: "input",
              message: "What is the overhead costs?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
          .then(function(answer) {
            connection.query(
              "INSERT INTO departments SET ?",
              {
                department_name: answer.department,
                over_head_costs: answer.over_head_costs
              },
              function(err) {
                if (err) throw err;
                console.log("New department was made added successfully!");
              }
            );
            var query_1 =
              "SELECT departments.department_id, departments.department_name, departments.over_head_costs ";
            query_1 +=
              "FROM departments left JOIN products ON departments.department_name=products.department_name ";
            query_1 +=
              "GROUP BY departments.department_name ORDER BY departments.department_id";
            connection.query(query_1, function(err,result) {
              if (err) throw err;
              data_1 = [];
              data_1.push([
                "department_name",
                "over_head_costs"
              ]);
              for (var i = 0; i < result.length; i++) {
                data_1.push([
                  result[i].department_name,
                  result[i].over_head_costs.toFixed(2)
                ]);
              }
              output_1 = table(data_1);
              console.log(output_1);
              start();
            });
          });
        }
    });
}
