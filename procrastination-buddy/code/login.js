import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function createUser(emailId, password, confirmPassword){
    if(password != confirmPassword){
        return "Password does not match"
    }
    else{
        await pool.query(`
            INSERT INTO users (user_email, user_password)
            VALUES (?, ?)`, [emailId, password] )
        return "Account has been created"
    }
}

async function getUser(emailId){
    const [email] = await pool.query(`
    SELECT * from users
    WHERE user_email = ?`, [emailId])
    
    return email
}

async function confirmUserLogin(email, password){
    let userEmail = await getUser(email);

    if(userEmail == undefined){
        return "Email does not exist"
    }

    const [user] = await pool.query(`
    SELECT * FROM users
    WHERE user_email = ? AND user_password = ?`, [email, password])

    if(user.length == 0){
        return "Password is incorrect"
    }
    else{
        return "Login confirmed!"
    }
}

console.log(await createUser("user3@gmail.com", "Passwords1", "Passwords1"))
// let loginConfirmation = await confirmUserLogin("student01@gmail.com", "Password123")
// console.log(loginConfirmation)