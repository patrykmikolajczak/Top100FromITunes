<template>
    <div class="container-fluid center-content">
        <div class="row">
            <div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-2 offset-lg-5">
                <h1>Dodawanie profilu</h1>
                <form @submit.prevent="onSubmit">
                    <div class="form-group text-center">
                        <img 
                            class="avatar" 
                            :src="avatar"
                            alt="Avatar"
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nazwa profilu</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            :class="{'is-invalid': errors.first('name')}"
                            id="exampleInputEmail1" 
                            placeholder="Wpisz nazwę"
                            name="name"
                            v-validate="'required'"
                            v-model="name"
                        >
                        <div v-show="errors.first('name')" class="invalid-feedback">
                            Wprowadź nazwę profilu.
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Dodaj</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add-profile',
    data() {
        return {
            name: '',
            avatar: './img/avatars/avatar2.png'
        }
    },
    methods: {
        onSubmit () {
            this.$validator.validate()
                .then((result) => {
                    if (result) {
                        this.$vlf.createInstance({
                            storeName: 'app'
                        })
                            .then(( store ) => {
                                store.getItem('app/profile', )
                                    .then( ( v ) => {
                                        if ( v === null ) {
                                            store.setItem('app/profile', [
                                                {
                                                    name: this.name,
                                                    img: this.avatar
                                                }
                                            ])
                                                .then(() => {
                                                    this.$router.push('/wybierz-profil')
                                                })
                                        } else {
                                            store.setItem('app/profile', [
                                                ...v,
                                                {
                                                    name: this.name,
                                                    img: this.avatar
                                                }
                                            ])
                                                .then(() => {
                                                    this.$router.push('/wybierz-profil')
                                                })
                                        }
                                        // this.$store.dispatch('stopLoading')
                                    })
                            })
                    }
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatar {
        vertical-align: middle;
        width: 100px;
        height: 100px;
    }
    a {
        color: #ffffff;
    }
</style>
