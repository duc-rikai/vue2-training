// import Vue from "vue";
import moment from "moment";
import { vNumber } from "@coders-tm/vue-number-format";

export default {
  data() {
    return {
      listInfo: [],

      number: {
        decimal: ".",
        separator: ",",
        suffix: " VND",
        precision: 2,
      },
    };
  },

  directives: {
    number: vNumber,
  },

  methods: {
    $_calculateAge(birthday) {
      let currentDate = new Date();
      let birthDate = new Date(birthday);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },

    $_formatBirthday(birthday) {
      if (birthday) {
        return moment().format("DD/MM/YYYY");
      }
    },
  },
};
