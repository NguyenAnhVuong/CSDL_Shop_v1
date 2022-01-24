const {
  getAllUserService,
  getUserByIdService,
  getUserByEmailService,
  getUserByUserNameService,
  createUserService,
  deleteUserService,
  updateUserService,
  changePasswordFormService
} = require('../service/users.service');
const { ErrorHandler } = require("../helpers/errors");
const { query } = require('../config/connectDB');


const getAllUsers = async (req,res,next) => {
    console.log(req.user);
    const results = await getAllUserService();
    res.status(200).json(results);
};

const createUser = async (req,res,next) => {

    const user = await  createUserService(req.body);
    return res.status(201).json({
      status: "success",
      user,
    });
};

const getUserById = async (req,res,next) => {
    const  user_id  = req.params.user_id;
    // console.log(user_id);
    // const user = await getUserByIdService({user_id});
    // return res.status(200).json({user});
    if (user_id === req.user.user_id || req.user.user_id == 14) {
      try {
        const user = await getUserByIdService({user_id});
        return res.status(200).json(user);
      } catch (error) {
        throw new ErrorHandler(error.statusCode, "User not found");
      }
    }
    throw new ErrorHandler(401, "Unauthorized");
};

const getUserProfile = async (req, res) => {
    const  user_id  = req.user.user_id;

    const user = await  getUserByIdService( {user_id});

    return res.status(200).json({user});
};

const updateUser = async (req, res) => {
    const user_id= req.params.user_id;
    const req_user_id = req.user.user_id;
  const {
    user_name,
    gender, 
    birthday,
    phone_number,
    address,
    user_avatar } = req.body;
    // console.log({user_name, gender, birthday,phone_number,address,user_avatar,user_id ,req_user_id});
    // return res.json({message:'test'});
  if (+user_id === req.user.user_id || req.user.user_id ==1) {
    try {
      const user = await updateUserService({user_name,gender, birthday,phone_number,address,user_avatar,user_id });
      return res.status(201).json({user,message:"Profile was updated"});
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  throw new ErrorHandler(401, "Unauthorized");
};

const deleteUser = async (req, res) => {
    const user_id = req.params.user_id;
    // console.log(user_id);
    // const user = await deleteUserService({user_id});
    //   return  res.status(200).json({user});
    if (user_id === req.user.user_id || req.user.user_id == 1) {
      try {
        const user = await deleteUserService({user_id});
        res.status(200).json({user});
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    }else{
      throw new ErrorHandler(401, "Unauthorized");
    }
};

const changePasswordForm = async(req,res,next)=>{
    const user_id = req.user.user_id;
    const {password,newPassword} = req.body;
    // console.log(password,newPassword,user_id);
    const count = await changePasswordFormService({password,newPassword,user_id});
    return res.json(count);
}

module.exports = {
getAllUsers,
createUser,
getUserById,
updateUser,
deleteUser,
getUserProfile,
changePasswordForm,
};
