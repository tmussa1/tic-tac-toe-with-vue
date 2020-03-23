<template>
  <div>
    <!-- Landing page -->
    <div id="landing" class="input-group mb-3 col-md-6" v-if="!isAuthenticated">
      <h3>Let's play Tic Tac Toe</h3>
      <div id="spacer1"></div>
      <input
        type="text"
        class="form-control"
        placeholder="Please enter your name"
        v-model="username"
        id="user"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          id="playButton"
          type="button"
          @click="playGame"
        >Let's play</button>
      </div>
      <div v-if="showAlert">
        <div :class="alertFailure" role="alert">Please enter a valid name</div>
      </div>
    </div>
    <div v-else>
      <NavBarComponent v-bind:username="username" />
      <b-container id="gameContainer">
        <b-row>
          <!-- These child components communicate through the parent -->
          <Home v-on:update-win="updateWin($event)" v-on:update-loss="updateLoss($event)" />
          <div id="spacer2"></div>
          <ChartComponent v-bind:winCount="winCount" v-bind:lossCount="lossCount"/>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Home from "./components/home.vue";
import ChartComponent from "./components/chart.vue";
import NavBarComponent from "./components/navBar";

export default {
  name: "App",
  components: {
    Home,
    ChartComponent,
    NavBarComponent
  },
  data: function() {
    return {
      isAuthenticated: false,
      username: "",
      showAlert: false,
      /**
       * Dynamically bind to give useful message to user
       */
      alertFailure: "alert alert-danger col-md-12",
      winCount: 0,
      lossCount: 0
    };
  },
  methods: {
    /**
     * Disable the button that allows playing the game
     * and give hint to user
     */
    playGame: function() {
      if (this.username.length >= 1) {
        this.isAuthenticated = true;
        this.showAlert = false;
        document.getElementById("playButton").disabled = false;
      } else {
        this.showAlert = true;
        document.getElementById("playButton").disabled = true;
      }
    },
    /**
     * receive message from a child which will be propagated to another child
     */
    updateWin: function(winCount) {
      this.winCount = winCount;
    },
    updateLoss: function(lossCount) {
      this.lossCount = lossCount;
    }
  },
  watch: {
    /**
     * User won't be allowed to play the game with an invalid name
     */
    username: function() {
      if (this.username.length >= 1) {
        this.playGame();
      }
    }
  }
};
</script>

<style>
#landing {
  margin-top: 300px;
  margin-left: 300px;
}
#spacer2 {
  padding-left: 200px;
}
#spacer1 {
  padding-left: 100px;
}
#gameContainer {
  margin-top: 150px;
}
</style>
