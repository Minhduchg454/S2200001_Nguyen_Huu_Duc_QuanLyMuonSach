<template>
  <div class="box--custom" v-if="!isEdit">
    <h4>Chi tiết độc giả</h4>
    <Card :reader="object" />
    <button class="btn btn-primary" @click="isEdit = true">Hiệu chỉnh</button>
  </div>
  <div class="box--custom" v-if="isEdit">
    <EditReader
      :reader="object"
      :isManageReader="true"
      :isEditMode="true"
      @cancel:isEdit="isEdit = false"
      @submit:reader="updateObject"
    />
  </div>
</template>

<script>
import Card from "@/components/DocgiaCard.vue";
import EditReader from "@/components/DocgiaForm.vue";
import ObjectsService from "@/services/docgia.service";
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user"); // Lấy user từ App.vue
    console.log("User từ App.vue:", user);
    return { user };
  },
  data() {
    return {
      object: null,
      isEdit: false,
    };
  },
  components: {
    Card,
    EditReader,
  },
  methods: {
    async getObject(id) {
      try {
        this.object = await ObjectsService.get(id);
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
        await ObjectsService.update(this.object._id, data);

        //Load lại dữ liệu sao khi cập nhật, để card nhận mới
        await this.getObject(this.object._id);

        alert("Độc giả được cập nhật thành công");
        this.isEdit = false;
      } catch (error) {
        console.log(error);
      }
    },
    isCheck(check) {
      return !check;
    },
  },
  created() {
    this.getObject(this.user.id);
  },
};
</script>
<style scoped>
.box--custom button {
  margin-left: 21vh;
  transition: transform 0.2s ease;
  padding: 5px;
}
.box--custom button:hover {
  transform: scale(1.1);
}
</style>
