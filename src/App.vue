<template lang="pug">
    #app
        Overview.overview
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


<style lang="stylus">
    @import '~vue-material/dist/vue-material.min.css'
    @import '~vue-material/dist/theme/default.css'

    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50

    #app .overview
        max-width: 800px
        margin: auto

</style>
