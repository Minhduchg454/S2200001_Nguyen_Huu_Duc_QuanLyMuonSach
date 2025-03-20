<template>
  <div class="page page--edit">
    <h4>Thêm nhân viên mới</h4>
    <ObjectForm :employee="object" @submit:employee="createObject" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ObjectForm from "@/components/NhanvienForm.vue";
import ObjectService from "@/services/nhanvien.service";

export default {
  components: {
    ObjectForm,
  },
  data() {
    return {
      object: {
        NV_MaNV: "",
        NV_Password: "",
        NV_HoTenNV: "",
        NV_ChucVu: "",
        NV_DiaChi: "",
        NV_SoDienThoai: "",
      },
      message: "",
    };
  },
  methods: {
    async createObject(data) {
      try {
        await ObjectService.create(data);
        alert("Nhan vien được tạo thành công");
        this.$router.push({ name: "nhanvien" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
