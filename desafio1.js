
    class Product 
{
    id = null
    constructor (title, description, price, thumbnail, code, stock )
    {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;   
    } 
} 

class ProductManager
{
    products = [];
    idAuto = 1;

    getProduct()
    {
        return this.products;
    }

    addProduct(product)
    {
        const productFind = this.products.find ( p => product.code === p.code) // validacion de code
        if (productFind) {
            throw new Error ('Ya hay un producto con ese codigo');
        }

        product.id = this.idAuto
        this.products.push(product)
        this.idAuto = this.idAuto + 1;
    }
    getByProductId (idSearch) {
        const idFinde = this.products.find ( i => idSearch === i.id); 
        if (!idFinde) {
            throw new Error ('Not found');
        } 
        return idFinde;
    }
}

const productManager = new ProductManager();

productManager.addProduct ( new Product('Cerveza Negra', 'maltas oscuras provenientes del cereal malteado (humedecido, germinado y secado)' , 100 , 'sin imagen', 'A123' , 10 ));
productManager.addProduct ( new Product('Cerveza Roja', 'De color cobre profundo con espuma densa y cremosa. aromas a caramelo con suaves notas a lúpulo. En boca se denota un leve dulzor y sabor a granos tostados.' , 190 , 'sin imagen', 'A121' , 30 ));
productManager.addProduct ( new Product('Cerveza IPA', 'cervezas de alta graduación alcohólica, al tener una mayor cantidad de lúpulo y por lo tanto un amargor  y aroma intensos y cierta complejidad en el paladar.' , 150 , 'sin imagen', 'A124' , 20 ));

console.log(productManager.getProduct()); 
console.log (productManager.getByProductId (2));