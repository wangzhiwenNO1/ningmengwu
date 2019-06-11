<template>
  <div id="app">
    <Tabbars></Tabbars>
  </div>
</template>

<script>
import Tabbars from './components/Tabbars'

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
  color: #2c3e50;
}
</style>
