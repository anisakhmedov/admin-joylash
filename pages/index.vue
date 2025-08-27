<template>
  <div id="mainPage">
    <header id="Header">
      <h1>Joylash <span style="font-size: 14px">admin panel</span></h1>
      <ul>
        <li @click="swithWindow = 'allHouses'">Выстовленные объявления</li>
        <li @click="swithWindow = 'checkNew'">Одобрить объявления</li>
        <li @click="swithWindow = 'users'">Пользователи</li>
      </ul>
    </header>
    <div class="_margin"></div>
    <main class="container">
      <div id="allUsers" v-if="swithWindow === 'users'">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Номер телефона</th>
              <th>Почта</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of users" :key="item._id">
              <th>{{ item.index }}</th>
              <th>{{ item.name ? item.name : "Нету данных" }}</th>
              <th>{{ item.phone.length >= 3 ? item.phone : "Нету данных" }}</th>
              <th>{{ item.email }}</th>
              <th style="cursor: pointer" @click="deleteUser(item._id)">
                Удалить
              </th>
            </tr>
          </tbody>
        </table>
        <div class="_margin"></div>
      </div>
      <div id="checkNew" v-else-if="swithWindow === 'checkNew'">
        <div class="wrapper">
          <div class="item">
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Название</th>
                  <th>Открыть</th>
                  <th>Показывать</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item of houses" :key="item">
                  <th>{{ item.index }}</th>
                  <th>{{ item.title }}</th>
                  <th style="cursor: pointer" @click="openWindow(item)">
                    Отркыть
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      @change="changeStatus(item)"
                      v-model="item.isModerate"
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="_margin"></div>
      </div>
      <div id="AllHouses" v-else-if="swithWindow === 'allHouses'">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Название объявления</th>
              <th>Цена</th>
              <th>Товар</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of houses" :key="item._id">
              <th>{{ item.index }}</th>
              <th>{{ item.title }}</th>
              <th>${{ item.price }}</th>
              <th>
                <NuxtLink :to="'/houses/' + item._id">Перейти</NuxtLink>
              </th>
              <th>
                <p style="cursor: pointer" @click="removeItem(item._id)">
                  Удалить
                </p>
              </th>
              <!-- <th>{{ item.name ? item.name : 'Нету данных' }}</th> -->
              <!-- <th>{{ item.phone.length >= 3 ? item.phone : 'Нету данных' }}</th> -->
            </tr>
          </tbody>
        </table>
        <div class="_margin"></div>
      </div>
      <div id="erroe" v-else>
        <h1>Error</h1>
      </div>
    </main>
    <div v-show="isActive" class="modalWindowProd"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      swithWindow: "allHouses",
      users: [],
      houses: [],
      isActive: false,
    };
  },
  async mounted() {
    await axios
      .get("https://joytanla-4b363ae15ae6.herokuapp.com/usersJoy")
      .then((res) => {
        this.users = res.data.body;
        for (let item of this.users) {
          item.index = this.users.indexOf(item) + 1;
        }
      });
    await axios
      .get("https://joytanla-4b363ae15ae6.herokuapp.com/houses")
      .then((res) => {
        this.houses = res.data.body;
        for (let item of this.houses) {
          item.index = this.houses.indexOf(item) + 1;
          for (let user of this.users) {
            if (item.userCreated == user._id) {
              item.linkUser = user.name;
            }
          }
        }
      });
  },
  methods: {
    removeItem(param) {
      console.log(param);
      axios
        .delete("https://joytanla-4b363ae15ae6.herokuapp.com/houses/" + param)
        .then((res) => {
          if (process.client) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser(param) {
      axios
        .delete("https://joytanla-4b363ae15ae6.herokuapp.com/usersJoy/" + param)
        .then((res) => {
          if (process.client) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openWindow(param) {
      console.log(param);
      console.log(this.isActive);
      console.log(
        event.target.parentNode.lastChild.querySelector("input").value
      );
    },
    changeStatus(param) {
      let obj = param;

      let fm = new FormData();
      if (event.target.checked === true) {
        obj.isModerate = true;
      } else {
        obj.isModerate = false;
      }
      fm.append("isModerate", obj.isModerate);

      fm.forEach((val, key) => {
        console.log({ [key]: val });
      });

      axios
        .patch(
          "https://joytanla-4b363ae15ae6.herokuapp.com/houses/" + param._id,
          { isModerate: obj.isModerate }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
