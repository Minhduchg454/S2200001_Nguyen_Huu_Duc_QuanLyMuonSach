<script>
import AppHeader from "@/components/AppHeader.vue";
import { provide, ref } from "vue";
export default {
  components: {
    AppHeader,
  },
  computed: {
    showHeader() {
      return !this.$route.meta.noHeader;
    },
  },
  data() {
    return {
      user: {}, // Biến lưu user
    };
  },
  setup() {
    // Khởi tạo user từ localStorage hoặc null
    const user = ref(JSON.parse(localStorage.getItem("user")) || null);

    // Hàm để cập nhật user
    const setUser = (userData) => {
      user.value = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    };

    // Hàm để xóa user
    const clearUser = () => {
      user.value = null;
      localStorage.removeItem("user");
    };

    // Provide các giá trị cho các component con
    provide("user", user);
    provide("setUser", setUser);
    provide("clearUser", clearUser);
    return { user };
  },
};
</script>
<template>
  <div id="app">
    <AppHeader v-if="showHeader" />
    <div class="main--custom">
      <router-view />
    </div>
  </div>
</template>

<style>
@import "/src/assets/main.css";
.main--custom {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh; /* Chiều cao toàn màn hình */
  width: 100%; /* Chiều rộng full */
}
</style>
