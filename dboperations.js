const config = require('./dbconfig')
const sql = require('mssql')


async function getUsers() {
    let pool = await sql.connect(config);

    let users = await pool.request().query(" SELECT * FROM user1 ")

    console.log(users);
    return users.recordsets;
}

async function getUserById(id) {
    let pool = await sql.connect(config);

    let user = await pool.request()
                        .input('userId', sql.Int, id)
                        .query(' SELECT * FROM user1 WHERE id = @userId');

    return user.recordsets
}

async function addUser(body){

    let pool = await sql.connect(config);

    if(!validateEmail(body.email)){
        return [{"error" : "this email is Invalid"}] 
    }

    let checkUserNameDB = await pool.request()
                                .input('username', sql.VarChar, body.username)
                                .query("SELECT * FROM user1 WHERE username = @username")
    if(checkUserNameDB.rowsAffected[0] > 0){
        return [{"error" : "this username is already exists"}]
    }

    let checkEmailDB = await pool.request()
                                .input('email', sql.VarChar, body.email)
                                .query("SELECT * FROM user1 WHERE email = @email")
    if(checkEmailDB.rowsAffected[0] > 0){
        return [{"error" : "this email is already exists"}]
    }

    if(isNaN(body.age)){
        return [{"error" : "The age should not have any charcters"}]
    }

    if(!(validatePassword(body.password)) && body.password.length <= 20){
        return [{"error" : "The Password should have at least one number and lenght 9"}]
    }


    let user = await pool.request()
                        .input("userId" , sql.Int, body.id)
                        .input("userUserName" , sql.VarChar, body.username)
                        .input("userEmail" , sql.VarChar, body.email)
                        .input("userPass" , sql.VarChar, body.password)
                        .input("userPhone", sql.Int, body.phone)
                        .input("userAge", sql.Int, body.age)
                        .query("INSERT INTO user1 VALUES (@userId,@userUserName,@userEmail,@userPass,@userPhone,@userAge)");

    return user.recordsets;

}
function validateEmail(email) {

    // regex pattern for email
    const re = /\S+@\S+\.\S+/g;
    
    // check if the email is valid
    let result = re.test(email);
    if (result) {
        return true
    }
    else {
        return false
    }
}
function validatePassword(password){

    // regex pattern for password
    const re = /^(?=.*?[0-9]).{9,}/

    // check if the password is valid
    let result = re.test(password)
    if(result)
        return true
    else
        return false
}

async function deleteUser(id){
    let pool = await sql.connect(config)

    let user = await pool.request()
                        .input("userId", sql.Int, id)
                        .query("DELETE FROM user1 WHERE id = @userId")
    
    return user.recordsets
}

async function updateUser(body){
    let pool = await sql.connect(config)

    let user = await pool.request()
                        .input("userId" , sql.Int, body.id)
                        .input("userUserName" , sql.VarChar, body.username)
                        .input("userEmail" , sql.VarChar, body.email)
                        .input("userPass" , sql.VarChar, body.password)
                        .input("userPhone", sql.Int, body.phone)
                        .input("userAge", sql.Int, body.age)
                        .query("UPDATE user1 set username = @userUserName, email = @userEmail, password = @userPass, phone = @userPhone, age = @userAge WHERE id = @userId")
    
    return user.recordsets
}

module.exports = {
    getUsers : getUsers,
    getUserById : getUserById,
    addUser : addUser,
    deleteUser : deleteUser,
    updateUser : updateUser
}