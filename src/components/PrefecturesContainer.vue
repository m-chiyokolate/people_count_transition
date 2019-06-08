<template>
  <div>
    <PrefecturesCheckBox
      ref="prefecturesCheckBox"
      :prefectures="prefectures"
      @check="fetchPopulationComposition"
    ></PrefecturesCheckBox>
    <PeopleCountChart :options="chartOption" :chart-data="chartData"></PeopleCountChart>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PrefecturesCheckBox from "./PrefecturesCheckBox.vue";
import PeopleCountChart from "./PeopleCountChart";
import axios, { AxiosInstance } from "axios";
import Chart from "chart.js";

@Component({
  components: { PrefecturesCheckBox, PeopleCountChart }
})
export default class PrefecturesContainer extends Vue {
  axiosInstance: AxiosInstance | null = null;

  prefectures: Array<{ prefCode: number; prefName: string }> = [];
  colorList: Array<string> = [];

  chartData: Chart.ChartData = {};
  chartOption: Chart.ChartOptions = {};
  years: Array<string> = [];
  datasets: Array<object> = [];

  async created() {
    this.axiosInstance = axios.create({
      baseURL: "https://opendata.resas-portal.go.jp",
      headers: { "x-api-key": "ytmaVfwycyEmTmDc2FBpwQ5W6qV5lkqVJRKUqZaw" }
    });
    this.prefectures = await this.fetchPrefectures();
    for (let index = 0; index < this.prefectures.length; index++) {
      this.colorList.push(this.makeRandomColor());
    }
  }

  /**
   * 都道府県一覧取得
   */
  async fetchPrefectures() {
    if (!this.axiosInstance) {
      return;
    }
    const response = await this.axiosInstance.get("/api/v1/prefectures");
    return response.data.result;
  }

  makeRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * 人口構成を取得
   */
  async fetchPopulationComposition() {
    if (!this.axiosInstance) {
      return;
    }
    let checkedList = this.$refs.prefecturesCheckBox.checkedList;
    let datasetList: Array<object> = [];

    for (let index of checkedList) {
      let prefecture = this.prefectures[index - 1];
      const response = await this.axiosInstance.get(
        "/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
          prefecture.prefCode
      );

      let dataList = response.data.result.data[0].data;
      if (this.years.length === 0) {
        dataList.forEach((data: { year: number; value: number }) => {
          this.years.push(data.year.toString());
        });
      }

      let values: Array<number> = [];
      dataList.forEach((data: { year: number; value: number }) => {
        values.push(data.value);
      });

      datasetList.push({
        label: prefecture.prefName,
        backgroundColor: "transparent",
        borderColor: this.colorList[index - 1],
        data: values
      });
    }

    this.chartData = {
      labels: this.years,
      datasets: datasetList
    };
    this.chartOption = { responsive: true, maintainAspectRatio: false };
  }
}
</script>
