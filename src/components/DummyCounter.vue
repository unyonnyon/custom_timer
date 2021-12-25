<template>
  <v-sheet :width="width"> </v-sheet>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import PureTimer from "./PureTimer.vue";

export default defineComponent({
  components: {
    PureTimer,
  },
  props: {
    width: {
      type: Number,
      required: false,
      default: () => {
        return 120;
      },
    },
  },
  setup() {
    return {};
  },
});
</script>
