<template>
  <v-sheet>
    <mini-monsters class="mt-3" />
    <mvp-monsters />
  </v-sheet>
</template>

<script>
import MiniMonsters from "../components/MiniMonsters";
import MvpMonsters from "../components/MvpMonsters";

export default {
  name: "Home",

  components: {
    MiniMonsters,
    MvpMonsters,
  },
};
</script>
