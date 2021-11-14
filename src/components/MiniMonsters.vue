<template>
  <v-container fluid class="py-0">
    <div class="d-flex flex-wrap justify-space-between">
      <div v-for="(monster, index) in monsters" :key="index" class="mb-3">
        <v-card width="120">
          <v-img height="120" :src="monster.img"></v-img>
          <v-card-text class="pa-2">
            <Counter channel="1ch" :monster="monster.name" />
            <Counter channel="2ch" :monster="monster.name" />
            <Counter channel="3ch" :monster="monster.name" />
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
      { img: "images/minis/vocal.png", name: "vocal" },
      { img: "images/minis/toad.png", name: "toad" },
      { img: "images/minis/eclipse.png", name: "eclipse" },
      { img: "images/minis/dragonfly.png", name: "dragonfly" },
      { img: "images/minis/master_ring.png", name: "master_ring" },
      { img: "images/minis/silver_grizzly.png", name: "silver_grizzly" },
      { img: "images/minis/choco.png", name: "choco" },
      { img: "images/minis/amber_knight_king.png", name: "amber_knight_king" },
      {
        img: "images/minis/obeaune_of_deepsea.png",
        name: "obeaune_of_deepsea",
      },
      { img: "images/minis/sasurai.png", name: "sasurai" },
      { img: "images/minis/tenka.png", name: "tenka" },
      { img: "images/minis/cat_nine_tale.png", name: "cat_nine_tale" },
      { img: "images/minis/griffon.png", name: "griffon" },
      { img: "images/minis/maya_purple.png", name: "maya_purple" },
      { img: "images/minis/hell_nightmare.png", name: "hell_nightmare" },
      { img: "images/minis/taiko.png", name: "taiko" },
      { img: "images/minis/kobold_leader.png", name: "kobold_leader" },
      { img: "images/minis/ghost_ring.png", name: "ghost_ring" },
      { img: "images/minis/anubis.png", name: "anubis" },
      { img: "images/minis/dark_priest.png", name: "dark_priest" },
    ];

    return {
      monsters,
    };
  },
});
</script>
