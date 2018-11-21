<template>
    <div class="container-fluid">

        <details-modal />

        <div class="row mt-3">

            <div class="col-12 text-center" v-if="profile">
                <div 
                    class="avatar-box m-1"
                >
                    <img 
                        :src="profile.img" 
                        alt="avatar" class="avatar"
                    />
                    <h3>{{ profile.name }}</h3>
                </div>
            </div>

            <div class="col-12">
                <form>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <select 
                                class="custom-select" 
                                @change="filterList"
                                v-model="category"
                            >
                                <option value="">Wybierz kategorie</option>
                                <option 
                                    v-for="(c,i) in category_list"
                                    :key="i"
                                    :value="c"
                                >
                                    {{ c }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <select 
                                class="custom-select" 
                                @change="filterList"
                                v-model="author"
                            >
                                <option value="">Wybierz wykonawce</option>
                                <option 
                                    v-for="(a,i) in artist_list"
                                    :key="i"
                                    :value="a"
                                >
                                    {{ a }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Szukaj" 
                                @keyup="filterList"
                                v-model="search"
                            >
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-12 text-center">
                <transition-group name="slide-fade">
                    <div 
                        class="album-box m-1"
                        v-for="(p,i) in albums_list"
                        :key="i"
                        :style="`width: ${p['im:image'][2]['attributes']['height']}px`"
                        @click="showAlbumDetails(p)"
                    >
                        <div class="album">
                            <img
                                v-img="p['im:image'][2]['label']"
                                :height="p['im:image'][2]['attributes']['height']"
                                alt=""
                            />
                            <p>{{ p['title']['label'] }}</p>
                        </div>
                    </div>
                </transition-group>
            </div>

        </div>
    </div>
</template>

<script>
import DetailsModal from '@/components/DetailsModal'
export default {
    name: 'home',
    components: {
        DetailsModal
    },
    data() {
        return {
            org_albums_list: [],
            albums_list: [],
            artist_list: [],
            category_list: [],
            category: '',
            author: '',
            search: '',
        }
    },
    computed: {
        profile() {
            return this.$store.state.App.profile
        }
    },
    created() {
        if(!this.$store.state.App.profile) {
            this.$router.push('/wybierz-profil')
        }
        this.getData()
    },
    methods: {
        getData() {
            this.$http.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
                .then( (resp) => {
                    let list_of_albums = resp.data.feed.entry
                    this.albums_list = list_of_albums
                    this.org_albums_list = list_of_albums

                    this.makeCategoryList()
                    this.makeAuthorsList()
                    
                })
        },
        makeCategoryList() {
            this.category_list = []
            this.albums_list.map( ( a ) => {

                if ( this.category_list.indexOf( a['category']['attributes']['label'] ) === -1 ) {
                    this.category_list.push(a['category']['attributes']['label'])
                }

            })
        },
        makeAuthorsList() {
            this.artist_list = []
            this.albums_list.map( ( a ) => {

                if ( this.artist_list.indexOf( a['im:artist']['label'] ) === -1 ) {
                    this.artist_list.push(a['im:artist']['label'])
                }

            })
        },
        filterList() {
            this.albums_list = JSON.parse(JSON.stringify(this.org_albums_list))

            if(this.category !== '') {
                this.albums_list = this.albums_list.filter( ( a ) => {
                    return a['category']['attributes']['label'] === this.category
                })
                this.makeAuthorsList()
            }

            if(this.author !== '') {
                this.albums_list = this.albums_list.filter( ( a ) => {
                    return a['im:artist']['label'] === this.author
                })
                this.makeCategoryList()
            }

            if(this.search !== '') {
                let re = new RegExp(this.search.toLowerCase(), 'g')
                this.albums_list = this.albums_list.filter( ( a ) => {
                    return a['title']['label'].toString().toLowerCase().match(re)
                        || a['im:artist']['label'].toString().toLowerCase().match(re)
                        || a['category']['attributes']['label'].toString().toLowerCase().match(re)
                })
            }

        },
        showAlbumDetails(a) {
            this.$store.commit('setModalData', {
                name: 'album_details',
                value: a,
                key: 'album'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar-box {
        display: inline-block;
        transition: all 1s;
        .avatar {
            vertical-align: middle;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .album-box {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        transition: all 1s;
        position: relative;
        width: 17px;
        height:170px;
        .album {
            background-color: #42b983;
            & img {
                vertical-align: middle;
                backface-visibility: hidden;
                transition: ease-in-out .3s;
                &::before {
                    content: ' ';
                    box-sizing: border-box;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    margin-top: -10px;
                    margin-left: -10px;
                    border-radius: 50%;
                    border: 2px solid #ccc;
                    border-top-color: #42b983;
                    animation: spinner .6s linear infinite;
                }
            }
            &:hover {
                img {
                    opacity:.25
                }
                p {
                    visibility: visible;
                }
            }
            & p {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                visibility: hidden;
                font-weight: 700;
                color: white;
                padding: 5px;
            }
        }
    }
    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
    a {
        color: #ffffff;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
