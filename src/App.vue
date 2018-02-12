<template>
    <div id="app">
        <Overview :allExpenses="allExpenses"/>
    </div>
</template>


<script lang="ts">
  import Overview from '@/components/Overview.vue'
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    components: {
      Overview,
    },
    data() {
      return {
        allExpenses: [],
      }
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
