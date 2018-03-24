<template lang="pug">
    v-menu(
    ref="menu"
    v-model="dateMenu"
    lazy
    min-width="290px"
    full-width
    offset-y
    :nudge-right="40"
    :close-on-content-click="false"
    :return-value.sync="dateString"
    )
        v-text-field(
        slot="activator"
        label="Date"
        :value="date | date"
        prepend-icon="event"
        readonly
        )
        v-date-picker(v-model="dateString" no-title scrollable)
            v-spacer
            v-btn(flat color="primary" @click="dateMenu = false") Cancel
            v-btn(flat color="primary" @click="$refs.menu.save(dateString)") OK</template>

<script lang="ts">
  import { Component, Model, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class DatePickerField extends Vue {
    // TODO: Remove this fix for runtime error:
    // 'Invalid prop: type check failed for prop "date". Expected Object, got Date.'
    @Prop({type: Date})
    @Model()
    private date: Date

    private dateMenu: boolean = false

    get dateString(): string {
      return this.date.toISOString().slice(0, 10)
    }

    set dateString(dateString: string) {
      this.date = new Date(dateString)
      this.$emit('change', this.date)
    }

  }
</script>

<style scoped>

</style>