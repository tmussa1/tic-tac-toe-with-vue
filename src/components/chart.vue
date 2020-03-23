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
    /**
     * Draws the initial chart
     */
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
  /**
   * Received the loss and win count to dynamically update the chart
   */
  props: ["lossCount", "winCount"],
  watch: {
    immediate: true,
    /**
     * Reflect loss count in the chart. The sum of wins and losses
     * can be a maximum of 10. Possible attempts will be aminimum of 0
     */
    lossCount: function() {
      if (this.updatedWinCount + this.updatedLossCount <= 10) {
        this.updatedLossCount = this.$props.lossCount;
      }

      this.winningStatistics.data.datasets[0].data[2] = this.updatedLossCount;
      this.winningStatistics.data.datasets[0].data[0] =
        10 - (this.updatedLossCount + this.updatedWinCount) > 0
          ? 10 - (this.updatedLossCount + this.updatedWinCount)
          : 0;
      this.formChart(this.winningStatistics);
    },
    /**
     * Reflect win count in the chart. The sum of wins and losses
     * can be a maximum of 10. Possible attempts will be aminimum of 0
     */
    winCount: function() {
      if (this.updatedWinCount + this.updatedLossCount <= 10) {
        this.updatedWinCount = this.$props.winCount;
      }

      this.winningStatistics.data.datasets[0].data[1] = this.updatedWinCount;
      this.winningStatistics.data.datasets[0].data[0] =
        10 - (this.updatedLossCount + this.updatedWinCount) > 0
          ? 10 - (this.updatedLossCount + this.updatedWinCount)
          : 0;
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