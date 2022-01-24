const { query } = require('../config/connectDB');

const getAllProductsDb = async () => {
    const products = await query(`
        select * 
        from products
    `);


    for (let index = 0; index < products.length; index++) {
        const imagesArray = [];
        const quantityArray = [];
        // products[index].product_id
        const images = await query(`
            select images.image_name
            from images
            where images.product_id = ?
        `, [products[index].product_id]);
        images.map(image => (imagesArray.push(image.image_name)));

        const quantity = await query(`
        select product_sizes.quantity
        from  product_sizes
        where product_sizes.product_id = ?
        `, [products[index].product_id]);

        quantity.map(quantity => (quantityArray.push(quantity.quantity)));
        console.log(">>>", imagesArray, ">>>", quantityArray);
        products[index] = { ...products[index], quantity: quantityArray, image_array: imagesArray }
    }

    return products;
}

const getProductById = async ({ id }) => {
    const product = await query("select * from products where products.product_id = ?", [id]);
    return product;
}


const createProductDb = async ({ product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array }) => {
    console.log(product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array);
    const product = await query(`
    select * from products 
    where products.product_name = ? 
    `, [product_name]);

    if (product[0]) {
        await query(
            `
        update products 
        set product_type=?,product_avatar=?,new_product=?,price=?,discount=?,bought_count=?
        where products.product_name = ?
        `
            , [product_type, product_avatar, new_product, price, discount, bought_count, product_name]);

        // console.log(product[0]);
        const id = await query(`
        select products.product_id 
        from products 
        where products.product_name = ? 
        `, [product_name]);

        await query(`
            delete from images
            where images.product_id = ?
        `, [id[0].product_id]);

        for (let index = 0; index < image_array.length; index++) {

            await query(`
                insert into images(product_id,image_name)
                values(?,?)
            `, [id[0].product_id, image_array[index]]);

        }

        await query(`
            delete from product_sizes
            where product_sizes.product_id = ?
        `, [id[0].product_id])

        for (let index1 = 0; index1 < quantity.length; index1++) {

            await query(`
                 insert into product_sizes(product_id,size,quantity)
                 values(?,?,?)
            `, [id[0].product_id, index1, quantity[index1]]);
        }

        const newProduct = await query(
            `
        select * from products 
        where products.product_name = ? 
        `, [product_name]);

        return newProduct;
    } else {
        await query(
            `
            Insert into products(product_name,product_type,product_avatar,new_product,price,discount,bought_count)
            values(?,?,?,?,?,?,?)
            `
            , [product_name, product_type, product_avatar, new_product, price, discount, bought_count]
        );

        const id = await query(`
            select product_id as id
            from products
            where product_name= ?
        `,[product_name]);

        for (let index = 0; index < image_array.length; index++) {

            await query(`
                insert into images(product_id,image_name)
                values(?,?)
            `, [id[0].id, image_array[index]]);

        }

        for (let index1 = 0; index1 < quantity.length; index1++) {

            await query(`
                insert into product_sizes(product_id,size,quantity)
                values(?,?,?)
           `, [id[0].id, index1, quantity[index1]]);
        }


        const newProduct = await query(
            `
        select * from products 
        where products.product_name = ? 
        `, [product_name]);

        return newProduct;
    }



}

const updateProductDb = async ({ id, product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array }) => {
    // console.log( id, product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array);
    await query(
        `
        update products 
        set product_name = ?,product_type=?,product_avatar=?,new_product=?,price=?,discount=?,bought_count=?
        where products.product_id= ?
    `
        , [product_name, product_type, product_avatar, new_product, price, discount, bought_count, id]);
    await query(`
        delete from images
        where images.product_id = ?
    `, [id]);
    for (let index = 0; index < image_array.length; index++) {

        await query(`
            insert into images(product_id,image_name)
            values(?,?)
        `, [id, image_array[index]]);
    }

    await query(`
    delete from product_sizes
    where product_sizes.product_id = ?
    `, [id])

    for (let index1 = 0; index1 < quantity.length; index1++) {

        await query(`
            insert into product_sizes(product_id,size,quantity)
            values(?,?,?)
        `, [id, index1, quantity[index1]]);
    }

    const newProduct = await query(
        `
        select * from products 
        where products.product_id = ? 
        `, [id]);
    return newProduct;
}

const deleteProductDb = async ({ id }) => {

    await query("delete from order_items where order_items.product_id = ?", [id]);
    await query("delete from cart_items where cart_items.product_id = ?", [id]);
    await query("delete from images where images.product_id = ?", [id]);
    await query("delete from product_sizes where product_sizes.product_id = ?", [id]);
    await query("delete from products where products.product_id = ?", [id]);
    const products = await query("select * from products ",);
    return { products };
}

module.exports = {
    getAllProductsDb,
    getProductById,
    createProductDb,
    updateProductDb,
    deleteProductDb
}