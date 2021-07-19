<template>
    <v-popover trigger="click"
        @show="fetchPositions"
        placement="left"
        ref="unpack">
        <a class="button is-row-button is-small is-table-button ml-1">
            <span class="icon is-small">
                <fa :icon="['fad', 'box-open']"/>
            </span>
        </a>
        <template v-slot:popover>
            <div class="unpack">
                <table>
                    <tbody>
                        <tr v-for="product in products"
                            :key="product.id">
                            <td class="pb-1">
                                <span class="is-size-7">
                                    {{ product.partNumber }}
                                </span>
                            </td>
                            <td class="pb-1">
                                <positions class="is-small mx-1"
                                   :disabled="loading"
                                   :positions="product.positions"
                                   v-model="product.positionId"/>
                            </td>
                            <td class="pb-1">
                                <new-position size="small"
                                  :readonly="loading"
                                  :positions="product.positions"
                                  @loading="loading = true"
                                  @done="loading = false"
                                  @new-position="product.positionId = $event.id"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="level mb-0 is-mobile">
                    <div class="level-left"/>
                    <div class="level-right">
                        <div class="level-item mr-0 is-flex is-flex-direction-column">
                            <input class="input is-small quantity"
                                :class="{'is-danger': errors.has('quantity')}"
                                :placeholder="i18n('Quantity')"
                                :disabled="loading"
                                v-model="quantity">
                            <p class="help is-danger has-text-centered"
                                v-if="errors.has('quantity')">
                                {{ errors.get('quantity') }}
                            </p>
                        </div>
                        <div class="level-item">
                            <button class="button is-small is-info ml-1"
                                :class="{'is-loading' : loading}"
                                :disabled="!quantity"
                                @click="handle">
                                {{ i18n('Unpack') }}
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
import { faBoxOpen } from '@fortawesome/pro-duotone-svg-icons';
import NewPosition from '@enso-ui/commercial/src/bulma/pages/components/NewPosition.vue';
import Positions from '@enso-ui/commercial/src/bulma/pages/components/Positions.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Errors from '@enso-ui/laravel-validation';

library.add(faBoxOpen);

export default {
    name: 'Unpack',

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
        products: [],
        quantity: null,
    }),

    computed: {
        payload() {
            return {
                quantity: this.quantity,
                products: this.products.map(product => ({
                    productId: product.id,
                    positionId: product.positionId,
                })),
            };
        },
    },

    methods: {
        fetchPositions() {
            this.loading = true;

            axios.get(this.route('inventory.positions.products', this.bundle.id))
                .then(({ data }) => (this.products = data))
                .catch(this.errorHandler)
                .finally(() => (this.loading = false));
        },
        handle() {
            const path = this.route('products.bundles.unpack', this.bundle.id);

            axios.post(path, this.payload)
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
        notify({ data: { bundleUnpacking } }) {
            if (!bundleUnpacking) {
                this.toastr.warning(this.i18n('Insufficient stock'));
                return;
            }

            const { quantity } = bundleUnpacking;
            this.toastr.success(this.i18n('Unpacked :quantity bundles', { quantity }));
            this.$emit('success');
            this.$refs.unpack.hide();
        },
    },
};
</script>

<style lang="scss">
.unpack {
    input {
        &.quantity {
            width: 4.2rem;
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
