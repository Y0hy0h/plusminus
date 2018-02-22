<template lang="pug">
    #app
        v-app
            v-content
                v-container
                    Overview
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
    @import '~vuetify/src/stylus/main'

    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50

    #app .container
        max-width: 800px

</style>
