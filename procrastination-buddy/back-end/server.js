import express from 'express'
import cors from 'cors'
import { createUser, userLogin } from './code/login.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Post request for creating a new account
app.post('/SignUp', async (req, res) => {
    // Sets values for email, password, and confirm password
    const { email, password, confirm_password } = req.body

    // Calls function
    const result = await createUser(email, password, confirm_password)

    res.send({
        status: result
    })
})

// Post request for logging in
app.post('/login', async (req, res) => {
    // Sets values for email and password
    const { email, password } = req.body

    // Call function
    const result = await userLogin(email, password)
    
    res.send({
        status: result,
    })
})

app.listen(process.env.PORT || 3000)