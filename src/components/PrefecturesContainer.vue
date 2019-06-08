<template>
  <div>
    <PrefecturesCheckBox :prefectures="prefectures" v-model="checkedList"></PrefecturesCheckBox>
    <PeopleCountChart :options="chartOption" :chart-data="chartData"></PeopleCountChart>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import PrefecturesCheckBox from "./PrefecturesCheckBox.vue";
import PeopleCountChart from "./PeopleCountChart";
import axios from "axios";
import Chart from "chart.js";

@Component({
  components: { PrefecturesCheckBox, PeopleCountChart }
})
export default class PrefecturesContainer extends Vue {
  apiUrl: string = "https://opendata.resas-portal.go.jp";
  apiKey: string = "ytmaVfwycyEmTmDc2FBpwQ5W6qV5lkqVJRKUqZaw";
  config: object = { headers: { "x-api-key": this.apiKey } };
  prefectures: Array<object> = [];

  checkedList: Array<string> = [];

  chartData: Chart.ChartData = {};
  chartOption: Chart.ChartOptions = {};

  created() {
    this.fetchPrefectures();
  }

  async fetchPrefectures() {
    const response = await axios.get(
      this.apiUrl + "/api/v1/prefectures",
      this.config
    );
    this.prefectures = response.data.result;
  }

  @Watch("checkedList")
  async fetchPopulationComposition() {
    const response = await axios.get(
      this.apiUrl + "/api/v1/population/composition/perYear?prefCode=" + "1",
      this.config
    );
    this.chartData = response.data.result.data[0].data;
  }
}
</script>
