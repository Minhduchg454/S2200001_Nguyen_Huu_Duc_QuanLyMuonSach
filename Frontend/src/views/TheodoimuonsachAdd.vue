<template>
  <div class="page page--edit">
    <h4>Thêm sách mượn mới</h4>
    <ObjectForm :borrow="object" @submit:borrow="createObject" />
    <p v-if="message" class="error-message">{{ message }}</p>
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
        console.log("Tới đây");
        await ObjectService.create(data);
        this.$router.push({ name: "theodoimuonsach" });
      } catch (error) {
        //Lay loi tu server
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.message = error.response.data.message;
        } else {
          this.message = "Đã xảy ra lỗi khi thêm sách mượn!";
        }
        alert(this.message);
      }
    },
  },
};
</script>

<style></style>
