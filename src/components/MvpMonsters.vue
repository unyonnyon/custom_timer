<template>
  <v-container fluid class="py-0">
    <div class="d-flex flex-wrap justify-space-between">
      <div v-for="(monster, index) in monsters" :key="index" class="mb-3">
        <ImageCounter
          :img="monster.img"
          :monster="monster.name"
          :width="dynamicWidth"
        />
      </div>
      <custom-counter free="free1" :width="dynamicWidth" />
      <custom-counter free="free2" :width="dynamicWidth" />
      <custom-counter free="free3" :width="dynamicWidth" />
    </div>
  </v-container>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import ImageCounter from "./ImageCounter.vue";
import CustomCounter from "./CustomCounter.vue";

export default defineComponent({
  components: {
    ImageCounter,
    CustomCounter,
  },
  setup() {
    const dynamicWidth = computed(() => {
      const size = 10;
      const margin = 10;
      return Math.round((window.innerWidth - margin * size) / size);
    });

    const monsters = [
      { img: "images/mvps/angel_ring.png", name: "angel_ring" },
      { img: "images/mvps/golden_cockroach.png", name: "golden_cockroach" },
      { img: "images/mvps/devil_ring.png", name: "devil_ring" },
      { img: "images/mvps/orc_hero.png", name: "orc_hero" },
      { img: "images/mvps/maya.png", name: "maya" },
      { img: "images/mvps/orc_lord.png", name: "orc_lord" },
      { img: "images/mvps/goblin_leader.png", name: "goblin_leader" },
      { img: "images/mvps/drake.png", name: "drake" },
      { img: "images/mvps/edgar.png", name: "edgar" },
      { img: "images/mvps/mistress.png", name: "mistress" },
      { img: "images/mvps/osiris.png", name: "osiris" },
      { img: "images/mvps/phreeoni.png", name: "phreeoni" },
      { img: "images/mvps/wolyafa.png", name: "wolyafa" },
      { img: "images/mvps/dracula.png", name: "dracula" },
      { img: "images/mvps/doppelganger.png", name: "doppelganger" },
      { img: "images/mvps/pharaoh.png", name: "pharaoh" },
      { img: "images/mvps/baphomet.png", name: "baphomet" },
    ];
    return {
      dynamicWidth,
      monsters,
    };
  },
});
</script>
