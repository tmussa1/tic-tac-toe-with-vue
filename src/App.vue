<template>
  <div>
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
        <button class="btn btn-outline-secondary" type="button" @click="playGame">Let's play</button>
      </div>
    </div>
    <div v-else>
      <NavBarComponent v-bind:username="username" />
      <b-container id="gameContainer">
        <b-row>
          <Home />
          <div id="spacer2"></div>
          <ChartComponent />
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
      username: ""
    };
  },
  methods: {
    playGame: function() {
      this.isAuthenticated = true;
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
