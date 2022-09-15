<template>
  <el-container>
    <el-aside class="home-menu"><HomeMenu /></el-aside>
    <el-main><HomeContent /></el-main>
  </el-container>
</template>

<script>
import HomeMenu from "../components/HomeMenu.vue";
import HomeContent from "../components/HomeContent.vue";

export default {
  components: {
    HomeMenu,
    HomeContent,
  },
};
</script>

<style scoped>
/*  */
</style>
