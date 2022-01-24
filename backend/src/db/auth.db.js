const {query} = require('../config/connectDB');

const isValidTokenDb = async({token,email,current_Date})=>{
    console.log(token,email,current_Date);
    const isValid =  await query(`
        select exists(
            select * 
            from resetTokens
            where  resetTokens.token = ? and resetTokens.email=? and resetTokens.expriration > ? and resetTokens.used = ?
        ) as checkCount
    `,[token,email,current_Date,false]);
    return isValid[0].checkCount;
}

const createResetTokenDb = async({email,token,expriration})=>{
    await query(`
        insert into resetTokens(email,token,expriration)
        values(?,?,?)
    `,[email,token,expriration]);

    return true;
}

const setTokenDb = async({email})=>{
    await query("update resetTokens set resetTokens.used = ? where resetTokens.email=?",[true,email]);

    return true;
}

const setTokenStatusDb = async(email)=>{
   await query("update resetTokens set resetTokens.used = ? where resetTokens.email=?",[true,email]);
   return true;
}

const deleteTokenDb = async({current_Date})=>{
    await query("delete from resetTokens where resetTokens.expriration < ? ",[current_Date]);
    return true;
}

module.exports = {
    isValidTokenDb,
    createResetTokenDb,
    setTokenDb,
    setTokenStatusDb,
    deleteTokenDb
}