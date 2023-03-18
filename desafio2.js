const fs = require ('fs').promises;

class ProductManager
{
    #products;
    idAuto = 1;
    path = ``;
    
    constructor(){
        this.#products = [];
        this.path = `./products.json`
    }

    async getProduct(){
        try
        {
            const productFile = await fs.readFile(this.path, "utf-8");
            return JSON.parse (productFile);
        }
        catch(error){
            await fs.writeFile(this.path, "[]");
            return "no existe el archivo. Ya se creo uno con un array vacio";
        }
    }

    async addProduct(product){
        try
        {
            const productFile = await fs.readFile(this.path, "utf-8");
            let newProduct = JSON.parse (productFile);

            const valid = newProduct.find(
                (p)=> p.id === product.id || p.code === product.code );

            if(valid){
                throw new Error ("Id o Code repetido no se puede creear el objeto.")
            }

            if (newProduct.length > 0) {
                const lastProduct = newProduct [newProduct.length - 1];
                this.idAuto = lastProduct.id + 1;
            }
            newProduct.push({
                id: this.idAuto++,
                ...product,
            }); 
            await fs.writeFile(this.path, JSON.stringify(newProduct,null,2));
            return "Objeto creado correctamente"

        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById (id){
        try 
        {
            const productFile = await fs.readFile(this.path, "utf-8");
            let idProduct = JSON.parse (productFile);

            const findProduct = idProduct.find ( (p) => p.id === id);

            if (!findProduct) {
                throw new Error ("No se encontro este producto")
            }
            return findProduct;
        } catch (error) {
            throw new Error(error);
        }
    }


    async updateProduct (id, product){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
        let products = JSON.parse (productFile);

        const idProduct = products.findIndex ((p) => p.id === id);

        products.splice (idProduct, 1, {id, ...product});

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));

        return "Producto modificado de forma correcta"
        }catch (error) {
            throw new Error (error);
        }
    }


    async deleteProduct (id){

        try
        {
        const productFile = await fs.readFile(this.path, "utf-8");
        let products = JSON.parse (productFile);
        const idProduct = products.find((p) => p.id === id);

        if(!idProduct) {
            throw new Error ("El id no existe")
        }
        const deletedProducts = products.filter((p) => p.id !== id);

        await fs.writeFile(this.path, JSON.stringify(deletedProducts, null, 2));

        return "Producto eliminado de forma correcta"

        }catch (error) {
            throw new Error (error);
        }
    }
}


const product1 = {
    title: "Producto de prueba",
    descripcion: "este es un producto de prueba",
    price: 400,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25,

};

const product2 = {
    title: "Producto de prueba2",
    descripcion: "este es un producto de prueba2",
    price: 300,
    thumbnail: "sin imagen",
    code: "abc125",
    stock: 25,

};

const pm = new ProductManager();

const generate = async () => {
    console.log (await pm.addProduct (product1));
    console.log (await pm.addProduct (product2));
}

/* generate(); */


const main = async () => {
    console.log ("Lista de productos: ", await pm.getProduct());
    console.log ("Producto encontrado: ", await pm.getProductById(1));
    console.log (await pm.updateProduct(2, {...product1, code: "PAPURRI"}));
    console.log ("lista de Productos Modificados: ", await pm.getProduct());
    console.log (await pm.deleteProduct(1));
    console.log ("lista de Productos ELIMINADOS: ", await pm.getProduct());
}
main(); 