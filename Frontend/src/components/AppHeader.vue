<template>
  <nav class="navbar-custom">
    <div class="custom-left">
      <a href="/" class="logo--nav">
        <img src="@/assets/image/logo_app.png" alt="Logo" class="logo-image" />
        <span class="logo-text">{{ logoName() }}</span>
      </a>
      <ul class="nav-links">
        <li>
          <router-link :to="{ name: 'trangchu' }" class="nav-link">
            <i class="fas fa-book"></i> <span class="nav-text">Sách</span>
          </router-link>
        </li>

        <li v-if="user?.role === 'nhanvien'">
          <router-link :to="{ name: 'nhaxuatban' }" class="nav-link">
            <i class="fas fa-building"></i>
            <span class="nav-text">Nhà xuất bản</span>
          </router-link>
        </li>

        <li v-if="user?.role === 'nhanvien'">
          <router-link :to="{ name: 'nhanvien' }" class="nav-link">
            <i class="fas fa-user-tie"></i>
            <span class="nav-text">Nhân viên</span>
          </router-link>
        </li>

        <li v-if="user?.role === 'nhanvien'">
          <router-link :to="{ name: 'docgia' }" class="nav-link">
            <i class="fas fa-users"></i> <span class="nav-text">Độc giả</span>
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'theodoimuonsach' }" class="nav-link">
            <i class="fas fa-clipboard-list"></i>
            <span class="nav-text">Theo dõi mượn sách</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Nút Đăng xuất -->
    <div class="custom--right">
      <span class="right--info" v-if="user">Xin chào, {{ user.userName }}</span>
      <button v-if="user" class="logout--custom" @click="logout">
        Đăng xuất
      </button>
      <router-link v-else :to="{ name: 'dangnhap' }" class="nav-link">
        Đăng nhập
      </router-link>
    </div>
  </nav>
</template>

<script>
import { inject, computed } from "vue";
import { useRouter } from "vue-router"; // Import useRouter

export default {
  setup() {
    const user = inject("user"); // user là ref reactive
    const clearUser = inject("clearUser");
    const router = useRouter();

    const logout = () => {
      const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (confirmLogout) {
        clearUser(); // Xóa user reactive
        router.push({ name: "dangnhap" }); // Chuyển hướng không cần reload
      }
    };

    const logoName = () => {
      return user.value.role === "docgia"
        ? "Thư viện sách"
        : "Quản lý mượn sách";
    };

    return { user, logout, logoName };
  },
};
</script>

<style scoped>
@import "@/assets//main.css";
</style>
