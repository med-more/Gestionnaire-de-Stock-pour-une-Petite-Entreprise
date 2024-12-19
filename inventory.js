const fs = require('fs');
const Product = require('./product');

class inventory{
    constructor(filePath){
        this.filePath = filePath;
        this.products = this.loadProducts();
    }

    loadProducts(){
        try{
            const data = fs.readFileSync(this.filePath);
            return JSON.parse(data);
        } catch (error){
            return [];
        }
    }

    save(){
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
    }

    addProduct(name, description, quantity, price){
        if(!name || quantity<=0 || price<=0){
            console.log("entrer valid information");
            return;
        }
        const id = this.products.length + 1; //generer un identifiant unique
        const product = new Product(id, name, description, quantity, price);
        this.products.push(product);
        this.save();
        console.log("produit ajouter");
    }
}