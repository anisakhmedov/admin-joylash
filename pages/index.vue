<template>
    <div id="mainPage">
        <header id="Header">
            <h1>Joylash <span style="font-size: 14px;">admin panel</span></h1>
            <ul>
                <li @click="swithWindow = 'allHouses'">
                    Выстовленные объявления
                </li>
                <li @click="swithWindow = 'checkNew'">
                    Одобрить объявления
                </li>
                <li @click="swithWindow = 'users'">
                    Пользователи
                </li>
                <li>
                    <!-- {{ route }} -->
                </li>
            </ul>
        </header>
        <div class="_margin"></div>
        <main class="container">
            <div id="allUsers" v-if="swithWindow === 'users'">
                <table>
                    <thead>

                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                Имя
                            </th>
                            <th>
                                Номер телефона
                            </th>
                            <th>
                                Почта
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of users" :key="item._id">
                            <th>{{ item.index }}</th>
                            <th>{{ item.name ? item.name : 'Нету данных' }}</th>
                            <th>{{ item.phone.length >= 3 ? item.phone : 'Нету данных' }}</th>
                            <th>{{ item.email }}</th>
                        </tr>
                    </tbody>
                </table>
                <div class="_margin"></div>

            </div>
            <div id="checkNew" v-else-if="swithWindow === 'checkNew'">
                <!-- <table>
                    <thead>

                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                Имя
                            </th>
                            <th>
                                Номер телефона
                            </th>
                            <th>
                                Почта
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of houses" :key="item._id">
                            <th>{{ item.index }}</th>
                            <th>{{ item.name ? item.name : 'Нету данных' }}</th>
                            <th>{{ item.phone.length >= 3 ? item.phone : 'Нету данных' }}</th>
                            <th>{{ item.email }}</th>
                        </tr>
                    </tbody>
                </table>
                <div class="_margin"></div> -->
            </div>
            <div id="AllHouses" v-else-if="swithWindow === 'allHouses'">
                <table>
                    <thead>

                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                Название объявления
                            </th>
                            <th>
                                Цена
                            </th>
                            <th>
                                Почта
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of houses" :key="item._id">
                            <th>{{ item.index }}</th>
                            <th>{{ item.title }}</th>
                            <th>
                                <NuxtLink :to="'/userCreated/' + item.userCreated">{{ item.linkUser }}</NuxtLink>
                            </th>
                            <!-- <th>{{ item.name ? item.name : 'Нету данных' }}</th> -->
                            <!-- <th>{{ item.phone.length >= 3 ? item.phone : 'Нету данных' }}</th> -->
                            <th>{{ item.email }}</th>
                        </tr>
                    </tbody>
                </table>
                <div class="_margin"></div>
            </div>
            <div id="erroe" v-else>
                <h1>
                    Error
                </h1>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            swithWindow: 'allHouses',
            users: [],
            houses: []
        }
    },
    async mounted() {
        await axios.get('https://joylash-778750a705b4.herokuapp.com/usersJoy')
            .then((res) => {
                this.users = res.data.body
                for (let item of this.users) {
                    item.index = this.users.indexOf(item) + 1
                }
            })
        await axios.get('https://joylash-778750a705b4.herokuapp.com/houses')
            .then((res) => {
                this.houses = res.data.body
                for (let item of this.houses) {
                    item.index = this.houses.indexOf(item) + 1
                    for(let user of this.users){
                        if(item.userCreated == user._id){
                            item.linkUser = user.name
                        }
                    }
                }


                console.log(this.houses);

            })
    }
}
</script>

<style></style>