import { ref } from 'vue'
import AuthenticationService from '../../services/AuthenticationService'

// Image array used for carousel
export var img_arr = ref([
    "/images/IMG_7112.JPG",
    "/images/IMG_7113.JPG", 
    "/images/IMG_7117.WEBP", 
    "/images/MotivationalQuote.png",
    "/images/ProcrastinationQuote.png",
])

// Default images to provide for users with no images
export var default_imgs = ref([
    {image: getImageUrl("../../assets/images/canva-motivational-quote-about-patience-instagram-post-UJQOlc4w32w.jpg"), selected: false, styling: ""}, 
    {image: getImageUrl("../../assets/images/istockphoto-1392896428-612x612.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/istockphoto-1758363728-612x612.jpg"), selected: false, styling: ""}
])
// Available motivational images
export var motivational_imgs = ref([
    {image: getImageUrl("../../assets/images/canva-motivational-quote-about-patience-instagram-post-UJQOlc4w32w.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/churchhill-quote.png"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/d62a5d6bfa8e76f3dd36f9a51570f372.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/easy-things-hard-1024x576.jpg.webp"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/HD-wallpaper-focus-motivational-quote-motivation-thumbnail.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/IMG_7114.PNG"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/IMG_7118.JPG"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/IMG_7119.JPG"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/istockphoto-1392896428-612x612.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/istockphoto-1411837419-612x612.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/istockphoto-1758363728-612x612.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/istockphoto-1772150832-612x612.jpg"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/Luxafor-motivational-quote-image.jpg.webp"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/MotivationalQuote3.png"), selected: false, styling: ""},
    {image: getImageUrl("../../assets/images/template-motivational-quote-positive-quote-success-quote-for-inspirational-self-motivation-can-be-used-for-greeting-card-typography-poster-free-vector.jpg"), selected: false, styling: ""},
])

// Current images
export var current_imgs = ref([])
// Current image layout
export var current_img_layout = ref(4)

// Displays 'Confirm' button if an image has been selected
export var display_confirm_btn = ref(false)

// Index of image to change
export var change_image = ref(-1)

// Index of currently selected image
export var current_selected_img = ref(-1)
export var selected_img_index = ref(-1)

// Image to view
export var imageToBeViewed = ref('')

export function changeImageLayout(layout){
    if(layout == "1 per row"){
        return 12
    }
    else if(layout == "3 per row"){
        return 4
    }
}

export function getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href
}

// Gets the image layout and images from current user
export async function getImagesAndLayout(){
    let result = await AuthenticationService.imagesAndLayOut()
    let images = result.data.images
    if(images == ""){
        console.log("Current images are missing")
        await setDefaultImages()
    }
    return result.data
}

async function setDefaultImages(){
    await AuthenticationService.settingDefaultImages({images: default_imgs.value}).then((result) => {
        if(result.data.status){
            return true
        }
    })
}