<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-sm-6 offset-sm-3 col-md-2 offset-md-4 pt-4">
                <h1>Dodawanie profilu</h1>
                <form @submit.prevent="onSubmit">
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
            name: ''
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
                                console.log(this.name)
                                store.getItem('app/profile', )
                                    .then( ( v ) => {
                                        console.log(v, this.name)
                                        if ( v === null ) {
                                            store.setItem('app/profile', [
                                                this.name
                                            ])
                                                .then(() => {
                                                    this.$router.push('/wybierz-profil')
                                                })
                                        } else {
                                            store.setItem('app/profile', [
                                                ...v,
                                                this.name
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
