const bcrypt = require("bcrypt");
const {
    getAllUserDb,
    getUserByIdDb,
    getUserByEmailDb,
    getUserByUserNameDb,
    createUserDb,
    updateUserDb,
    deleteUserDb,
    changePasswordFormDb
} = require('../db/users.db');
const {ErrorHandler} = require('../helpers/errors');

const getAllUserService = async()=>{
    try {
        return await getAllUserDb();
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const  getUserByIdService = async(user_id)=>{
    try {
        return await  getUserByIdDb(user_id);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const  getUserByEmailService = async(email)=>{
    try {
        return await  getUserByEmailDb(email);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const  getUserByUserNameService = async(user_name)=>{
    try {
        return await  getUserByUserNameDb(user_name);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const  createUserService = async(data)=>{
    try {
        return await  createUserDb(data);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const   deleteUserService = async(user_id)=>{
    try {
        return await  deleteUserDb(user_id);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const   updateUserService = async(user)=>{
    
    try {
        return  await updateUserDb(user);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

const changePasswordFormService = async(data)=>{
    const {password,newPassword,user_id} = data;
    // console.log(password,newPassword,user_id);
    // return 2;
    const user = await getUserByIdDb({user_id});
    const isCorrectPassword = await bcrypt.compare(password,user[0].password);
    // console.log(user,isCorrectPassword);
    // return 2;
    try {
        if (!isCorrectPassword) {
            return 0;
        }else{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword,salt);
            return await changePasswordFormDb({hashedPassword,user_id});
        }
    } catch (error) {
        throw new ErrorHandler(error.statusCode,error.message);
    }
    
}

module.exports = {
    getAllUserService,
    getUserByIdService,
    getUserByEmailService,
    getUserByUserNameService,
    createUserService,
    deleteUserService,
    updateUserService,
    changePasswordFormService
}

