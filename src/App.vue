<template>
  <v-app>
    <v-app-bar
      app
      color="accent-1"
      dark
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
      <v-app-bar-title>
        <h1 class="display-1">Blockchain Solutions</h1>
      </v-app-bar-title>


      <v-spacer></v-spacer>
      <span class="mr-5 display-1">Конвертер криптовалют</span>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
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

export default {
  name: 'App',

  data: () => ({
    drawer: false
  }),
};
</script>
