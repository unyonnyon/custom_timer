<template>
  <v-container fluid class="d-flex align-center mr-4">
    <div class="text-h2">もちもちたいまー</div>
    <v-btn icon @click="toggleActiveSound" class="ml-auto">
      <v-icon v-if="isActiveSound">mdi-volume-high</v-icon>
      <v-icon v-else>mdi-volume-off</v-icon>
    </v-btn>
    <v-sheet v-if="isActiveSound" color="grey darken-3 rounded px-3 py-1">
      <span class="mr-3">MVP Sound</span>
      <v-btn-toggle mandatory multiple v-model="value">
        <v-btn>2</v-btn>
        <v-btn>5</v-btn>
        <v-btn>10</v-btn>
      </v-btn-toggle>
    </v-sheet>
  </v-container>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const isActiveSound = ref(false);
    const toggleActiveSound = () => {
      isActiveSound.value = !isActiveSound.value;
    };
    return {
      isActiveSound,
      toggleActiveSound,
    };
  },
});
</script>
