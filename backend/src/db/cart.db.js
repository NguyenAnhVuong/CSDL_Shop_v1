const { query } = require('../config/connectDB');


const createCartDb = async (user_id) => {
    await query(
        `
        insert into cart(user_id)
        values(?)
        `, [user_id]);
    const cart_id = await query(`
        select cart_id
        from cart
        where cart.user_id = ?
    `,[user_id]);
    return cart_id[0].id;
}

const getCartDb = async ({ user_id }) => {
    const cart = await query(
        `
        select products.*,cart_items.quantity,cart_items.size,round((products.price*cart_items.quantity*(1-products.discount/100)),2) as oneItemTotal
        from users
        join cart on cart.user_id = users.user_id
        join cart_items on cart.cart_id = cart_items.cart_id
        join products on products.product_id = cart_items.product_id 
        where users.user_id = ?
        `, [user_id])

    return cart; // tra ve full thong tin ve 1 san pham trong gio hang
}


const addItemDb = async ({ cart_id, product_id, size, quantity }) => {

    const cart_item = await query(`
        select *
        from cart_items
        where cart_items.cart_id = ? and cart_items.product_id = ? and size=?
    `, [cart_id, product_id, size]);
    console.log(typeof cart_item);
    if (cart_item[0]) {
        await query(
            `
            update cart_items
            set cart_items.quantity = cart_items.quantity + ?
            where cart_items.cart_id = ? and cart_items.product_id = ? and size = ? 
            `, [quantity, cart_id, product_id, size]);

        const cart = await query(`
            select products.*,cart_items.quantity,cart_items.size,round((products.price*cart_items.quantity),2) as oneItemTotal
            from cart_items
            join products on products.product_id = cart_items.product_id 
            where cart_items.cart_id = ?
        `, [cart_id]);

        return cart; // tra ve full thong tin ve 1 san pham trong gio hang
    } else {
        await query(`
            insert into cart_items(cart_id,product_id,size,quantity)
            values(?,?,?,?)
        `, [cart_id, product_id, size, quantity]);

        const cart = await query(`
        select products.*,cart_items.quantity,cart_items.size,round((products.price*cart_items.quantity),2) as oneItemTotal
        from cart_items
        join products on products.product_id = cart_items.product_id 
        where cart_items.cart_id = ?
        `, [cart_id]);

        return cart; // tra ve full thong tin ve 1 san pham trong gio hang
    }
}

const deleteItemDb = async ({ cart_id, product_id, size, user_id }) => {
    await query(
        `
        delete from cart_items
        where cart_items.cart_id = ? and cart_items.product_id = ? and size=?
        `, [cart_id, product_id, size])
    return getCartDb({ user_id });
}


const increaseItemQuantityDb = async ({ cart_id, product_id, size }) => {
    console.log(cart_id, product_id);
    await query(`
        update cart_items
        set cart_items.quantity = cart_items.quantity + 1
        where cart_items.cart_id = ? and cart_items.product_id = ? and cart_items.size = ?
    `, [cart_id, product_id, size]);

    const cart = await query(`
            select products.*,cart_items.quantity,cart_items.size,round((products.price*cart_items.quantity),2) as oneItemTotal
            from cart_items
            join products on products.product_id = cart_items.product_id 
            where cart_items.cart_id = ?
        `, [cart_id]);

    return cart; // tra ve full thong tin ve 1 san pham trong gio hang

}


const decreaseItemQuantityDb = async ({ cart_id, product_id, size }) => {
    await query(`
    update cart_items
    set cart_items.quantity = cart_items.quantity - 1
    where cart_items.cart_id = ? and cart_items.product_id = ? and cart_items.size = ?
    `, [cart_id, product_id, size]);

    const cart = await query(`
            select products.*,cart_items.quantity,cart_items.size,round((products.price*cart_items.quantity),2) as oneItemTotal
            from cart_items
            join products on products.product_id = cart_items.product_id 
            where cart_items.cart_id = ?
        `, [cart_id]);

    return cart; // tra ve full thong tin ve 1 san pham trong gio hang
}

const emptyCartDb = async (cart_id) => {
    return await query(`delete from cart_items where cart_items.cart_id = ? `, [cart_id]);

}

module.exports = {
    createCartDb,
    getCartDb,
    addItemDb,
    deleteItemDb,
    increaseItemQuantityDb,
    decreaseItemQuantityDb,
    emptyCartDb
}