<template>
  <div>
    <mini-monsters />
    <mvp-monsters />
  </div>
</template>

<script>
import MiniMonsters from "../components/MiniMonsters.vue";
import MvpMonsters from "../components/MvpMonsters.vue";

export default {
  name: "Home",

  components: {
    MiniMonsters,
    MvpMonsters,
  },
};
</script>
