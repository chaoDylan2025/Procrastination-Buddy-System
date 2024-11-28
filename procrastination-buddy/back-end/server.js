import express from 'express'
import cors from 'cors'
import { createUser, confirmUserLogin } from './code/login.js'
const app = express()

app.use(express.json())
app.use(cors())

app.post('/SignUp', async (req, res) => {
    // Sets values for email, password, and confirm password
    const { email, password, confirm_password } = req.body

    // Calls function
    const result = await createUser(email, password, confirm_password)
    
    res.send({
        status: result
    })
})

app.post('/login', async (req, res) => {
    //Sets values for email and password
    console.log(req.body)
    const { email, password } = req.body
    console.log("Email: " + email)
    console.log("Password: " + password)

    // Calls function
    const result = await confirmUserLogin(email, password)

    res.send({
        status: result
    })
})

app.listen(process.env.PORT || 3000)