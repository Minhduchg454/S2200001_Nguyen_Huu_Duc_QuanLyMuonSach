<template>
  <div v-if="book" class="page page--edit">
    <h4>Hiệu chỉnh sách</h4>
    <BookForm
      :book="book"
      @submit:book="updateBook"
      @delete:book="deleteBook"
    />
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
  props: {
    id: { type: String, require: true },
  },
  data() {
    return {
      book: null,
      message: "",
    };
  },
  methods: {
    async getBook(id) {
      try {
        this.book = await BookService.get(id);
      } catch (error) {
        console.log(error);
        this.$route.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    async updateBook(data) {
      try {
        await BookService.update(this.book._id, data);
        alert("Sách được cập nhật thành công");
        this.$router.push({ name: "trangchu" });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBook() {
      if (confirm("Bạn muốn xóa sách này?")) {
        try {
          await BookService.delete(this.book._id);
          this.$router.push({ name: "trangchu" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getBook(this.id);
    this.message = "";
  },
};
</script>

<style>
@import "@/assets//main.css";
</style>
