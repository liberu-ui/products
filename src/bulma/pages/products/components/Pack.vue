<template>
    <v-popover trigger="click"
        @show="fetchPositions"
        placement="left"
        ref="pack">
        <a class="button is-row-button is-small is-table-button ml-1">
            <span class="icon is-small">
                <fa :icon="['fad', 'box']"/>
            </span>
        </a>
        <template v-slot:popover>
            <div class="pack">
                <div class="level is-mobile mb-1">
                    <div class="level-item mr-1">
                        <positions class="is-small"
                           :disabled="loading"
                           :positions="positions"
                           v-model="position"/>
                    </div>
                    <div class="level-item">
                        <new-position size="small"
                            :readonly="loading"
                            :positions="positions"
                            @loading="loading = true"
                            @done="loading = false"
                            @new-position="position = $event.id"/>
                    </div>
                </div>
                <div class="level is-mobile mb-0">
                    <div class="level-left"/>
                    <div class="level-right">
                        <div class="level-item mr-1 is-flex is-flex-direction-column">
                            <input class="input quantity is-small"
                               :class="{'is-danger': errors.has('quantity')}"
                               :placeholder="i18n('Quantity')"
                               v-model="quantity"
                               :disabled="loading">
                            <p class="help is-danger has-text-centered"
                               v-if="errors.has('quantity')">
                                {{ errors.get('quantity') }}
                            </p>
                        </div>
                        <div class="level-item">
                            <button class="button is-small is-info"
                                :class="{'is-loading' : loading}"
                                :disabled="!quantity"
                                @click="handle">
                                {{ i18n('Pack') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBox } from '@fortawesome/pro-duotone-svg-icons';
import Positions from '@enso-ui/commercial/src/bulma/pages/components/Positions.vue';
import NewPosition from '@enso-ui/commercial/src/bulma/pages/components/NewPosition.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Errors from '@enso-ui/laravel-validation';

library.add(faBox);

export default {
    name: 'Pack',

    components: {
        NewPosition, Positions, VPopover,
    },

    props: {
        bundle: {
            type: Object,
            required: true,
        },
    },

    inject: ['errorHandler', 'i18n', 'route', 'toastr'],

    data: () => ({
        errors: new Errors(),
        loading: false,
        position: null,
        positions: [],
        quantity: null,
    }),

    methods: {
        fetchPositions() {
            this.loading = true;

            axios.get(this.route('inventory.positions.product', this.bundle.id))
                .then(({ data }) => {
                    this.positions = data;
                    this.position = this.positions[0].id;
                }).catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        handle() {
            const { quantity, position } = this;
            const url = this.route('products.bundles.pack', this.bundle.id);

            axios.post(url, { quantity, position })
                .then(this.notify)
                .catch(error => {
                    const { status, data } = error.response;

                    if (status === 422) {
                        this.errors.set(data.errors);
                    } else {
                        this.errorHandler(error);
                    }
                })
                .finally(() => (this.loading = false));
        },
        notify({ data: { bundlePacking } }) {
            if (!bundlePacking) {
                this.toastr.warning(this.i18n('Insufficient stock'));
                return;
            }

            const { quantity } = bundlePacking;
            this.toastr.success(this.i18n('Created :quantity bundles', { quantity }));
            this.$emit('success');
            this.$refs.pack.hide();
        },
    },
};
</script>

<style lang="scss">
.pack {
    input {
        &.quantity {
            max-width: 4.2rem;
        }

        &.new-position {
            width: 7.6em;
        }
    }

    .button {
        width: 7.6em;
    }
}
</style>
