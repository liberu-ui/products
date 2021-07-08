<template>
    <enso-form class="box form-box has-background-light raises-on-hover"
        @ready="form = $event.form">
        <template v-slot:gallery>
            <label class="label">
                {{ i18n('Pictures') }}
            </label>
            <gallery class="box is-shadowless"
                :product-id="$route.params.product"/>
        </template>
        <template v-slot:category_id="{ field, errors }">
            <label class="label">
                {{ i18n('Category') }}
            </label>
            <tree class="box is-shadowless"
                route-group="administration.categories"
                v-model="field.value"
                @input="errors.clear(field.name); $emit('changed')"/>
            <p class="help is-danger"
                v-if="errors.has(field.name)">
                {{ errors.get(field.name) }}
            </p>
        </template>
        <template v-slot:suppliers>
            <div class="wrapper is-block">
                <div class="columns">
                    <div class="column is-6-tablet">
                        <form-field :field="form.field('suppliers')"
                            :custom-params="$route.params"/>
                    </div>
                    <div class="column is-6-tablet">
                        <form-field :field="form.field('defaultSupplierId')"
                            :params="selectedSuppliers"/>
                    </div>
                </div>
                <supplier v-for="supplier in form.field('suppliers').value"
                    :key="supplier.id"
                    :supplier="supplier"
                    v-on="$listeners"/>
            </div>
        </template>
        <template v-slot:bundle>
            <div class="wrapper is-block">
                <div class="columns">
                    <div class="column is-12">
                        <form-field :field="form.field('bundledProducts')"/>
                    </div>
                </div>
                <bundle v-for="product in form.field('bundledProducts').value"
                    :key="product.id"
                    :product="product"/>
            </div>
        </template>
    </enso-form>
</template>

<script>
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import Tree from '@enso-ui/orderable-trees/bulma';
import { slug } from '@enso-ui/strings';
import Gallery from '../../../components/Gallery.vue';
import Supplier from './Supplier.vue';
import Bundle from './Bundle.vue';

export default {
    name: 'BaseForm',

    components: {
        Bundle, Tree, EnsoForm, FormField, Gallery, Supplier,
    },

    inject: ['i18n'],

    data: () => ({
        form: null,
    }),

    computed: {
        name() {
            return this.form?.field('name').value;
        },
        isBundle() {
            return this.form?.field('is_bundle').value;
        },
        selectedSuppliers() {
            return {
                id: this.form
                    ? this.form.field('suppliers').value.map(({ id }) => id)
                    : [],
            };
        },
    },

    watch: {
        name(name) {
            this.form.field('slug').value = slug(name);
        },
        isBundle(value) {
            if (value) {
                this.form.showTab('Bundle');
            } else {
                this.form.hideTab('Bundle');
            }
        },
    },
};
</script>
