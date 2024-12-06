import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createUser, confirmUserLogin, getUser } from './code/login.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.post('/SignUp', async (req, res) => {
    // Sets values for email, password, and confirm password
    const { email, password, confirm_password } = req.body

    // Calls function
    const result = await createUser(email, password, confirm_password)
    
    res.send({
        message: "You have sucessfully signed up!",
        status: result
    })
})

app.post('/login', async (req, res) => {
    // Sets values for email and password
    const { email, password } = req.body
    
    // Calls function
    const result = await confirmUserLogin(email, password)

    res.send({
        status: true,
    })
})

app.listen(process.env.PORT || 3000)