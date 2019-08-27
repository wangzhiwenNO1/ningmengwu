<template>
  <div id="app">
    <router-view />
    <Tabbars></Tabbars>
  </div>
</template>

<script>
import HomeList from './views/HomeList.vue'
import Tabbars from './components/Tabbars.vue'

export default {
  name: 'app',
  components: {
    Tabbars
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 0 30px;
}
</style>
