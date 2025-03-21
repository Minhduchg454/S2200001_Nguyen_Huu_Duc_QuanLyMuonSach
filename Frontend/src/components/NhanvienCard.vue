<template>
  <div>
    <div class="p-1">
      <strong>Mã nhân viên:</strong>
      {{ employee._id }}
    </div>
    <div class="p-1" v-show="user.id === employee._id">
      <strong>Mật khẩu:</strong>
      {{ employee.NV_Password }}
    </div>
    <div class="p-1">
      <strong>Họ tên:</strong>
      {{ employee.NV_HoTenNV }}
    </div>
    <div class="p-1">
      <strong>Chức vụ:</strong>
      {{ employee.NV_ChucVu }}
    </div>

    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ employee.NV_DiaChi }}
    </div>
    <div class="p-1">
      <strong>Số điện thoại:</strong>
      {{ employee.NV_SoDienThoai }}
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user"); // Lấy user từ App.vue
    console.log("User từ App.vue:", user);
    return { user };
  },
  props: {
    employee: { type: Object, required: true },
  },
};
</script>

<style></style>
