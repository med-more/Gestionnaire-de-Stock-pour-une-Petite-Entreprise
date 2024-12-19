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

    listeProducts(){
        if(this.products.length===0){
            console.log("pas des produits");
            return;
        }
        this.products.foreach((prodyct)=>{
            console.log(`ID : ${product.id}, nom : ${product.name}, description : ${product.description}, quantity : ${product.quantity}, price : ${product.price}`);
        });
    }

    updateProduct(id, quantity, price) {
        const product = this.products.find(p => p.id === id);
    
        if (!product) return console.log("Produit introuvable");
    
        if (quantity > 0) product.quantity = quantity;
        if (price > 0) product.price = price;
    
        if (quantity > 0 || price > 0) {
            this.save();
            console.log("Produit modifié");
        } else {
            console.log("Aucune modification");
        }
    }
    
}