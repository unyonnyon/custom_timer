<template>
  <v-container fluid>
    <div class="d-flex flex-wrap justify-space-between">
      <div v-for="(img, index) in monsters" :key="index" class="mb-4">
        <v-card>
          <v-img height="120" :src="img"></v-img>
          <v-card-text>
            <Counter name="1ch" />
          </v-card-text>
        </v-card>
      </div>
      <div>
        <v-card>
          <v-img height="120" width="414" :src="img"></v-img>
          <v-card-text>
            <Counter name="1ch" />
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Counter from "./CustomCounter.vue";

export default defineComponent({
  components: {
    Counter,
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
