<template>
    <div id="userCreated" class="container">
        <div class="_margin"></div>
        <NuxtLink to="/">Back</NuxtLink>
        <ul>
            <h2>Пользователь</h2>
            <li>
                Имя: {{ user.name }}
            </li>
            <li>
                Номер телефона: {{ user.phone }}
            </li>
            <li>
                Почта: {{ user.email }}
            </li>
            <li>
                Созданные объявления: <br>
                <span v-for="item of user.codeHouses" :key="item">
                    <NuxtLink :to="'/houses/' + item">{{ item }}</NuxtLink>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            user: [],
            linkUser: ''
        }
    },
    async mounted() {
        if (process.client) {
            this.linkUser = window.location.pathname.split('userCreated/')[1]
        }

        await axios.get('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + this.linkUser)
            .then((res) => {
                this.user = res.data.data
                console.log(this.user);
            })

        await axios.get('https://joylash-uz-4a09707016fe.herokuapp.com/houses')
            .then((res) => {
                this.houses = res.data.body
                for (let item of this.houses) {
                    item.index = this.houses.indexOf(item) + 1
                }


                for(let item of this.houses){
                    console.log(item);
                    
                }

            })
    }
}
</script>

<style></style>