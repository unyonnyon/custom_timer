<template>
  <v-container fluid>
    <div class="d-flex flex-wrap justify-space-between">
      <div v-for="(img, index) in monsters" :key="index" class="mb-3">
        <v-card>
          <v-img height="120" :src="img"></v-img>
          <v-card-text>
            <Counter name="1ch" />
            <Counter name="2ch" />
            <Counter name="3ch" />
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Counter from "./Counter.vue";

export default defineComponent({
  components: {
    Counter,
  },
  setup() {
    const monsters = [
      "images/vocal.png",
      "images/toad.png",
      "images/eclipse.png",
      "images/dragonfly.png",
      "images/master_ring.png",
      "images/silver_grizzly.png",
      "images/choco.png",
      "images/amber_knight_king.png",
      "images/obeaune_of_deepsea.png",
      "images/sasurai.png",
      "images/tenka.png",
      "images/cat_nine_tale.png",
      "images/griffon.png",
      "images/maya_purple.png",
      "images/hell_nightmare.png",
      "images/taiko.png",
      "images/kobold_leader.png",
      "images/ghost_ring.png",
      "images/anubis.png",
      "images/dark_priest.png",
    ];

    return {
      monsters,
    };
  },
});
</script>
