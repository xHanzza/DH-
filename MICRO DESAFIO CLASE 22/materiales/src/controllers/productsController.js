const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
			res.render("products", {products});
		},
	

// 	// Detail - Detail from one product
	detail: (req, res) => {
		res.render("/detail/:id", products)
 		// Do the magic
 	},

//  Create - Form to create
 	create: (req, res) => {
		res.render("product-create-form");

 	},
	
 	// Create -  Method to store
	store: (req, res) => {	
		 const newProduct = req.body;
		 newProduct.id = products.length + 1;
		 products.push(newProduct);
		 fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/')
 	},

// 	// Update - Form to edit
 	edit: (req, res) => {
		res.render("product-edit-form");
// 		// Do the magic
 	},
// 	// Update - Method to update
// 	update: (req, res) => {
// 		// Do the magic
// 	},

// 	// Delete - Delete one product from DB
// 	destroy : (req, res) => {
// 		// Do the magic
// 	}
// };
}

module.exports = controller;