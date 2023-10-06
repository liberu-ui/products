<template>
    <div class="pictures">
        <draggable class="gallery field is-grouped is-grouped-multiline"
            :list="pictures"
            :animation="150"
            handle=".control"
            @change="reorder"
            tag="div"
            v-if="pictures.length > 0">
            <stored-picture class="control"
                v-for="(picture, index) in pictures"
                :key="picture.id"
                :picture="picture"
                @destroy="destroy(picture, index)"/>
            <div class="preview field is-grouped is-grouped-multiline"
                v-if="uploadedPictures.length > 0">
                    <temporary-picture class="control"
                        v-for="(file, index) in uploadedPictures"
                        :key="file.name"
                        :file="file"/>
            </div>
        </draggable>
        <p class="subtitle is-5"
            v-else="pictures.length">
            {{ i18n('No pictures currently uploaded') }}
        </p>
        <div class="level">
            <div class="level-left"></div>
            <div class="level-right">
                <div class="level-item">
                    <p class="control">
                        <enso-uploader :params="params"
                            @change="read"
                            fileKey="picture"
                            label="Select product pictures"
                            multiple
                            :url="route('products.pictures.store', productId)"
                            @upload-successful="fetch();"/>
                    </p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import { EnsoUploader } from '@liberu-ui/uploader/bulma';
import Draggable from 'vuedraggable';
import StoredPicture from './StoredPicture.vue';
import TemporaryPicture from './TemporaryPicture.vue';

export default {
    name: 'Gallery',
    
    components: { Cropper, EnsoUploader, Draggable, StoredPicture, TemporaryPicture },

    inject: ['errorHandler', 'i18n', 'route'],

    props: {
        productId: {
            type: [Number, String],
            required: true,
        },
    },

    data: () => ({
        pictures: [],
        uploadedPictures: [],
    }),

    computed: {
        params() {
            return {
                productId: this.productId,
            };
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        destroy(picture, index) {
            axios.delete(this.route('products.pictures.destroy', picture.id))
                .then(() => this.pictures.splice(index, 1))
                .catch(this.errorHandler);
        },
        fetch() {
            axios.get(this.route('products.pictures.index', this.productId))
                .then(({ data }) => (this.pictures = data))
                .catch(this.errorHandler);
        },
        read(event) {
            this.uploadedPictures = [];
            const files = event.target.files;

            for (let i = 0; i < files.length; i++) {
                const file = { name: files[i].name, src: null };
                const reader = new FileReader();
                reader.addEventListener('load', () => (file.src = reader.result), false);
                reader.readAsDataURL(files[i]);
                this.uploadedPictures.push(file);
            }
        },
        reorder(event) {
            if (event.moved) {
                const { element, newIndex } = event.moved;
                axios.patch(
                    this.route('products.pictures.reorder', element.id),
                    { newIndex: newIndex + 1 }
                ).catch(this.errorHandler);
            }
        },
    },
};
</script>

<style lang="scss">
    .pictures .gallery {
        max-height: 35em;
        overflow: auto;
    }
</style>