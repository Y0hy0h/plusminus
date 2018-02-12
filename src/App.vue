<template>
    <div id="app">
        <Overview/>
    </div>
</template>


<script lang="ts">
  import Overview from '@/components/Overview.vue'
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {
      Overview,
    },
  })
  export default class App extends Vue {
  }
</script>


<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
