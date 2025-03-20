<script>
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user"); // Lấy user từ App.vue
    console.log("User từ App.vue:", user);
    return { user };
  },
  props: {
    borrow: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div
      class="p-1"
      :class="borrow.NgayTra ? 'text-green-600' : 'text-red-600'"
    >
      <strong>{{ borrow.NgayTra ? "Đã trả" : "Đang mượn" }}</strong>
    </div>

    <div class="p-1">
      <strong>Ngày mượn:</strong>
      {{ borrow.NgayMuon }}
    </div>
    <div class="p-1" v-if="borrow.NgayTra">
      <strong>Ngày trả:</strong>
      {{ borrow.NgayTra }}
    </div>
    <div class="p-1">
      <strong>Mã độc giả:</strong>
      {{ borrow.DG_MaDocGia }}
    </div>
    <div class="p-1">
      <strong>Mã sách:</strong>
      {{ borrow.S_MaSach }}
    </div>
    <div class="p-1">
      <strong>Mã nhân viên:</strong>
      {{ borrow.NV_MaNV }}
    </div>
  </div>
</template>

<style scoped>
.text-red-600 {
  color: red;
}
.text-green-600 {
  color: green;
}
</style>
