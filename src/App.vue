<template>
  <div id="app">
    <PrefecturesContainer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PrefecturesContainer from "./components/PrefecturesContainer.vue";

@Component({
  components: {
    PrefecturesContainer
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  margin-top: 40px;
}
</style>
