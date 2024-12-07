import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createUser, confirmUserLogin, getUser } from './code/login.js'
import { getImages, uploadImage, deleteImage} from './code/PersonalPageCode.js'

dotenv.config()

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
        message: "You have sucessfully signed up!",
        status: result
    })
})

// Post request for logging in
app.post('/login', async (req, res) => {
    // Sets values for email and password
    const { email, password } = req.body

    // Call function
    const result = await confirmUserLogin(email, password)

    res.send({
        status: true,
    })
})

// Post request for getting current user's images
app.post('/PersonalPage', async(req, res) => {
    // Sets value for email
    const { email } = req.body

    // Call function
    const result = await getImages(email)

    res.send({
        images_arr: result
    })
}) 

// Post request for deleting a current user's image
app.post('/PersonalPage/Delete', async(req, res) => {
    // Sets value for email
    const { email, image } = req.body

    // Call function
    const result = await deleteImage(email, image)

    res.send({
        images_arr: result
    })
    // res.sendStatus(203)
}) 

app.listen(process.env.PORT || 3000)