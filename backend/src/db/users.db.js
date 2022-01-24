const { query } = require('../config/connectDB');

const getAllUserDb = async () => {
    const users = await query("select user_id, user_name, email, address, gender, DATE_FORMAT(birthday, '%d/%m/%Y') birthday, phone_number, user_avatar from users");
    for (let index = 0; index < Object.keys(users).length; index++) {
        let userTotal=0;
        const orderByUser = await query(`
            select total 
            from orders
            where orders.user_id = ? and send = true and success = true
        `,[users[index].user_id]);
        // console.log(orderByUser);
        if (orderByUser[0]) {
            for (let index1 = 0; index1 < Object.keys(orderByUser).length; index1++) {
                userTotal = userTotal + +orderByUser[index1].total;
                // console.log(+orderByUser[index1].total);
            }
        } else {
            userTotal = 0;
        }
        users[index] = {...users[index],userTotal}
    }
    return users;
}

const getUserByIdDb = async ({ user_id }) => {
    const user = await query(`
    select users.*, cart.cart_id as cart_id 
    from users 
    left join cart on cart.user_id = users.user_id 
    where users.user_id = ?
    `, [user_id]);
    return user;
}

const getUserByUserNameDb = async ({ user_name }) => {
    const user = await query(`
    select users.*, cart.cart_id as cart_id 
    from users left join cart on cart.user_id = users.user_id 
    where users.user_name = ?
    `, [user_name]);
    return user;
}

const getUserByEmailDb = async ({ email }) => {
    const user = await query(`
    select users.user_id, users.user_name, users.email, users.password , users.address,  users.phone_number, users.gender, DATE_FORMAT(users.birthday, '%d/%m/%Y') birthday, users.user_avatar, cart.cart_id as cart_id 
    from users 
    left join cart on cart.user_id = users.user_id 
    where users.email = ?
    `, [email]);
    return user;
}

const createUserDb = async ({ user_name, gender, birthday, email, password }) => {
    await query(`
        insert into users(user_name, gender, birthday, email,password) 
        values(?,?,?,?,?)
    `, [user_name, gender, birthday, email, password]);

    const id = await query(`
        select user_id
        from users
        where users.email = ?
        
   `,[email]);

    const user = await query(`
        select *
        from users
        where users.user_id = ?
   `, id[0].user_id);

    return user;
}

const updateUserDb = async ({
    user_name,
    gender, 
    birthday,
    phone_number,
    address,
    user_avatar,
    user_id }) => {
   
    await query(`
        update users
        set user_name = ?,gender = ?,birthday=?,phone_number = ?,address = ? ,user_avatar = ?
        where users.user_id = ?
    `, [user_name, gender, birthday, phone_number, address, user_avatar, user_id]);

    const user = await query(`
    select user_id,user_name,email,address,phone_number,gender,birthday,user_avatar
    from users 
    where users.user_id = ? `, [user_id]);
    return user;
}

const deleteUserDb = async ({ user_id }) => {
    await query('delete from cart where cart.user_id = ?', [user_id]);
    await query('delete from orders where orders.user_id = ?', [user_id]);
    await query(`
        delete from cart_items
        where cart_items.cart_id not in (select cart_id from cart)
    `)
    await query('delete from users where users.user_id = ? ', [user_id]);

    const user = await getAllUserDb();
    return user;
}

const changePasswordFormDb = async({hashedPassword,user_id})=>{
    // console.log('hashPas' , hashedPassword);
    await query(`
        update users 
        set users.password = ?
        where users.user_id = ?
    `,[hashedPassword,user_id])
    return 2;
}

const changeUserPasswordDb = async (hashPassword, email) => {
    console.log(hashPassword, email);
    await query("update users set users.password = ? where users.email = ? ", [hashPassword, email]);
}

module.exports = {
    getAllUserDb,
    getUserByIdDb,
    getUserByEmailDb,
    getUserByUserNameDb,
    createUserDb,
    updateUserDb,
    deleteUserDb,
    changeUserPasswordDb,
    changePasswordFormDb
}