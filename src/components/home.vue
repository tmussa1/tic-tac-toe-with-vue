<template>
  <div id="board">
    <canvas id="game-board"></canvas>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  methods: {
    drawBoard: function() {
      let canvas = document.getElementById("game-board");
      let boardContext = canvas.getContext("2d");
      let size = canvas.offsetWidth;
      var square = Math.floor(size / 4);

      this.drawVertical(boardContext, square, 0, 300);
      this.drawVertical(boardContext, square * 2.5, 0, 300);
      this.drawHorizontal(boardContext, 0.75 * square, 0, 300);
      this.drawHorizontal(boardContext, square * 1.5, 0, 300);
      this.drawHorizontal(boardContext, square * 3, 0, 300);
    },
    drawVertical: function(boardContext, square, beginPoint, endPoint) {
      boardContext.beginPath();
      boardContext.moveTo(square, beginPoint);
      boardContext.lineTo(square, endPoint);
      boardContext.stroke();
    },
    drawHorizontal: function(boardContext, square, beginPoint, endPoint) {
      boardContext.beginPath();
      boardContext.moveTo(beginPoint, square);
      boardContext.lineTo(endPoint, square);
      boardContext.stroke();
    }
  },
  mounted() {
    this.drawBoard();
  }
};
</script>

<style scoped>
#board {
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 50px;
}
</style>