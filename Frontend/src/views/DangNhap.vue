<template>
  <DangNhapForm @submit:login="login" />
</template>

<script>
import DangNhapForm from "@/components/DangNhapForm.vue";
import XacthucService from "@/services/xacthuc.service";
import { inject } from "vue";

export default {
  components: {
    DangNhapForm,
  },
  setup() {
    const setUser = inject("setUser"); // Inject setUser từ App.vue
    return { setUser };
  },
  methods: {
    async login(data) {
      try {
        console.log(data);
        const response = await XacthucService.dangNhap(data);

        // Lấy token và user từ response
        const token = response.token?.token;
        const user = response.token?.user;

        if (!token || !user) {
          throw new Error("Dữ liệu trả về không hợp lệ!");
        }

        // Lưu token vào localStorage
        localStorage.setItem("token", token);

        // Cập nhật user bằng setUser (đồng thời lưu vào localStorage)
        this.setUser(user);

        // Kiểm tra dữ liệu đã lưu
        console.log("Token đã lưu:", localStorage.getItem("token"));
        console.log("User đã lưu:", JSON.parse(localStorage.getItem("user")));

        this.$router.push({ name: "trangchu" });
      } catch (error) {
        console.log(error);
        alert("Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản/mật khẩu.");
      }
    },
  },
};
</script>
