<template>
  <div v-if="publisher" class="page page--edit">
    <h4>Hiệu chỉnh nhà xuất bản</h4>
    <PublisherForm
      :publisher="publisher"
      @submit:publisher="updatePublisher"
      @delete:publisher="deletePublisher"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import PublisherForm from "@/components/NhaxuatbanForm.vue";
import PublisherService from "@/services/nhaxuatban.service";

export default {
  components: {
    PublisherForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      publisher: null,
      message: "",
    };
  },
  methods: {
    async getPublisher(id) {
      try {
        this.publisher = await PublisherService.get(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    async updatePublisher(data) {
      try {
        await PublisherService.update(this.publisher._id, data);
        alert("Nhà xuất bản được cập nhật thành công");
        this.$router.push({ name: "nhaxuatban" });
      } catch (error) {
        console.log(error);
      }
    },

    async deletePublisher() {
      if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          await PublisherService.delete(this.publisher._id);
          this.$router.push({ name: "nhaxuatban" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getPublisher(this.id);
    this.message = "";
  },
};
</script>

<style>
@import "@/assets//main.css";
</style>
