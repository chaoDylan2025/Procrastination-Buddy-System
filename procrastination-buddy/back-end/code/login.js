import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// Configure MySQL setup
export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Creates an account for a user
export async function createUser(emailId, password, confirmPassword){
    var email = await getUser(emailId)

    // Prevents user from using same email for a different account
    if(email.length != 0){
        if(emailId == email[0].user_email){
            return "Email already exists";
        }
    }

    // Prevent user from creating an account if password and confirmed password does not match
    if(email != undefined && password != confirmPassword){
        return "Password does not match"
    }

    // Inserts new account into database that stores user's login information
    else{
        await pool.query(`
            INSERT INTO users (user_email, user_password)
            VALUES (?, ?)`, [emailId, password] )
        return true
    }
}

// Get an array that contains user's data from the users data table
export async function getUser(emailId){
    const [email] = await pool.query(`
    SELECT * from users
    WHERE user_email = ?`, [emailId])
    
    return email
}

// Logging in the user
export async function confirmUserLogin(email, password){
    let userEmail = await getUser(email);

    // Prevents user from logging in if email does not exist
    if(userEmail == undefined){
        return "Email does not exist"
    }

    // Checks to see if entered data is in users data table
    const [user] = await pool.query(`
    SELECT * FROM users
    WHERE user_email = ? AND user_password = ?`, [email, password])

    // If nothing has been returned, prevent user from logging in
    if(user.length == 0){
        console.log("Password does not match...")
        return "Password is incorrect"
    }
    else{
        return "Login confirmed!"
    }
}