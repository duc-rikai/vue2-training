<template>
  <div>
    <h1>Product: {{ capitalize(astros.product) }}</h1>
    <table class="table table-bordered">
      <thead>
        <tr class="align-middle text-center w-auto">
          <th>Timepoint</th>
          <th>Cloudcover</th>
          <th>Seeing</th>
          <th>Transparency</th>
          <th>Lifted Index</th>
          <th>Rh2m</th>
          <th>Direction</th>
          <th>Speed</th>
          <th>Temp2m</th>
          <th>Prec Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="astro in astros.dataseries" :key="astro.Id">
          <td class="text-center">{{ astro.timepoint }}</td>
          <td class="text-center">{{ astro.cloudcover }}</td>
          <td class="text-center">{{ astro.seeing }}</td>
          <td class="text-center">{{ astro.transparency }}</td>
          <td class="text-center">{{ astro.lifted_index }}</td>
          <td class="text-center">{{ astro.rh2m }}</td>
          <td class="ps-3">{{ astro.wind10m.direction }}</td>
          <td class="text-center">{{ astro.wind10m.speed }}</td>
          <td class="text-center">{{ astro.temp2m }}</td>
          <td class="ps-3">{{ astro.prec_type }}</td>
        </tr>
      </tbody>
    </table>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" :key="error.id">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      astros: [],
      errors: [],
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
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scoped>
/*  */
</style>
