<template>
  <div id="app">
    <el-container>
      <el-header class="home-header"><HomeHeader /></el-header>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";

export default {
  components: {
    HomeHeader,
  },
};
</script>

<style scoped>
/*  */
</style>
