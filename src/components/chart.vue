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
      winningStatistics: winningStatistics
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
  }
};
</script>

<style>
#chartDiv {
  width: 500px;
  height: 500px;
}
</style>