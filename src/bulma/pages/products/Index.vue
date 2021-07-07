<template>
    <div>
        <div class="columns is-centered is-multiline"
             v-if="ready">
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    :name="i18n('Bundle')"
                    v-model="filters.products.is_bundle"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    :name="i18n('Updated')"
                    default="lastMonth"
                    v-model="params.dateInterval"
                    @update="
                        intervals.products.updated_at.min = $event.min;
                        intervals.products.updated_at.max = $event.max;
                    "/>
            </div>
        </div>
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
    </div>
</template>

<script>
import { BooleanFilter, EnsoDateFilter } from '@enso-ui/filters/bulma';
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: {
        BooleanFilter,
        EnsoDateFilter,
        EnsoTable,
    },

    data: () => ({
        apiVersion: 1.6,

        filters: {
            products: {
                is_bundle: null,
            },
        },

        intervals: {
            products: {
                updated_at: {
                    dateFormat: null,
                    max: null,
                    min: null,
                },
            },
        },

        params: {
            dateInterval: 'all',
        },

        ready: false,
    }),
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
