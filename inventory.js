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
}