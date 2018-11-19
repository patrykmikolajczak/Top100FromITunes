<template>
<div class="component-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center" v-if="profile_list.length > 0">
                <h1>Jako kto korzystasz?</h1>
                <div 
                    class="avatar-box m-1"
                    v-for="(p,i) in profile_list"
                    :key="i"
                    @click="setProfile(p)"
                >
                    <img 
                        :src="p.img" 
                        alt="avatar" class="avatar"
                    />
                    <h3>{{ p.name }}</h3>
                </div>
                <router-link 
                    to="dodaj-profil"
                    class="avatar-box m-1"
                >
                    <img 
                        src="../../public/img/avatars/avatar2.png" 
                        alt="avatar" class="avatar-add"
                    />
                    <h3>Dodaj</h3>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'select-profile',
    data() {
        return {
            profile_list: []
        }
    },
    created() {
        this.getProfileList()
    },
    methods: {
        getProfileList() {
            this.$vlf.createInstance({
                storeName: 'app'
            })
                .then(( store ) => {
                    store.getItem('app/profile', )
                        .then( ( v ) => {
                            this.profile_list = v
                        })
                })
        },
        setProfile(profile) {
            this.$store.commit('setProfile', profile)
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar-box {
        display: inline-block;
        width: 100px;
        text-align: center;
        cursor: pointer;
        transition: all 1s;
        .avatar, .avatar-add {
            vertical-align: middle;
            width: 100px;
            height: 100px;
        }
        .avatar-add {
            border-radius: 50%;
        }
    }
    a {
        color: #ffffff;
    }
</style>

