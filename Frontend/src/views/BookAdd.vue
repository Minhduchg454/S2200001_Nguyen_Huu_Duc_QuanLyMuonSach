<template>
  <div class="page page--edit">
    <h4>Thêm sách mới</h4>
    <BookForm :book="book" @submit:book="createBook" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/sach.service";

export default {
  components: {
    BookForm,
  },
  data() {
    return {
      book: {
        S_MaSach: "",
        S_TenSach: "",
        S_DonGia: "",
        S_SoQuyen: "",
        S_NamXuatBan: "",
        S_TacGiaNguonGoc: "",
      },
      message: "",
    };
  },
  methods: {
    async createBook(data) {
      try {
        await BookService.create(data);
        alert("Sách được tạo thành công");
        this.$router.push({ name: "trangchu" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
