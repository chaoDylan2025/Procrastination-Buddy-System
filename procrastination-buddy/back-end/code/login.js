import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function createUser(emailId, password, confirmPassword){
    var email = await getUser(emailId)
    if(email.length != 0){
        if(emailId == email[0].user_email){
            return "Email already exists";
        }
    }

    if(email != undefined && password != confirmPassword){
        return "Password does not match"
    }

    else{
        await pool.query(`
            INSERT INTO users (user_email, user_password)
            VALUES (?, ?)`, [emailId, password] )
        return true
    }
}

export async function getUser(emailId){
    const [email] = await pool.query(`
    SELECT * from users
    WHERE user_email = ?`, [emailId])
    
    return email
}

export async function confirmUserLogin(email, password){
    let userEmail = await getUser(email);

    if(userEmail == undefined){
        return "Email does not exist"
    }

    const [user] = await pool.query(`
    SELECT * FROM users
    WHERE user_email = ? AND user_password = ?`, [email, password])

    if(user.length == 0){
        console.log("Password does not match...")
        return "Password is incorrect"
    }
    else{
        return "Login confirmed!"
    }
}