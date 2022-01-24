const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const moment = require('moment');
const current_Date = moment().format();
const proCess = require('../jwt/nodemon.json');

const { ErrorHandler } = require('../helpers/errors');
const { createCartDb } = require('../db/cart.db');
const { changeUserPasswordDb } = require('../db/users.db');
const validateUser = require('../helpers/validateUser');
const {
    isValidTokenDb,
    createResetTokenDb,
    setTokenDb,
    setTokenStatusDb,
    deleteTokenDb
} = require('../db/auth.db');

const {
    createUserDb,
    getUserByEmailDb,
    getUserByUserNameDb
} = require('../db/users.db');

const mail = require('./mail.service');
const { use } = require('../route/auth');

const signUpService = async (user) => {
    try {
        const { user_name, email, password } = user;

        if (!user_name || !email || !password) {
            throw new ErrorHandler(401, "missing required fields");
        }
        if (validateUser(email, password)) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const userByEmail = await getUserByEmailDb({ email });

            if (Object.keys(userByEmail).length > 0) {
                throw new ErrorHandler(401, "Email already in use");
            }

            const newUser = await createUserDb({
                ...user,
                password: hashedPassword
            });

            // console.log(newUser[0].user_id);
            const cart_id = await createCartDb(newUser[0].user_id);

            const token = await signToken({
                user_id: newUser[0].user_id,
                cart_id
            });

            const refreshToken = await signRefreshToken({
                user_id: newUser[0].user_id,
                cart_id
            });

            return {
                token,
                refreshToken,
                user: {
                    user_id: newUser[0].user_id,
                    user_name: newUser[0].user_name,
                    email: newUser[0].email,
                }
            }


        } else {
            throw new ErrorHandler(401, "Input validation error");
        }
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const loginService = async ({ email, password }) => {
    try {
        if (!validateUser(email, password)) {
            //throw new ErrorHandler(403, "Đăng nhập không hợp lệ");
            return {
                token: "",
                refreshToken: "",
                user: {
                    user_id: "",
                    user_name: ""
                },
                err: "Đăng nhập không hợp lệ"
            };
        }

        const user = await getUserByEmailDb({ email });
        if (Object.keys(user).length == 0) {
            //throw new ErrorHandler(403, "Tài khoản này không tồn tại vui lòng đăng ký");
            return {
                token: "",
                refreshToken: "",
                user: {
                    user_id: "",
                    user_name: ""
                },
                err: "Tài khoản này không tồn tại vui lòng đăng ký"
            };
        }

        console.log("user: ", user);

        const isCorrectPassword = await bcrypt.compare(password, user[0].password);

        if (!isCorrectPassword) {
            //throw new ErrorHandler(403, "Sai mật khẩu");
            return {
                token: "",
                refreshToken: "",
                user: {
                    user_id: "",
                    user_name: ""
                },
                err: "Sai mật khẩu"
            };
        }

        const token = await signToken({
            user_id: user[0].user_id,
            cart_id: user[0].cart_id
        });

        const refreshToken = await signRefreshToken({
            user_id: user[0].user_id,
            cart_id: user[0].cart_id
        });

        return {
            token,
            refreshToken,
            user: {
                user_id: user[0].user_id,
                user_name: user[0].user_name,
                email: user[0].email,
                address: user[0].address,
                phone_number: user[0].phone_number,
                gender: user[0].gender,
                birthday: user[0].birthday,
                user_avatar: user[0].user_avatar
            },
            err: ""
        };
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}



const signToken = async (data) => {
    try {
        return jwt.sign(data, proCess.env.ACCESS_TOKEN_SECERT, { expiresIn: "60s" });
    } catch (error) {
        throw new ErrorHandler(500, error.message);
    }
}


const signRefreshToken = async (data) => {
    try {
        return jwt.sign(data, proCess.env.REFRESH_TOKEN_SECERT, { expiresIn: "30d" });
    } catch (error) {
        throw new ErrorHandler(500, error.message);
    }
}


const generateRefreshTokenService = async (data) => {
    const payload = await verifyRefreshToken(data);
    const token = await signToken(payload);
    const refreshToken = await signRefreshToken(payload);
    return {
        token,
        refreshToken
    }
}

const verifyRefreshToken = async (token) => {
    try {
        const payload = jwt.verify(token, proCess.env.REFRESH_TOKEN_SECERT);
        return {
            user_id: payload.user_id,
            cart_id: payload.cart_id
        }
    } catch (error) {
        throw new ErrorHandler(500, error.message);
    }
}


const forgotPasswordService = async (email) => {
    const user = await getUserByEmailDb({ email });
    //  console.log(user);
    // console.log(email);
    if (Object.keys(user[0].length > 0)) {
        try {
            await setTokenStatusDb(email);

            //Create a random reset token
            var token = crypto.randomBytes(64).toString("hex");

            //token expires after one hour
            var expriration = moment().add(1, "h").format();
            console.log(expriration);
            await createResetTokenDb({ email, token, expriration });

            await mail.forgotPasswordMail(token, email);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    } else {
        throw new ErrorHandler(400, "Email not found");
    }
}


const verifyResetTokenService = async ({ token, email }) => {
    try {
        await deleteTokenDb({ current_Date });
        console.log(token, email, current_Date);
        const isValid = await isValidTokenDb({ token, email, current_Date });
        return isValid;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }

}

const resetPasswordService = async (password, confirmPassword, token, email) => {
    // console.log(password, confirmPassword, token, email);
    const isValidPassword =
        typeof password === "string" && password.trim().length >= 6;

    if (password !== confirmPassword) {
        throw new ErrorHandler(400, "Password do not match.");
    }

    if (!isValidPassword) {
        throw new ErrorHandler(
            400,
            "Password length must be at least 6 characters"
        );
    }

    try {
        const isTokenValid = await isValidTokenDb({
            token,
            email,
            current_Date,
        });

        if (!isTokenValid)
            throw new ErrorHandler(
                400,
                "Token not found. Please try the reset password process again."
            );

        await setTokenStatusDb(email);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("PASS", password, "hased", hashedPassword);
        await changeUserPasswordDb(hashedPassword, email);
        await mail.resetPasswordMail(email);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

module.exports = {
    signUpService,
    loginService,
    generateRefreshTokenService,
    verifyResetTokenService,
    forgotPasswordService,
    resetPasswordService
}