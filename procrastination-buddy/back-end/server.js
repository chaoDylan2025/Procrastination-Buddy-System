import express from 'express'
import cors from 'cors'
import { createUser, userLogin, getSignedInUser, logout, sendPasswordResetEmail, updateDisplayedName, changePassword, deleteUserAccount } from './code/user.js'
import { getImagesAndLayout, setDefaultImages, updateImagesAndLayout } from './code/motivational_page.js'
import { getRestrictedSitesList, setRestrictedSiteList } from './code/focus_list_page.js'

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
        status: result.loggedIn,
        email: result.email,
        name: result.name
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

// Post request for sending password reset email to the user
app.post('/PasswordReset', (req, res) => {
    const { email } = req.body

    sendPasswordResetEmail(email) // Call function

    res.send({
        status: true
    })
})

// Post request for changing password
app.post('/ChangePassword', (req, res) => {
    const { email, current_password, new_password } = req.body

    changePassword(email, current_password, new_password) // Call function

    res.send({
        status: true
    })
})

// Post request for changing name of user's profile
app.post('/ChangeName', (req, res) => {
    const { name } = req.body

    updateDisplayedName(name) // Call function

    res.send({
        status: true
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

// Get request for getting current motivational images of user
app.get('/MotivationalImages', async (req, res) => {
    const result = await getImagesAndLayout()
    res.send(result)
})

// Post request for setting default images for user with no images
app.post('/DefaultImages', async (req, res) => {
    const { images } = req.body
    const result = await setDefaultImages(images)
    res.send({
        status: result
    })
})

// Post request for setting updated images and image layout for user
app.post('/UpdateImagesAndLayout', async (req, res) => {
    const { image_layout, images } = req.body
    const result = await updateImagesAndLayout(image_layout, images)
    res.send({
        status: result
    })
})

// Get request for getting the user's current restricted websites list
app.get('/RestrictedSitesList', async (req, res) => {
    const result = await getRestrictedSitesList()
    res.send(result)
})

// Post request for updating user's current restricted websites list
app.post('/UpdateRestrictedSitesList', async (req, res) => {
    console.log(req.body)
    const website = req.body
    const result = await setRestrictedSiteList({list: website})
    res.send({
        status: result
    })
})

app.listen(process.env.PORT || 3000)