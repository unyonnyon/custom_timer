<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <custom-header></custom-header>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import CustomHeader from "./components/CustomHeader.vue";

export default {
  components: {
    CustomHeader,
  },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
