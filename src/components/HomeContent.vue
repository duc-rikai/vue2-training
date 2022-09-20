<template>
  <div>
    <el-row class="row">
      <span class="h1 col-md-3">Product: {{ capitalize(astros.product) }}</span>
      <el-button
        @click="showModal = true"
        type="info"
        plain
        class="col-md-1 ms-md-auto edit-m"
      >
        Form
      </el-button>
    </el-row>

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

    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h1 name="header">Infomation</h1>
          </div>

          <div class="modal-body">
            <el-form
              :inline="true"
              :model="formInline"
              :rules="rules"
              ref="formInline"
              label-width="120px"
              class="demo-formInline"
            >
              <el-form-item label="Name:" prop="name">
                <el-input
                  v-model="formInline.name"
                  style="width: 31rem"
                  placeholder="Please enter your name"
                />
              </el-form-item>

              <el-col :span="10">
                <el-form-item label="Birthday:" prop="birthday">
                  <el-date-picker
                    placeholder="Pick a date"
                    v-model="formInline.birthday"
                    style="width: 8.5rem"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <div class="age-field">
                  <label for="age">Age: </label>
                  <span v-if="isNaN(calculateAge(formInline.birthday))"></span>
                  <span v-else-if="calculateAge(formInline.birthday) <= 1">
                    {{ calculateAge(formInline.birthday) }} year old
                  </span>
                  <span v-else>
                    {{ calculateAge(formInline.birthday) }} years old
                  </span>
                </div>
              </el-col>

              <el-col :span="9">
                <el-form-item label="Gender:" prop="gender">
                  <el-select
                    v-model="formInline.gender"
                    placeholder="Select your gender"
                    style="width: 6rem"
                  >
                    <el-option label="Male" value="male"></el-option>
                    <el-option label="Female" value="female"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-form-item
                label="Phone:"
                prop="phone"
                @keypress="isNumber($event)"
              >
                <el-input
                  v-model="formInline.phone"
                  style="width: 31rem"
                  type="number"
                  placeholder="Please enter your phone"
                />
              </el-form-item>

              <el-form-item
                label="Salary:"
                prop="salary"
                @keypress="isNumber($event)"
              >
                <el-input
                  v-model="formInline.salary"
                  v-number="number"
                  style="width: 31rem"
                  placeholder="Please enter your salary"
                />
              </el-form-item>
            </el-form>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-form>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('formInline')">
                    Create
                  </el-button>
                  <el-button @click="resetForm('formInline')">Reset</el-button>
                  <el-button @click="hideModal">Cancel</el-button>
                </el-form-item>
              </el-form>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { vNumber } from "@coders-tm/vue-number-format";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      astros: [],
      errors: [],
      showModal: this.show,
      formInline: {
        name: "",
        gender: "",
        birthday: "",
        phone: "",
        salary: "",
      },
      number: {
        decimal: ".",
        separator: ",",
        suffix: " VND",
        precision: 2,
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please enter your name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 50,
            message: "Length should be 3 to 50",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select your gender",
            trigger: "change",
          },
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            message: "Please enter your phone number",
            trigger: "blur",
          },
          {
            len: 10,
            message: "Length should be 10",
            trigger: "blur",
          },
        ],
        salary: [
          {
            required: true,
            message: "Please enter your salary",
            trigger: "blur",
          },
        ],
      },
    };
  },

  directives: {
    number: vNumber,
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

    hideModal() {
      this.showModal = false;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    calculateAge: function (birthday) {
      let currentDate = new Date();
      let birthDate = new Date(birthday);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
  },
};
</script>

<style scoped>
.edit-m {
  margin: 0 0.75rem 1rem 0;
}

.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.age-field {
  margin: 0.5rem 0 0 0.5rem;
}

.el-form-item {
  margin-bottom: 2rem;
}
</style>
