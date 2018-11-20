<template>
    <modal 
        name="album_details"
        :title="'Szczegóły'"
    >
        <div class="row" slot="body">
            <div class="col-12" v-if="modalData && modalData != ''">
                <div class="row">
                    <div class="col-12 col-md-5">
                        <img 
                            :src="modalData['im:image'][2]['label']" 
                            :height="modalData['im:image'][2]['attributes']['height']"
                            alt="album"
                            class="text-center"
                        />
                    </div>
                    <div class="col-12 col-md-7">
                        <h3>{{ modalData['title']['label'] }}</h3>
                        <p>
                            Cena: {{ modalData['im:price']['label'] }} <br/>
                            Kategoria: {{ modalData['category']['attributes']['label'] }} <br/>
                            Data wydania: {{ modalData['im:releaseDate']['label'].slice(0,10) }} <br/>
                            <template v-if="modalData['im:artist']['attributes']">
                                Autor: 
                                <a :href="modalData['im:artist']['attributes']['href']">
                                    {{ modalData['im:artist']['label'] }}
                                </a> 
                            </template>
                            <template v-else>
                                Autor: {{ modalData['im:artist']['label'] }}
                            </template>
                            <br/>
                        </p>
                        <p>
                            <a :href="modalData['link']['attributes']['href']">
                                Link do iTunes
                            </a>
                        </p>
                    </div>
                    <div class="col-12">
                        <p><small>{{ modalData['rights']['label'] }}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" slot="footer">
            <div class="col-12">
                <div class="btn btn-primary" @click="close">Zamknij</div>
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from './base/Modal'
import { mapState } from 'vuex';

export default {
    name: 'album_details',
    components: {
        Modal
    },
    computed: {
        ...mapState({
            modalData: state => {
                return state.Modal.modalsList.album_details ? state.Modal.modalsList.album_details.album : ''
            }
        }),
    },
    methods: {
        close() {
            this.$store.commit('unsetModalData', {
                name: 'album_details'
            })
        }
    }
}
</script>

