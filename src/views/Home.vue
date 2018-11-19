<template>
    <!-- <div class="component-wrapper"> -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 text-center">
                    <h1>Jako kto korzystasz?</h1>
                    <div 
                        class="avatar-box m-1"
                        v-for="(p,i) in albums_list"
                        :key="i"
                        @click="setProfile(p)"
                        :style="`width: ${p['im:image'][2]['attributes']['height']}px`"
                    >
                        <img 
                            :src="p['im:image'][2]['label']" 
                            :height="p['im:image'][2]['attributes']['height']"
                            alt="avatar" class="avatar"
                        />
                        <h3>{{ p.name }}</h3>
                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            albums_list: []
        }
    },
    computed: {
        profile() {
            return this.$store.state.App.profile
        }
    },
    created() {
        // console.log(this.$store.state.App.profile)
        if(!this.$store.state.App.profile) {
            this.$router.push('/wybierz-profil')
        }
        this.getData()
    },
    methods: {
        getData() {
            this.$http.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
                .then( (resp) => {
                    this.albums_list = resp.data.feed.entry
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar-box {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        transition: all 1s;
        .avatar, .avatar-add {
            vertical-align: middle;
        }
        .avatar-add {
            border-radius: 50%;
        }
    }
    a {
        color: #ffffff;
    }
</style>
