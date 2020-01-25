<template>
    <enso-form class="box form-box has-background-light raises-on-hover"
        @ready="form = $event.form">
        <template v-slot:suppliers>
            <div class="wrapper is-block">
                <div class="columns">
                    <div class="column is-6-tablet">
                        <form-field :field="form.field('suppliers')"
                            @input="prefill"/>
                    </div>
                    <div class="column is-6-tablet">
                        <form-field :field="form.field('defaultSupplierId')"
                            :params="selectedSuppliers"/>
                    </div>
                </div>
                <supplier v-for="supplier in suppliers"
                    :key="supplier.id"
                    :supplier="supplier"
                    v-on="$listeners"/>
            </div>
        </template>
    </enso-form>
</template>

<script>
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import Supplier from './Supplier.vue';

export default {
    name: 'BaseForm',

    components: { EnsoForm, FormField, Supplier },

    inject: ['i18n'],

    data: () => ({
        form: null,
    }),

    computed: {
        suppliers() {
            return this.form ? this.form.field('suppliers').value : [];
        },
        selectedSuppliers() {
            return {
                id: this.suppliers.map(({ id }) => id),
            };
        },
        partNumber() {
            return this.form && this.form.field('part_number').value;
        },
    },

    methods: {
        prefill() {
            this.suppliers
                .filter(({ pivot }) => !pivot.part_number)
                .forEach(({ pivot }) => { pivot.part_number = this.partNumber; });
        },
    },
};
</script>
