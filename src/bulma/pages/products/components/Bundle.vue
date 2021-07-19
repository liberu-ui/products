<template>
    <div class="columns product-wrapper">
        <div class="column">
            <div class="field">
                <label class="label">
                    {{ i18n('Product') }}
                </label>
                <div class="control">
                    <input class="input"
                        :value="product.name"
                        readonly>
                </div>
            </div>
        </div>
        <div class="column is-2">
            <div class="field">
                <label class="label">
                    {{ i18n('Part') }}
                </label>
                <div class="control">
                    <input class="input"
                       :value="product.partNumber || product.part_number"
                       readonly>
                </div>
            </div>
        </div>
        <div class="column is-2"
            v-if="product.stock !== null">
            <div class="field">
                <label class="label">
                    {{ i18n('Stock') }}
                </label>
                <div class="control">
                    <input class="input"
                        :value="product.stock"
                        readonly>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { focus, selectOnFocus } from '@enso-ui/directives';

export default {
    name: 'Bundle',

    directives: { focus, selectOnFocus },

    inject: ['i18n'],

    props: {
        product: {
            type: Object,
            required: true,
        },
    },
};
</script>
