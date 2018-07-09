DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT(4) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(6,2) default 0,
  stock_quantity INT(10),
  product_sales DECIMAL(6,2) default 0,
  PRIMARY KEY(item_id)
);

CREATE TABLE departments(
  department_id INT(4) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100),
  over_head_costs DECIMAL(7,2) default 0,
  PRIMARY KEY(department_id)
);