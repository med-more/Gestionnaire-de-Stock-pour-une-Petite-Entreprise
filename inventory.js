const fs = require('fs');
const Product = require('./product');

class Inventory{
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
        if(this.products.length === 0){
            console.log("pas des produits");
            return;
        }
        this.products.foreach((product)=>{
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
    
    deleteProduct(id){
        const index = this.products.findIndex((p) =>p.id ===id);
        if(index === -1){
            console.log("pas de produit");
            return;
        }
        this.products.splice(index, 1);
        this.save();
        console.log("produit supprimer");
    }
}

const inventory = new Inventory('product');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu(){
    console.log(`\n*** Menu ***\n`);
    console.log("1. Ajouter un produit");
    console.log("2. Liste des produits");
    console.log("3. Modifier Produit");
    console.log("4. Supprimer produit");
    console.log("5. Quitter");

    readline.question('choissisez une option :', (option)=>{
        switch(option){
            case '1':
                readline.question("entrer le nom :", (name) =>{
                    readline.question("entrer description :", (description)=>{
                        readline.question("entrer quantity :", (quantity)=>{
                            readline.question("entrer price :", (price)=>{
                                inventory.addProduct(name.trim(), description.trim(), parseInt(quantity), parseFloat(price));
                                mainMenu();
                            });
                        });
                    });
                });
            break;
            case '2':
                inventory.listeProducts();
                mainMenu();
            break;
            case '3':
                readline.question("entrer Id pour modifier :", (id)=>{
                    const productId = parseInt(id);
                    const product = inventory.products.find((p)=>p.id === productId);
                    if(!product){
                        console.log("pas de produit");
                        mainMenu();
                        return;
                    }
                    readline.question("entrer le nouveau quantity :", (quantity)=>{
                        readline.question("entrer le nouveau prix :", (price)=>{
                            product.quantity = quantity ? parseInt(quantity) : product.quantity;
                            product.price = price ? parseFloat(price) : product.price;
                            inventory.save();
                            console.log("produit est modifier");
                            mainMenu();
                        });
                    });
                });
            break;
            case '4':
                readline.question("entrer Id pour supprimer", (id)=>{
                    inventory.deleteProduct(parseInt(id));
                    mainMenu();
                });
            break;
            case '5':
                console.log("meerci!");
                readline.close();
            break;
            default :
                console.log("invalide option");
                mainMenu();
        }
    });
}
mainMenu();