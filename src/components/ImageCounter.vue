<template>
  <v-card>
    <v-img height="100"></v-img>
    <v-card-text>
      <Counter />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import Counter from "./Counter.vue";

export default {
  components: {
    Counter,
  },
  setup() {
    return {};
  },
};
</script>
