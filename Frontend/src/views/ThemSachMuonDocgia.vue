<template>
  <div v-if="object" class="page page--edit">
    <h4>Thêm sách mượn độc giả</h4>
    <!-- Doi ten thuoc tinh cua form -->
    <ObjectForm :borrow="object" @submit:borrow="createObject" />
    <p v-if="message" class="error-message">{{ message }}</p>
  </div>
</template>

<script>
// Doi duong dan
import ObjectForm from "@/components/TheodoimuonsachForm.vue";
import ObjectService from "@/services/theodoimuonsach.service";

export default {
  components: {
    ObjectForm,
  },
  props: {
    bookId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  data() {
    return {
      object: {
        DG_MaDocGia: this.userId || "",
        S_MaSach: this.bookId || "",
        NgayMuon: "",
        NgayTra: "",
        NV_MaNV: "",
      },
      message: "",
    };
  },
  methods: {
    async createObject(data) {
      try {
        await ObjectService.create(data);
        this.$router.push({ name: "theodoimuonsach" });
        alert("Sách mượn thành công. Đang chờ duyệt!");
      } catch (error) {
        //Lay loi tu server
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.message = error.response.data.message;
        } else {
          this.message = "Mượn thất bại. Sách đã được mượn trước đó!";
        }
        this.message = "Mượn thất bại. Sách đã được mượn trước đó!";
        alert(this.message);
      }
    },

    /*
    async createObject(data) {
      try {
        await ObjectService.create(data);
        alert("Sách mượn được tạo thành công");
        this.$router.push({ name: "trangchu" });
      } catch (error) {
        console.log(error);
      }
    },
    */
  },
  created() {
    this.message = "";
  },
};
</script>

<style>
@import "@/assets//main.css";
</style>
