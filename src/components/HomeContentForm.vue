<template>
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
          >
            <el-form-item label="Name:" prop="name">
              <el-input
                v-model="formInline.name"
                class="input-edit"
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
                <span v-if="isNaN($_calculateAge(formInline.birthday))"></span>
                <span v-else-if="$_calculateAge(formInline.birthday) <= 1">
                  {{ $_calculateAge(formInline.birthday) }} year old
                </span>
                <span v-else>
                  {{ $_calculateAge(formInline.birthday) }} years old
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

            <el-form-item label="Phone:" prop="phone">
              <el-input
                v-model.lazy="formInline.phone"
                type="number"
                placeholder="Please enter your phone"
                class="input-phone input-edit"
              />
            </el-form-item>

            <el-form-item label="Salary:" prop="salary">
              <el-input
                v-model.lazy="formInline.salary"
                v-number="number"
                class="input-edit"
                placeholder="Please enter your salary"
              />
            </el-form-item>

            <div v-if="formInline.gender == 'male'">
              <el-form-item label="Memo:" prop="memo">
                <el-input
                  type="textarea"
                  v-model="formInline.memo"
                  class="input-edit"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click="submitForm('formInline')">
                  Create
                </el-button>
                <el-button @click.prevent="resetForm('formInline')"
                  >Reset</el-button
                >
                <el-button @click="$emit('hideModalForm', false)">
                  Cancel
                </el-button>
              </el-form-item>
            </el-form>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinHomeContent from "@/mixins/MixinHomeContent";

export default {
  mixins: [mixinHomeContent],
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      formInline: {
        name: "",
        gender: "",
        birthday: "",
        phone: "",
        salary: "",
        memo: "",
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
        memo: [
          {
            message: "Please enter your memo",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listInfo.push({
            name: this.formInline.name,
            gender: this.formInline.gender,
            phone: this.formInline.phone,
            salary: this.formInline.salary,
            memo: this.formInline.memo,
          });
          this.listInfo.birthday = this.formInline.birthday;
          this.$emit("hideModalForm", false);
          this.$emit("submitAccess", this.listInfo);
          console.log("success submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
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

.input-phone:deep() input[type="number"] {
  -moz-appearance: textfield;
}
.input-phone:deep() input::-webkit-outer-spin-button,
.input-phone:deep() input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.input-edit {
  width: 31rem;
}
.input-edit:deep() textarea {
  height: 7.5rem;
}
</style>
