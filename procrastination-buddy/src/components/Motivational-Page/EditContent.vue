<script setup>
import Content from './Content.vue'
import DeleteImages from './DeleteImages.vue'
import { ref } from 'vue'

const props = defineProps({
    open_edit_dialog: Boolean,
})

const emit = defineEmits('close')
function exitDialogModal(){
    emit('close', false)
}

// Contains options for changing image layout
var image_layout_options = ["3 images per row", "4 images per row", "5 images per row", "6 images per row"]

// Opens Delete Images dialog
var open_delete_images_dialog = ref(false)

</script>
<template>
    <v-dialog
    v-model="props.open_edit_dialog"
    height="800"
    width="1000">
        <v-card>
            <v-card-item>
                <v-btn
                    @click="exitDialogModal"
                    icon="$close"
                    size="medium"
                    variant="text"
                    >
                    </v-btn>
            </v-card-item>
                
            
            <v-container>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn
                            size="small"
                            v-bind="props"
                            >
                            Change layout
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(item, index) in image_layout_options"
                            :key="index"
                            :value="item"
                            @click=""
                            >
                                {{ item }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-spacer></v-spacer>
                    <v-btn size="small" @click="open_delete_images_dialog = true">Delete Images</v-btn>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>

            <v-container>
                <Content :show_change_button="props.open_edit_dialog"/>
            </v-container>
            
            <v-container v-show="open_delete_images_dialog">
                <DeleteImages :open_dialog="open_delete_images_dialog" @close="(state) => open_delete_images_dialog = state"/>
            </v-container>
            
        </v-card>
    </v-dialog>
</template>