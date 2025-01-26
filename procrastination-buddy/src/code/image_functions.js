import { ref } from 'vue'

// Image array used for carousel
export var img_arr = ref([
    "/images/IMG_7112.JPG",
    "/images/IMG_7113.JPG", 
    "/images/IMG_7117.WEBP", 
    "/images/MotivationalQuote.png",
    "/images/ProcrastinationQuote.png",
])

export function getImageUrl(url) {
    return new URL(`${url}`, import.meta.url).href
}