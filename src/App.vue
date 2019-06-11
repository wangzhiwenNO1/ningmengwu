<template>
  <div id="app">
    <HomeList></HomeList>
    <Tabbars></Tabbars>
  </div>
</template>

<script>
import Tabbars from './components/Tabbars'
import HomeList from './views/HomeList'
import './assets/css/reset.css'

export default {
  name: 'app',
  components: {
    Tabbars,
    HomeList
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
}
</style>
