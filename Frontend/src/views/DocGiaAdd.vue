<template>
  <div class="page page--edit">
    <h4>Thêm độc giả mới</h4>
    <ObjectForm :reader="object" @submit:reader="createObject" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ObjectForm from "@/components/DocgiaForm.vue";
import ObjectService from "@/services/docgia.service";

export default {
  components: {
    ObjectForm,
  },
  data() {
    return {
      object: {
        DG_UserName: "",
        DG_Password: "",
        DG_HoLot: "",
        DG_Ten: "",
        DG_NgaySinh: "",
        DG_Phai: "",
        DG_DiaChi: "",
        DG_DienThoai: "",
      },
      message: "",
    };
  },
  methods: {
    async createObject(data) {
      try {
        await ObjectService.create(data);
        alert("Độc giả được tạo thành công");
        this.$router.push({ name: "docgia" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
