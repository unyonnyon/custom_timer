<template>
  <v-container fluid class="d-flex align-center">
    <div class="text-h3">もちもちたいまー</div>
    <v-btn icon @click="toggleSoundActive" class="ml-auto">
      <v-icon v-if="isSoundActive">mdi-volume-high</v-icon>
      <v-icon v-else>mdi-volume-off</v-icon>
    </v-btn>
    <v-sheet v-if="isSoundActive" color="grey darken-3 rounded px-3 py-1">
      <span class="mr-3">MVP Sound</span>
      <v-btn-toggle mandatory multiple v-model="selected">
        <v-btn value="2">2</v-btn>
        <v-btn value="5"> 5</v-btn>
        <v-btn value="10">10</v-btn>
      </v-btn-toggle>
    </v-sheet>
  </v-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import store from "../store/index";

export default defineComponent({
  setup() {
    const selected = ref();
    const isSoundActive = ref(false);
    const toggleSoundActive = () => {
      isSoundActive.value = !isSoundActive.value;
      store.dispatch("setSound", isSoundActive.value);
    };

    return {
      selected,
      isSoundActive,
      toggleSoundActive,
    };
  },
});
</script>
