<template>
  <!-- Phuong thuc xac thuc du lieu cua form loginFormSchema -->
  <Form
    @submit="submitLogin"
    :validation-schema="loginFormSchema"
    v-slot="{ meta }"
    class="form--custom"
  >
    <h3>Đăng nhập</h3>
    <div class="form-group">
      <label for="userName">Tên đăng nhập</label>
      <Field
        id="userName"
        name="userName"
        type="text"
        class="form-control form-control--input"
        v-model="userLocal.userName"
        autofocus
      />
      <ErrorMessage name="userName" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field
        id="password"
        name="password"
        type="password"
        class="form-control form-control--input"
        v-model="userLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="controlButton">
      <button
        class="btn--custom"
        type="submit"
        :disabled="!meta.valid"
        @click="submitLogin"
      >
        Đăng nhập
      </button>
      <br />
      <button class="btn--link" type="button" @click="gotoRegister">
        Tạo tài khoản
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

// Đặt schema ra ngoài để tối ưu hiệu suất
const loginFormSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Tên đăng nhập không được để trống.")
    .min(2, "Tên đăng nhập phải có ít nhất 2 ký tự."),
  password: yup
    .string()
    .required("Mật khẩu không được để trống.")
    .min(2, "Mật khẩu phải có ít nhất 2 ký tự."),
});

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:login"],

  data() {
    //Du lieu khoi tao ban dau
    return {
      userLocal: {
        userName: "",
        password: "",
      },
      loginFormSchema,
    };
  },
  methods: {
    submitLogin() {
      this.$emit("submit:login", this.userLocal);
    },

    // Đổi tên hàm này để khớp với template
    gotoRegister() {
      this.$router.push({ name: "dangkydocgia" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/main.css";
.form--custom {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto; /* Giúp căn giữa theo chiều dọc, dựa vào cha  main--custom*/
  border-radius: 15px;
  padding: 10px;
}

.controlButton {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.btn--custom {
  width: 150px;
  border-radius: 5px;
  color: white;
  background-color: blue;
  border: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

/* Khi click vào nút, hiệu ứng phóng to */
.btn--custom:hover {
  transform: scale(1.1);
}

/* Khi nút bị disable */
.btn--custom:disabled {
  background-color: gray;
  cursor: not-allowed;
  /* Bieu tuong com tro thanh dau huy */
  opacity: 0.6;
  /* Làm mờ */
}
.btn--link {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  transition: transform 0.2s ease, background-color 0.2s ease;
  /* Hieu ung chuyen doi, cham hon 0.2s truoc khi hoan thanh */
}
.btn--link:hover {
  transform: scale(1.1);
}

@import "@/assets//main.css";
</style>
