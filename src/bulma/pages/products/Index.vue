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
                    :name="i18n('Date')"
                    default="thisMonth"
                    v-model="params.dateInterval"
                    @update="
                        intervals.products.date.min = $event.min;
                        intervals.products.date.max = $event.max;
                    "/>
            </div>
            <div class="column is-narrow">
                <enso-filter class="box raises-on-hover"
                    v-model="dateFilter"
                    hide-off
                    :options="dateFilters"
                    :name="i18n('Date Filter')"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover"
            ref="products"
            id="products"
            :intervals="tableIntervals"
            :filters="filters">
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
        <filter-state :api-version="apiVersion"
            name="product_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
    </div>
</template>

<script>
import { BooleanFilter, EnsoDateFilter } from '@enso-ui/filters/bulma';
import { FilterState } from '@enso-ui/filters/renderless';
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: {
        BooleanFilter,
        EnsoDateFilter,
        EnsoTable,
        FilterState,
    },

    data: () => ({
        apiVersion: 1.7,

        filters: {
            products: {
                is_bundle: null,
            },
        },

        intervals: {
            products: {
                date: {
                    dateFormat: null,
                    max: null,
                    min: null,
                },
            },
        },

        params: {
            dateInterval: 'thisMonth',
        },

        dateFilters: [
            { label: 'Created', value: 'created_at' },
            { label: 'Updated', value: 'updated_at' },
        ],
        dateFilter: 'created_at',
        ready: false,
    }),

    computed: {
        ...mapState(['meta', 'enums']),
        tableIntervals() {
            return {
                products: {
                    [this.dateFilter]: {
                        min: this.intervals.products.date.min,
                        max: this.intervals.products.date.max,
                        dateFormat: null,
                    },
                },
            };
        },
    },
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
