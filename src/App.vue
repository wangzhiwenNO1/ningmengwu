<template>
  <div id="app">
    <router-view />
    <Tabbars></Tabbars>
  </div>
</template>

<script>
import Tabbars from './components/Tabbars'
import './assets/css/reset.css'

export default {
  name: 'app',
  components: {
    Tabbars,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin-bottom:60px;
}
</style>
