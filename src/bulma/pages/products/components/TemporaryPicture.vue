<template>
    <figure class="temporary image is-192x192"
        @mouseenter="controls = true"
        @mouseleave="controls = false">
        <span class="preview tag is-small is-success is-bold">
            {{ i18n('preview') }}
        </span>
        <img :src="file.src">
        <div class="controls has-background-light animated fadeIn p-1"
            v-if="controls || confirmation">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="filename"
                            v-tooltip="file.name">
                            {{ file.name }}
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <confirmation @confirm="$emit('destroy')"
                        @hide="confirmation = false">
                        <a class="button is-naked is-small"
                            @click="confirmation = true">
                            <span class="icon is-small">
                                <fa icon="trash-alt"/>
                            </span>
                        </a>
                    </confirmation>
                </div>
            </div>
        </div>
    </figure>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import Confirmation from '@enso-ui/confirmation/bulma';

library.add(faTrashAlt);

export default {
    name: 'TemporaryPicture',

    directives: { tooltip: VTooltip },

    components: { Confirmation },

    inject: ['i18n', 'route'],

    props: {
        file: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        controls: false,
        confirmation: false,
        src: null,
    }),
};
</script>

<style lang="scss">
    .pictures {
        .gallery {
            figure {
                .preview {
                    position: absolute;
                    right: 0.2em;
                }
            }
        }
    }
</style>