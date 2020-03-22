<template>
  <div id="board">
    <canvas id="game-board"></canvas>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      squares: [[], [], [], [], [], [], [], [], []]
    };
  },
  methods: {
    drawBoard: function() {
      let canvas = document.getElementById("game-board");
      let boardContext = canvas.getContext("2d");
      let size = canvas.offsetWidth;
      var square = Math.floor(size / 3);

      this.drawVertical(boardContext, square, 0, 300);
      this.drawVertical(boardContext, square * 2, 0, 300);
      this.drawHorizontal(boardContext, square * 0.5, 0, 300);
      this.drawHorizontal(boardContext, square, 0, 300);
      this.populateLocation(100, 50);
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
    },
    populateLocation: function(width, height) {
      this.squares[0] = [height * 0, width * 0, width * 1, height * 1];
      this.squares[1] = [height * 0, width * 1, width * 2, height * 1];
      this.squares[2] = [height * 0, width * 2, width * 3, height * 1];
      this.squares[3] = [height * 1, width * 0, width * 1, height * 2];
      this.squares[4] = [height * 1, width * 1, width * 2, height * 2];
      this.squares[5] = [height * 1, width * 2, width * 3, height * 2];
      this.squares[6] = [height * 2, width * 0, width * 1, height * 3];
      this.squares[7] = [height * 2, width * 1, width * 2, height * 3];
      this.squares[8] = [height * 2, width * 2, width * 3, height * 3];
    }
  },
  mounted() {
    this.drawBoard();
  }
};
</script>

<style scoped>
#board {
  padding-left: 50px;
}
#game-board {
  width: 300px;
  height: 300px;
}
</style>