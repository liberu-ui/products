<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="products">
        <template v-slot:pictureUrl="{ row }">
            <figure class="image product-image is-48x48 has-vertically-centered-content">
                <a :href="row.pictureUrl" target="_blank">
                    <img :src="row.pictureUrl" alt="cover">
                </a>
            </figure>
        </template>
    </enso-table>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>

<style lang="scss">
    .image.product-image.is-48x48 > a {
        width: 48px;
        height: 48px;

        img {
            margin: auto;
            width: auto;
            height: auto;
            max-width: 48px;
            max-height: 48px;
        }
    }
</style>
