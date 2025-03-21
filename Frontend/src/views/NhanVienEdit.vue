<template>
  <div v-if="object" class="page page--edit">
    <h4>Hiệu chỉnh nhân viên</h4>
    <!-- Doi ten thuoc tinh cua form -->
    <ObjectForm
      :employee="object"
      :isEditMode="true"
      @submit:employee="updateObject"
      @delete:employee="deleteObject"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
// Doi duong dan
import ObjectForm from "@/components/NhanvienForm.vue";
import ObjectService from "@/services/nhanvien.service";

export default {
  components: {
    ObjectForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      object: null,
      message: "",
    };
  },
  methods: {
    async getObject(id) {
      try {
        this.object = await ObjectService.get(id);
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

    async updateObject(data) {
      try {
        console.log(data);
        await ObjectService.update(this.object._id, data);
        alert("Nhân viên được cập nhật thành công");
        this.$router.push({ name: "nhanvien" });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteObject() {
      if (confirm("Bạn muốn xóa tài khoản và đăng xuất?")) {
        try {
          await ObjectService.delete(this.object._id);
          this.$router.push({ name: "dangnhap" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getObject(this.id);
    this.message = "";
  },
};
</script>

<style>
@import "@/assets//main.css";
</style>
