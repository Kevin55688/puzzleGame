<template>
  <puzzleComponent/>
</template>

<script>
import puzzleComponent from './components/puzzle.vue'
export default {
  name: 'App',
  components: {
    puzzleComponent,
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

*::-webkit-scrollbar {
    width: 10px;
    }
*::-webkit-scrollbar-track {
  background: #f3eeee;
  width: 10px;
  border-radius: 10px;
  }

*::-webkit-scrollbar-thumb {
  background-color: #af8c2c;
  border-radius: 10px;
  border: 3px solid #ffffff;
  }

body {
background-image:  linear-gradient(rgba(118,126,60,.9) 4px, transparent 4px), linear-gradient(to right, rgba(118,126,60,) 4px, rgba(189,167,117) 4px);
background-size: 800px 400px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>
