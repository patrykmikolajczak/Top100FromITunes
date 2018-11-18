<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center" v-if="profile_list.length > 0">
                <h1>Jako koto korzystasz?</h1>
                <div 
                    class="avatar-box m-1"
                    v-for="(p,i) in profile_list"
                    :key="i"
                >
                    <img 
                        src="../assets/img/avatars/avatar2.png" 
                        alt="avatar" class="avatar"
                    />
                    <h3>{{ p }}</h3>
                </div>
                <router-link 
                    to="dodaj-profil"
                    class="avatar-box m-1"
                    :key="i"
                >
                    <img 
                        src="../assets/img/avatars/avatar2.png" 
                        alt="avatar" class="avatar-add"
                    />
                    <h3>Dodaj</h3>
                </router-link>
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

