<template>
  <div class="page page--edit">
    <h4>Thêm Nhà Xuất Bản mới</h4>
    <PublisherForm :publisher="publisher" @submit:publisher="createPublisher" />
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
  data() {
    return {
      publisher: {
        NXB_Ma: "",
        NXB_TenNXB: "",
        NXB_DiaChi: "",
      },
      message: "",
    };
  },
  methods: {
    async createPublisher(data) {
      try {
        await PublisherService.create(data);
        alert("Nhà xuất bản được tạo thành công");
        this.$router.push({ name: "nhaxuatban" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
