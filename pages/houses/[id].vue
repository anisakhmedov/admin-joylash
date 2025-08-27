<template>
  <div id="userCreated" class="container">
    <div class="_margin"></div>
    <NuxtLink to="/" class="back-link">← Назад</NuxtLink>

    <div class="house-card">
      <div class="house-main">
        <img
          :src="user.mainImage"
          alt="Главное изображение"
          class="main-image"
          @click="openModal(user.mainImage)"
        />

        <div class="house-info">
          <h1>{{ user.title }}</h1>
          <p class="price">${{ user.price }}</p>
          <p class="description">{{ user.discription }}</p>

          <div class="details">
            <p><strong>Этаж:</strong> {{ user.floor }}</p>
            <p><strong>Площадь:</strong> {{ user.scale }} м²</p>
            <p><strong>Комнат:</strong> {{ user.roomsNumber }}</p>
            <p><strong>Высота потолков:</strong> {{ user.cilingHeight }} м</p>
            <p><strong>Качество:</strong> {{ user.quality }}</p>
            <p><strong>Улица:</strong> {{ user.street }}</p>
            <p><strong>Тип дома:</strong> {{ user.typeOfHouse }}</p>
            <p><strong>Тип здания:</strong> {{ user.typeOfBuilding }}</p>
            <p>
              <strong>Продажа / Аренда:</strong>
              {{ user.RentOrSell == 1 ? "Продажа" : "Аренда" }}
            </p>
            <p><strong>Дата:</strong> {{ user.data }}</p>
            <p>
              <strong>Номер телефона:</strong>
              <a :href="'tel:' + user.phoneNumberUser">{{
                user.phoneNumberUser
              }}</a>
            </p>
            <p>
              <strong>Проверен модератором:</strong>
              {{ user.isModerate ? "Да" : "Нет" }}
            </p>
          </div>

          <div class="pluses">
            <h3>Преимущества:</h3>
            <ul>
              <li v-for="(plus, index) in user.pluses" :key="index">
                {{ plus }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="gallery">
        <h3>Дополнительные изображения</h3>
        <div class="gallery-images">
          <img
            v-for="(img, idx) in user.additionalImages"
            :key="idx"
            :src="img"
            alt="Изображение"
            @click="openModal(img)"
          />
        </div>
      </div>
    </div>
    <div class="modal" v-if="modalImage" @click="closeModal">
      <img :src="modalImage" class="modal-img" />
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      user: [],
      linkUser: "",
      modalImage: null,
    };
  },
  methods: {
    openModal(imageUrl) {
      this.modalImage = imageUrl;
    },
    closeModal() {
      this.modalImage = null;
    },
  },
  async mounted() {
    if (process.client) {
      this.linkHouse = window.location.pathname.split("houses/")[1];
    }

    const res = await axios.get(
      "https://joytanla-4b363ae15ae6.herokuapp.com/houses/" + this.linkHouse
    );
    this.user = res.data.data;
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: zoom-out;
}

.modal-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  object-fit: contain;
  transition: transform 0.3s;
}

.gallery-images img,
.main-image {
  cursor: zoom-in;
  transition: transform 0.2s;
}

.gallery-images img:hover,
.main-image:hover {
  transform: scale(1.03);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.house-card {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.house-main {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.main-image {
  width: 400px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.house-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
}

.details p {
  margin: 5px 0;
}

.pluses ul {
  padding-left: 20px;
  list-style-type: disc;
}

.gallery {
  margin-top: 20px;
}

.gallery-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}

.gallery-images img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
</style>