<template>
  <v-app>
    <v-app-bar
      app
      color="accent-1"
      dark
      class="flex-wrap"
    >
      <v-app-bar-nav-icon 
      class="mr-6"
      @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://bs.world/templates/wss/images/logo.svg"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-app-bar-title class="d-none d-sm-block">
        <h1 class="display-1">Blockchain Solutions</h1>
      </v-app-bar-title>


      <v-spacer></v-spacer>
      <span class="mr-5 header-description">Конвертер криптовалют. Тестовое задание на позицию Frontend Developer Стажировка</span>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>

          <v-list-item to="/portfolio">
            <v-list-item-icon>
              <v-icon>mdi-briefcase</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Портфель</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'App',

  data: () => ({
    drawer: false,
    test: []
  }),
  methods: {
    ...mapActions(['getAllCharts', 'getConvertionUSD', 'getAllCharts2']),

  },
  created () {
    // this.getAllCharts();
    this.getConvertionUSD();
    this.getAllCharts2();
    // let twoWeeks = 1000 * 60 * 60 * 24 * 15;
    // let twoWeeksTime = new Date().getTime() - twoWeeks;


    // for (let i = 0; i < 14; i++) {
    //   console.log(twoWeeksTime + (1000 * 60 * 60 * 24 * (i + 1)))
    //   let date = new Date(twoWeeksTime + (1000 * 60 * 60 * 24 * (i + 1)));
    //   console.log(date);
    //   let dateFormatted = (date.getFullYear()) + '-' +
    //     ((date.getMonth()+1) < 10 ? "0"+ (date.getMonth()+1): (date.getMonth()+1)) + '-' +
    //     (date.getDate() < 10 ? "0"+(date.getDate()): (date.getDate()));
    //   console.log(i, dateFormatted)
    //   fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${dateFormatted}/currencies/eth/usd.json`)
    //   .then((response) => response.json())
    //   .then((data) => this.test.push(data))
    //   .then(() => console.log(this.test))
    // }

  },
};
</script>


<style lang="scss">
@media (max-width: 1200px) {
  .header-description {
    display: none;
  }
}

.v-card__title {
  word-break: normal !important;
}
</style>