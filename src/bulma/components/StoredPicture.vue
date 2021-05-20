<template>
    <figure class="image is-192x192 is-flex is-align-content-center is-justify-content-center"
        @mouseenter="controls = true"
        @mouseleave="controls = false">
        <img :src="route('core.files.show', picture.file.id)">
        <div class="controls has-background-light animated fadeIn has-padding-small"
            v-if="controls || confirmation">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="filename"
                            v-tooltip="picture.file.name">
                            {{ picture.file.name }}
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
    name: 'StoredPicture',

    directives: { tooltip: VTooltip },

    components: { Confirmation },

    inject: ['route'],

    props: {
        picture: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        controls: false,
        confirmation: false,
    }),
};
</script>

<style lang="scss">
    .pictures {
        .gallery {
            .image.is-192x192 {
                outline: 1px dashed;
                padding: 0.2em;
                cursor: pointer;
                margin: 0.75rem;
                height: 192px;
                width: 192px;

                img {
                    object-fit: contain;
                }

                .controls {
                    position: absolute;
                    bottom: 3px;
                    margin: -0.2em;
                    width: 100%;
                    .level-left {
                        flex: 1;
                        min-width: 0;

                        .level-item {
                            flex: 1;
                            min-width: 0;
                            justify-content: flex-start;

                            .filename {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
