<template>
  <div id="chartDiv">
    <canvas id="player-statistics"></canvas>
  </div>
</template>

<script>
import winningStatistics from "../../public/data";
import Chart from "chart.js";

/* eslint-disable no-unused-vars */

export default {
  data: function() {
    return {
      winningStatistics: winningStatistics,
      updatedWinCount: 0,
      updatedLossCount: 0
    };
  },
  methods: {
    formChart: function(statistics) {
      let chartCanvas = document.getElementById("player-statistics");
      let playerChart = new Chart(chartCanvas, {
        type: statistics.type,
        data: statistics.data,
        options: statistics.options
      });
    }
  },
  mounted() {
    this.formChart(this.winningStatistics);
  },
  props: ["lossCount", "winCount"],
  watch: {
    immediate: true,
    lossCount: function() {
      this.updatedLossCount = this.$props.lossCount;
      this.winningStatistics.data.datasets[0].data[2] = this.updatedLossCount;
      this.winningStatistics.data.datasets[0].data[0] =
        10 - (this.updatedLossCount + this.updatedWinCount);
      this.formChart(this.winningStatistics);
    },
    winCount: function() {
      this.updatedWinCount = this.$props.winCount;
      this.winningStatistics.data.datasets[0].data[1] = this.updatedWinCount;
      this.winningStatistics.data.datasets[0].data[0] =
        10 - (this.updatedLossCount + this.updatedWinCount);
      this.formChart(this.winningStatistics);
    }
  }
};
</script>

<style>
#chartDiv {
  width: 500px;
  height: 500px;
}
</style>