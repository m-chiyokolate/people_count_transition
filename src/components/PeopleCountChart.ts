import { Component, Mixins, Prop } from "vue-property-decorator";
import Chart from "chart.js";
import { Line, mixins } from "vue-chartjs";

@Component
export default class PeopleCountChart extends Mixins(
  Line,
  mixins.reactiveProp
) {
  @Prop({ default: null })
  chartData!: Chart.ChartData;

  @Prop({ default: null })
  options!: Chart.ChartOptions;

  public mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
