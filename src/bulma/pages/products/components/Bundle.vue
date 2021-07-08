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
        <div class="column is-1">
            <div class="field">
                <label class="label">
                    {{ i18n('Quantity') }}
                </label>
                <div class="control">
                    <input class="input"
                        readonly
                        v-model="product.pivot.quantity"
                        v-focus
                        v-select-on-focus>
                </div>
            </div>
        </div>
        <div class="column is-narrow">
            <div class="field">
                <label class="label">
                    {{ i18n('Mapped At') }}
                </label>
                <div class="control">
                    <input class="input timestamp"
                        :value="product.pivot.createdAt"
                        readonly>
                </div>
            </div>
        </div>
        <div class="column is-narrow">
            <div class="field">
                <label class="label">
                    {{ i18n('Updated At') }}
                </label>
                <div class="control">
                    <input class="input timestamp"
                        :value="product.pivot.updatedAt"
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

<style lang="scss">
.product-wrapper .timestamp {
    width: 7em;
}
</style>
