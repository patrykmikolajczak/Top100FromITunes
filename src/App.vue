<template>
    <!-- <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </div> -->
    <div id="app">
        <div class="component-wrapper">
            <router-view/>
        </div>
        <div class="modal-backdrop fade show" v-show="isModalShowing"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapGetters(['isModalShowing']),
    },
    mounted() {
        this.$vlf.createInstance({
            storeName: 'app'
        })
            .then(( store ) => {
                store.getItem('app/profile')
                    .then( ( v ) => {
                        if ( v === null ) {
                            this.$router.push('/dodaj-profil')
                        } else {
                            this.$router.push('/wybierz-profil')
                        }
                        this.$store.dispatch('stopLoading')
                    })
            })
    },
    methods: {

    }
}
</script>


<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    opacity: 0;
    transition: all 1s;
    padding: 3%;
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
    .component-wrapper {
        height: 100%;
        background: white;
        color: #ffffff;
        background-image: url('../public/img/bg.jpg');
        background-position: center;
        overflow: hidden;
        position: relative;
        &::before {
            content: '';
            // background: #2c3e50;
            background: rgba(1, 30, 59, 0.65);
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            right: 0;
            bottom: 0;
        }
        & > .container-fluid {
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            right: 0;
            bottom: 0;
            overflow: auto;
            &.center-content > .row {
                position:absolute;
                width: 100%;
                top: 25%;
                transform: translateY(-50%);
            }
        }
    }
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #ffffff;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
