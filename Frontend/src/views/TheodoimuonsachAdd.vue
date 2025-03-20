<template>
  <div class="page page--edit">
    <h4>Thêm sách mượn mới</h4>
    <ObjectForm :borrow="object" @submit:borrow="createObject" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ObjectForm from "@/components/TheodoimuonsachForm.vue";
import ObjectService from "@/services/theodoimuonsach.service";

export default {
  components: {
    ObjectForm,
  },
  data() {
    return {
      object: {
        NgayMuon: "",
        NgayTra: "",
        DG_MaDocGia: "",
        NV_MaNV: "",
        S_MaSach: "",
      },
      message: "",
    };
  },
  methods: {
    async createObject(data) {
      try {
        await ObjectService.create(data);
        alert("Sách mượn được tạo thành công");
        this.$router.push({ name: "theodoimuonsach" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
