<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-header"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <div id="logo">
          <router-link :to="{ name: 'home' }">Logo</router-link>
        </div>
      </el-menu-item>
      <el-menu-item index="1">
        <div class="menu-item">
          <router-link :to="{ name: 'home' }">Home</router-link>
        </div>
      </el-menu-item>
      <el-submenu index="2" class="menu-item">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <div class="menu-item">
          <router-link :to="{ name: 'about' }">About</router-link>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-header {
  background-color: #545c64;
  color: #fff;
}

#logo {
  width: 100px;
  text-align: center;
}
.menu-item {
  margin: 0 20px;
}

a:link {
  text-decoration: none;
}
</style>
