import express from 'express'
import cors from 'cors'
import { createUser, login, getUser, logout, sendPasswordResetEmail, updateDisplayedName, changePassword, deleteUserAccount } from './code/user.js'
import { getImagesAndLayout, setDefaultImages, updateImagesAndLayout } from './code/motivational_page.js'
import { getRestrictedSitesList, setRestrictedSiteList } from './code/focus_list_page.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

/**
 * Post request for creating a new account
 */
app.post('/signup', async (req, res) => {
    // Sets values for email, password, and password to confirm
    const { email, password, confirm_password } = req.body
    const result = await createUser(email, password, confirm_password)    
    
    if(result == true){
        res.send({
            status: result,
            email: email
        })
    }
    else{
        res.send(result)
    }
})

/**
 * Post request for logging in
 */
app.post('/login', async (req, res) => {
    // Sets values for email and password
    const { email, password } = req.body
    const result = await login(email, password)

    // Send data object if user successfully logs in
    if(typeof result == Object){
        res.send({
            status: result.loggedIn,
            email: result.email,
            name: result.name
        })
    }
    else{
        res.send(result)
    }
})

/**
 * Get request for checking if user is currently signed in
 */
app.get('/logged-in', (req, res) => {
    const result = getUser()
    res.send(result)
})

/**
 * Post request for sending password reset email to the user
 */
app.post('/password-reset', (req, res) => {
    const { email } = req.body
    sendPasswordResetEmail(email)
    res.send(true)
})

/**
 * Post request for changing password
 */
app.post('/change-password', async (req, res) => {
    const { email, current_password, new_password } = req.body
    let result = await changePassword(email, current_password, new_password)

    if(result == true){
        res.send(true)
    }
    else{
        res.send(result)
    }
})

/**
 * Post request for changing name of user's profile
 */
app.post('/change-name', (req, res) => {
    const { name } = req.body
    updateDisplayedName(name)
    res.send(true)
})

/**
 * Post request for logging user out
 */
app.post('/logout', async (req, res) => {
    const result = await logout()

    if(result === true){
        console.log("User has been logged out...")
        res.send(result)  
    }
})

/**
 * Post request for deleting user account
 */
app.post('/delete-account', async (req, res) => {
    const {email, password} = req.body
    const result = await deleteUserAccount(email, password)

    if(result === true){
        res.send(true)
    }  
})

/**
 * Get request for getting user's current motivational images
 */
app.get('/motivational-images', async (req, res) => {
    const result = await getImagesAndLayout()
    res.send(result)
})

/**
 * Post request for setting default images for new user
 */
app.post('/default-images', async (req, res) => {
    const { email, default_imgs } = req.body
    const result = await setDefaultImages(email, default_imgs)
    res.send(result)
})

/**
 * Post request for setting images and image layout for current user
 */
app.post('/update-images-and-layout', async (req, res) => {
    const { image_layout, images } = req.body
    const result = await updateImagesAndLayout(image_layout, images)
    res.send(result)
})

/**
 * Get request for getting the user's restricted websites list
 */
app.get('/restricted-sites-list', async (req, res) => {
    const result = await getRestrictedSitesList()
    res.send(result)
})

/**
 * Post request for updating user's restricted websites list
 */
app.post('/update-restricted-sites-list', async (req, res) => {    
    const website = req.body
    const result = await setRestrictedSiteList({list: website})
    res.send(result)
})

app.listen(process.env.PORT || 3000)