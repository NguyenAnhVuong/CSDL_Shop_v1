const { query } = require('../config/connectDB');
const { array } = require('../middleware/uploadProduct.middleware');
const { getCartDb } = require('./cart.db');

const createOrdersDb = async ({ cart_id, user_id, user_name, email, address, phone_number, note }) => {
  const userCart = await getCartDb({ user_id });
  let total = 0;
  // console.log(userCart);


  if (userCart[0]) {

    for (let index = 0; index < Object.keys(userCart).length; index++) {
      total = total + +userCart[index].oneItemTotal;
      // console.log("userCart[index].oneItemTotal: ", typeof userCart[index].oneItemTotal);
    }
    total += 25000.00;
    await query(`
      insert into orders(user_id,user_name,email,address,phone_number, note, total)
      values(?,?,?,?,?,?,?)
      `, [user_id, user_name, email, address, phone_number, note, total]);

    const order_id_list = await query(`
        select order_id
        from orders
        order by order_id desc
    `);

    console.log("id: ", order_id_list);

    const lastInsertOrder = await query("select * from orders where orders.order_id = ?", order_id_list[0].order_id);

    // coppy order_id vao order_items
    await query(`
          insert into order_items(order_id,product_id,quantity, size)
          select ? , product_id , quantity, size
          from cart_items 
          where cart_items.cart_id = ?
      `, [order_id_list[0].order_id, cart_id]);

    const last_order_items = await query(`
      select *
      from order_items
      order by id desc limit 1
    `);

    await query(`
      update product_sizes
      set product_sizes.quantity = product_sizes.quantity - ?
      where product_sizes.product_id = ?  and product_sizes.size = ?
    `, [last_order_items[0].quantity, last_order_items[0].product_id, last_order_items[0].size]);

    return lastInsertOrder;
  }

};

const getAllOrderDb = async () => {
  const orders = await query(`
    select * 
    from orders
  `);
  for (let index = 0; index < Object.keys(orders).length; index++) {
    const order_id = orders[index].order_id;
    const user_id = orders[index].user_id;
    const listProducts = await getAllProductsOrdersDb({ order_id, user_id });

    orders[index] = { ...orders[index], listProducts: listProducts }

  }
  return orders;
}

const getAllOrdersByUserIdDb = async ({ user_id }) => {
  // console.log(user_id);
  const orders = await query(`
    select * 
    from orders where user_id = ? order by order_id desc
  `, user_id);
  for (let index = 0; index < Object.keys(orders).length; index++) {
    const order_id = orders[index].order_id;
    const user_id = orders[index].user_id;
    const listProducts = await getAllProductsOrdersDb({ order_id, user_id });

    orders[index] = { ...orders[index], listProducts: listProducts }

  }
  return orders;
};

const getAllProductsOrdersDb = async ({ order_id, user_id }) => {
  // console.log(order_id, user_id);
  const order = await query(
    `SELECT products.*, order_items.quantity ,order_items.size
        from orders 
        join order_items on order_items.order_id = orders.order_id
        join products on products.product_id = order_items.product_id 
        where orders.order_id = ? and orders.user_id = ?`,
    [order_id, user_id]
  );
  return order;
};

const orderStatusUpdateDb = async ({ order_id, send, success }) => {
  await query(`
    update orders
    set send = ? , success = ?
    where orders.order_id = ?
  `, [send, success, order_id]);


  const lastOrders = await query(`
    select *
    from orders
    where orders.order_id = ?
  `, [order_id])

  const orderItem = await query(`
    select *
    from order_items
    where order_items.order_id = ?
  `, [order_id]);


  if (lastOrders[0].success == 1) {
    await query(`
    update products
    set bought_count = bought_count + ?
    where products.product_id = ?
    `, [orderItem[0].quantity, orderItem[0].product_id]);
  }
  return true;
}

const cancelAnOrderDb = async ({ order_id }) => {

  const orderItemCancel = await query(`
    select *
    from order_items
    where order_items.order_id = ?
  `, [order_id]);

  await query(`
    delete from order_items
    where order_items.order_id = ?
  `, [order_id]);

  await query(`
  delete from orders
  where orders.order_id =?
  `, [order_id]);

  await query(`
    update product_sizes
    set product_sizes.quantity = product_sizes.quantity + ?
    where product_sizes.product_id = ? and product_sizes.size = ?
  `, [orderItemCancel[0].quantity, orderItemCancel[0].product_id, orderItemCancel[0].size]);

  return true;
}

module.exports = {
  createOrdersDb,
  getAllOrderDb,
  getAllOrdersByUserIdDb,
  getAllProductsOrdersDb,
  orderStatusUpdateDb,
  cancelAnOrderDb
}