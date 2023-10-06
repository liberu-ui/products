<template>
    <div class="columns supplier-wrapper">
        <div class="column is-3">
            <div class="field">
                <label class="label">
                    {{ i18n('Supplier') }}
                </label>
                <div class="control">
                    <input class="input"
                        :value="supplier.name"
                        readonly>
                </div>
            </div>
        </div>
        <div class="column is-2">
            <div class="field">
                <label class="label">
                    {{ i18n('Part Number') }}
                </label>
                <div class="control">
                    <input class="input"
                        v-model="supplier.pivot.partNumber"
                        v-focus
                        v-select-on-focus
                        @input="$emit('part-number-updated')">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">
                    {{ i18n('Acquisition Price') }}
                </label>
                <div class="control">
                    <input class="input"
                        v-model="supplier.pivot.acquisitionPrice"
                        v-select-on-focus
                        @input="$emit('acquisition-price-updated')">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field"
                 v-if="supplier.pivot.discountedPrice">
                <label class="label">
                    {{ i18n('Discounted Price') }}
                </label>
                <div class="control">
                    <input class="input"
                        :value="supplier.pivot.discountedPrice"
                        readonly>
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
                        :value="supplier.pivot.createdAt"
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
                        :value="supplier.pivot.updatedAt"
                        readonly>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { focus, selectOnFocus } from '@liberu-ui/directives';

export default {
    name: 'Supplier',

    directives: { focus, selectOnFocus },

    inject: ['i18n'],

    props: {
        supplier: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.supplier-wrapper .timestamp {
    width: 7em;
}
</style>
