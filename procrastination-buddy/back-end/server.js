import express from 'express'
import cors from 'cors'
import { createUser, userLogin, getSignedInUser, logout, deleteUserAccount } from './code/user.js'
import { default_images, images_arr, downloadImage } from './code/PersonalPageCode.js'

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

// Get request for checking if user is currently signed in
app.get('/LoggedIn', (req, res) => {
    // Call function
    const result = getSignedInUser()
    res.send({
        email: result
    })
})

// Post request for logging user out
app.post('/Logout', async (req, res) => {
    const result = await logout()
    if(result === true){
        console.log("User has been logged out...")
        res.send({
            status: result
        })  
    }
})

// Delete request for deleting user account
app.delete('/Profile', async (req, res) => {
    const result = await deleteUserAccount()
    if(result === true){
        res.status(200).send('Deleted User Account')
    }  
})

// Get request for retrieving array of default images
app.get('/GetDefaultImages', (req, res) => {
    res.send({
        default_images: default_images
    })
})

// Get request for retrieving all of the images from Appwrite bucket
app.get('/GetAllImages', (req, res) => {
    res.send({
        all_images: images_arr
    })
})

// Post request for downloading images from Appwrite bucket
app.post('/DownloadImages', async(req, res) => {
    const { image } = req.body
    await downloadImage(image).then(() => {
        res.status(200).send("Downloaded image...")
    })
})

app.listen(process.env.PORT || 3000)