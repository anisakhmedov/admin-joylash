<template>
  <div id="defaultView">
    <Header v-show="!showHeader" />
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHeader: true
    }
  },
  mounted() {
    this.showHeader = this.$route.name === 'register'
    if (!localStorage.enter) {
      this.$router.push('/register')
    } 
  }
}
</script>

<style></style>