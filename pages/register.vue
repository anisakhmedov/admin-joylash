<template>
    <div id="register">
        <form @submit.prevent="Enter()" action="">
            <h2 style="text-align: center;">Enter</h2>
            <input @keyup="enterText()" type="text" name="login" placeholder="Login" v-model="login">
            <label data-enter="login" for="login">Wrong!</label>
            <input @keypress="enterText()" type="password" name="password" placeholder="Password" v-model="password">
            <label data-enter="password" for="password">Wrong!</label>
            <button>Enter</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        Enter() {
            if (process.client) {
                if (this.login === 'admin') {
                    if (this.password === 'joylash123') {
                        this.$router.push('/')
                        localStorage.enter = true
                    } else {
                        document.querySelector('label[data-enter="password"]').style.display = 'block'
                    }
                } else {
                    document.querySelector('label[data-enter="login"]').style.display = 'block'
                }
                
                if(this.login !== 'admin' && this.password !== 'joylash123'){
                    for(let item of document.querySelectorAll('label[data-enter]')){
                        item.style.display = 'block'
                    }
                }
            }
        },
        enterText() {
            if (event.target.value.length >= 1) {
                document.querySelector(`label[data-enter="${event.target.getAttribute('name')}"]`).style.display = 'none'
            } else {
                document.querySelector(`label[data-enter="${event.target.getAttribute('name')}"]`).style.display = 'none'
            }

        }
    }
}
</script>

<style></style>