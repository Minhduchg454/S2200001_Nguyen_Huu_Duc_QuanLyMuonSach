<template>
  <nav class="navbar-custom">
    <div class="custom-left">
      <a href="/" class="logo--nav">{{ logoName() }} </a>
      <ul class="nav-links">
        <li>
          <router-link :to="{ name: 'trangchu' }" class="nav-link">
            <i class="fas fa-book"></i> Sách
          </router-link>
        </li>

        <li v-if="user?.role === 'nhanvien'">
          <router-link :to="{ name: 'nhaxuatban' }" class="nav-link">
            <i class="fas fa-building"></i> Nhà xuất bản
          </router-link>
        </li>

        <li v-if="user?.role === 'nhanvien'">
          <router-link :to="{ name: 'nhanvien' }" class="nav-link">
            <i class="fas fa-user-tie"></i> Nhân viên
          </router-link>
        </li>

        <li v-if="user?.role === 'nhanvien'">
          <router-link :to="{ name: 'docgia' }" class="nav-link">
            <i class="fas fa-users"></i> Độc giả
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'theodoimuonsach' }" class="nav-link">
            <i class="fas fa-clipboard-list"></i> Theo dõi mượn sách
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Nút Đăng xuất -->
    <div class="custom--right">
      <span class="right--info" v-if="user">Xin chào, {{ user.userName }}</span>
      <button v-if="user" class="btn btn-danger btn-sm" @click="logout">
        Đăng xuất
      </button>
      <router-link v-else :to="{ name: 'dangnhap' }" class="nav-link"
        >Đăng nhập</router-link
      >
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
.navbar-custom {
  padding: 10px;
  background-color: rgb(5, 12, 119);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 5rem;
}

.custom-left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.logo--nav {
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: white;
  margin-right: 15px;
}

.nav-links {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 20px;
  justify-content: center;
  padding: 10px;
  margin: 0px 10px;
}

.logo--nav:hover,
.nav-link:hover {
  color: aqua;
}

/* Bên phải */
.custom--right {
  display: flex;
  margin: 0px;
  align-items: center;
}

.right--info {
  margin-right: 5px;
}
.btn-sm {
  margin-left: 10px;
}
</style>
