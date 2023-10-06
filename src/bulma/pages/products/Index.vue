<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="products">
        <template v-slot:pictureUrl="{ row }">
            <a :href="row.pictureUrl" target="_blank">
                <figure class="image is-48x48 is-flex
                    is-align-content-center is-justify-content-center">
                    <img class="product-image"
                        :src="row.pictureUrl" alt="cover">
                </figure>
            </a>
        </template>
    </enso-table>
</template>

<script>
import { EnsoTable } from '@liberu-ui/tables/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>

<style lang="scss">
.image.is-48x48 {
    .product-image {
        width: auto;
        height: auto;
        max-width: 48px;
        max-height: 48px;
    }
}
</style>
