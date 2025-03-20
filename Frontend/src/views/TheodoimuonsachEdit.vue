<template>
  <div v-if="object" class="page page--edit">
    <h4>Hiệu chỉnh sách mượn</h4>
    <!-- Doi ten thuoc tinh cua form -->
    <ObjectForm
      :borrow="object"
      @submit:borrow="updateObject"
      @delete:borrow="deleteObject"
    />
    <p>{{ message }}</p>
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
        alert("Sách mượn được cập nhật thành công");
        this.$router.push({ name: "theodoimuonsach" });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteObject() {
      if (confirm("Bạn muốn sách mượn này?")) {
        try {
          await ObjectService.delete(this.object._id);
          this.$router.push({ name: "theodoimuonsach" });
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
