<template>
  <v-container fluid class="py-0">
    <div class="d-flex flex-wrap justify-space-between">
      <div v-for="(img, index) in monsters" :key="index" class="mb-3">
        <ImageCounter :img="img" />
      </div>
      <custom-counter />
      <custom-counter />
      <custom-counter />
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import ImageCounter from "./ImageCounter.vue";
import CustomCounter from "./CustomCounter.vue";

export default defineComponent({
  components: {
    ImageCounter,
    CustomCounter,
  },
  setup() {
    const monsters = [
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
      "images/master_ring.png",
    ];

    return {
      monsters,
    };
  },
});
</script>
