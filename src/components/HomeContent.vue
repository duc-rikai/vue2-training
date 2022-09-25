<template>
  <div>
    <el-row class="row">
      <span class="h1 col-md-3">
        Product: {{ $_capitalize(astros.product) }}
      </span>
      <el-button
        @click="showModal = true"
        type="info"
        plain
        class="col-md-1 ms-md-auto edit-m"
      >
        Form
      </el-button>
    </el-row>

    <div class="table-info">
      <h3>Table Infomation</h3>
      <el-table :data="listInfo" border>
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="birthday" label="Birthday">
          {{ $_formatBirthday(listInfo.birthday) }}
        </el-table-column>
        <el-table-column prop="age" label="Age">
          {{ $_calculateAge(listInfo.birthday) }}
        </el-table-column>
        <el-table-column prop="gender" label="Gender" />
        <el-table-column prop="phone" label="Phone" />
        <el-table-column prop="salary" label="Salary" />
        <el-table-column prop="memo" label="Memo" />
      </el-table>
    </div>

    <HomeContentForm
      :showModal="showModal"
      ref="homeContentForm"
      @hideModalForm="hideModalForm"
      @submitAccess="submitAccess"
    />

    <el-table :data="astros.dataseries" border style="width: 100%">
      <el-table-column prop="timepoint" label="Timepoint" />
      <el-table-column prop="cloudcover" label="Cloudcover" />
      <el-table-column prop="seeing" label="Seeing" />
      <el-table-column prop="transparency" label="Transparency" />
      <el-table-column prop="lifted_index" label="Lifted Index" />
      <el-table-column prop="rh2m" label="Rh2m" />
      <el-table-column prop="wind10m.direction" label="Direction" />
      <el-table-column prop="wind10m.speed" label="Speed" />
      <el-table-column prop="temp2m" label="Temp2m" />
      <el-table-column prop="prec_type" label="Prec Type" />
    </el-table>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.id">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import HomeContentForm from "./HomeContentForm.vue";
import mixinHomeContent from "@/mixins/MixinHomeContent";

export default {
  mixins: [mixinHomeContent],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    HomeContentForm,
  },

  data() {
    return {
      astros: [],
      errors: [],
      showModal: this.show,
    };
  },

  created() {
    axios
      .get(
        `https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0`
      )
      .then((response) => {
        this.astros = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  methods: {
    $_capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    hideModalForm(value) {
      this.showModal = value;
    },

    submitAccess(value) {
      this.listInfo = value;
    },
  },
};
</script>

<style scoped>
.edit-m {
  margin: 0 0.75rem 1rem 0;
}

.table-info {
  margin: 2rem 0 3rem;
}
</style>
