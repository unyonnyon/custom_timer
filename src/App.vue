<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <custom-header></custom-header>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer color="black" dark>
      <v-container>
        <v-row justify="center">
          ©Gravity Co., Ltd. & LeeMyoungJin(studio DTDS) All rights reserved.
        </v-row>
        <v-row justify="center"
          >©GungHo Online Entertainment, Inc. All Rights Reserved.</v-row
        >
      </v-container>
    </v-footer>
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
