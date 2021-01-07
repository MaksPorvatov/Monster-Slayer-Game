"use strict";

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var app = Vue.createApp({
  data: function data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      cuurentRound: 0,
      winner: null,
      logMassages: []
    };
  },
  computed: {
    monsterBarStyles: function monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return {
          width: "0%"
        };
      }

      return {
        width: this.monsterHealth + "%"
      };
    },
    playerBarStyles: function playerBarStyles() {
      if (this.playerHealth < 0) {
        return {
          width: "0%"
        };
      }

      return {
        width: this.playerHealth + "%"
      };
    },
    mayUseSpecialAttack: function mayUseSpecialAttack() {
      return this.cuurentRound % 3 !== 0;
    }
  },
  watch: {
    playerHealth: function playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth: function monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    }
  },
  methods: {
    startGame: function startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.cuurentRound = 0;
      this.logMassages = [];
    },
    attackMonster: function attackMonster() {
      this.cuurentRound++;
      var attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMassage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer: function attackPlayer() {
      var attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMassage("monster", "attack", attackValue);
    },
    specialAttackMonster: function specialAttackMonster() {
      this.cuurentRound++;
      var attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMassage("player", "special-attack", attackValue);
      this.attackPlayer();
    },
    healPlayer: function healPlayer() {
      this.cuurentRound++;
      var healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      this.addLogMassage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender: function surrender() {
      this.winner = "monster";
    },
    addLogMassage: function addLogMassage(who, what, value) {
      this.logMassages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  }
});
app.mount("#game");