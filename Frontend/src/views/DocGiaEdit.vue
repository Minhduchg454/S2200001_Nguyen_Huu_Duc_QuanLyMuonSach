<template>
  <div v-if="object" class="page page--edit">
    <h4>Hiệu chỉnh độc giả</h4>
    <!-- Doi ten thuoc tinh cua form -->
    <ObjectForm
      :reader="object"
      :isEditMode="true"
      @submit:reader="updateObject"
      @delete:reader="deleteObject"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
// Doi duong dan
import ObjectForm from "@/components/DocgiaForm.vue";
import ObjectService from "@/services/docgia.service";

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
        alert("Độc giả được cập nhật thành công");
        this.$router.push({ name: "docgia" });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteObject() {
      if (confirm("Bạn muốn xóa độc giả này?")) {
        try {
          await ObjectService.delete(this.object._id);
          this.$router.push({ name: "docgia" });
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
