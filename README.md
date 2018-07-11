# bamazon
This is an Amazon-like storefront app that will take in orders from customers and deplete stock from the store's inventory. And the app will track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.
<br>
<br>
<h2>Customer View:</h2>
Running the Node application called bamazonCustomer.js will: 
Prompt users with two messages.
<li>The first should ask them the ID of the product they would like to buy.</li>
<li>The second message should ask how many units of the product they would like to buy.</li>
<li>The total will be displayed and notifies the user that their purchase was successful.</li>
<br>
<img width="638" alt="bamazoncustomer_buy_items" src="https://user-images.githubusercontent.com/22462010/42485332-30c9d5c0-83c5-11e8-8529-d1d06c8e8fbc.png">
<br>
<img width="638" alt="bamazoncustomertotal" src="https://user-images.githubusercontent.com/22462010/42485365-5a4ee692-83c5-11e8-884a-93cb3619922b.png">
<br>
<h2>Manager View:</h2>
Running the Node application called bamazonManager.js will: 
List a set of menu options:
<li>View Products for Sale</li>
<li>View Low Inventory</li>
<li>Add to Inventory</li>
<li>Add New Product</li>
If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
<br>
<img width="363" alt="bamazonmanager_cli_options" src="https://user-images.githubusercontent.com/22462010/42486290-46b4f226-83c9-11e8-8ea6-1475f0b16508.png">
<br>
<img width="638" alt="bamazonmanager_view_products_for_sale" src="https://user-images.githubusercontent.com/22462010/42486240-05c75f56-83c9-11e8-8c47-69b172bfc88b.png">
<br>
<img width="638" alt="bamazonmanager_view_low_products" src="https://user-images.githubusercontent.com/22462010/42486324-892543e0-83c9-11e8-8567-64abea97ef6c.png">
<br>
<img width="638" alt="bamazonmanager_add_more_to_inventory" src="https://user-images.githubusercontent.com/22462010/42486380-d4c2b0b2-83c9-11e8-9bb7-096867c8e36e.png">
<br>
<img width="638" alt="bamazonmanager_add_new_product" src="https://user-images.githubusercontent.com/22462010/42486358-bde9e202-83c9-11e8-8a1d-59de23975048.png">
<br>
<h2>Supervisor View:</h2>
<li>When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.</li>
<li>Create New Department allows the supervisor user to add a department.</li>
<br>
<img width="386" alt="bamazonsupervisor_options" src="https://user-images.githubusercontent.com/22462010/42486465-4256db12-83ca-11e8-9177-005004399815.png">
<br>
<img width="638" alt="bamazonsupervisor_view_sales" src="https://user-images.githubusercontent.com/22462010/42486542-94f3baa2-83ca-11e8-8bed-7be8b65f1a14.png">
<br>
<img width="537" alt="bamazonsupervisor_create_department" src="https://user-images.githubusercontent.com/22462010/42486543-9729dbda-83ca-11e8-80d6-cbd8d49bc653.png">
