<script setup>
import { onMounted, ref } from 'vue'
import { changeImageLayout, getImagesAndLayout, current_imgs, current_img_layout } from '../frontend-code/personal-motivational-page/image_functions'
import { is_images_and_layout_updated, condition_for_displaying_buttons, checkUpdatedStatus, 
         original_user_motivational_images, original_user_image_layout } from '../frontend-code/personal-motivational-page/image_events'
import { userStore } from '../stores/user'
import Content from '../components/Motivational-Page/Content.vue'

// Contains options for changing image layout
var image_layout_options = ["1 per row", "3 per row"]

// Pinia store
const user = userStore()

function cancelButton(){
    resetData()
    removeButtons()
}

function removeButtons(){
    let tempArr = is_images_and_layout_updated.value.map((result) => result = false)
    is_images_and_layout_updated.value = tempArr
    condition_for_displaying_buttons.value = false
}

function resetData(){
    current_imgs.value = original_user_motivational_images.value.map(image => ({...image}))
    current_img_layout.value = original_user_image_layout.value
    user.imageLayout = original_user_image_layout.value
}
function setCurrentData(result){
    current_imgs.value = result.images
    current_img_layout.value = result.layout
    original_user_motivational_images.value = [...result.images]
    original_user_image_layout.value = result.layout == "1 per row" ? 12 : 4
    user.imageLayout = original_user_image_layout.value
}

function updateImageLayout(image_layout){
    current_img_layout.value = changeImageLayout(image_layout)
    user.imageLayout = current_img_layout.value
    if(original_user_image_layout.value != current_img_layout.value){
        is_images_and_layout_updated.value[1] = true;
    }
    else{
        is_images_and_layout_updated.value[1] = false;
    }
    checkUpdatedStatus()
}

onMounted(async() => {
    let result = await getImagesAndLayout()
    setCurrentData(result)
})
</script>

<template>
    <v-app>
        <v-container>
             <!-- Displays option to change image layout -->
             <v-row>
                <v-col class="mt-5 text-center">
                    <v-btn @click="cancelButton()" size="small" v-if="condition_for_displaying_buttons">
                        <span> Cancel </span>
                    </v-btn>
                </v-col>
                <v-col class="mt-5 text-center">
                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn
                            size="small"
                            v-bind="props"
                            >
                            Change Image Layout
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            class="pa-20"
                            v-for="(item, index) in image_layout_options"
                            :key="index"
                            :value="item"
                            @click="updateImageLayout(image_layout_options[index])"
                            >
                                <span class="text-caption text-center">
                                    {{ item }}
                                </span>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col class="mt-5 text-center">
                    <v-btn size="small" v-if="condition_for_displaying_buttons">
                        <span> Save </span>
                    </v-btn>
                </v-col>
             </v-row>

             <!-- Display Motivational Page Content -->
             <v-row>
                <v-col>
                    <Content :show_change_button="true" />
                </v-col>  
             </v-row>
        </v-container>
    </v-app>
</template>