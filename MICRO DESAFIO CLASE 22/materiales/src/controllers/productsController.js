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
		const idProduct = req.params.id;
		const product = products.find( elemento => elemento.id == idProduct);
		res.render("detail", {product: product});
 	},

//  Create - Form to create
 	create: (req, res) => {
		res.render("product-create-form");
 	},
 	// Create -  Method to store
	store: (req, res) => {	
		const newProduct = req.body;
		newProduct.id = products.length + 1;
		newProduct.image = req.file.filename;
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
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

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const idProduct = req.params.id;
		const productsFilter = products.filter( elemento => elemento.id !== idProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsFilter, null, ' '));
		res.redirect('/products');
	}
};


module.exports = controller;