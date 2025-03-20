<template>
  <div class="form--docgia">
    <h4>Tạo tài khoản độc giả</h4>
    <ObjectForm
      :reader="object"
      :is-register-mode="true"
      @submit:reader="createObject"
    />
  </div>
</template>

<script>
import ObjectForm from "@/components/DocgiaForm.vue";
import xacthucService from "@/services/xacthuc.service";

export default {
  components: {
    ObjectForm,
  },
  data() {
    return {
      object: {
        DG_UserName: "",
        DG_Password: "",
        DG_HoLot: "",
        DG_Ten: "",
        DG_NgaySinh: "",
        DG_Phai: "",
        DG_DiaChi: "",
        DG_DienThoai: "",
      },
      message: "",
    };
  },
  methods: {
    async createObject(data) {
      try {
        const dataCustom = {
          ...data,
          Role: "docgia",
        };
        console.log(dataCustom);

        await xacthucService.dangKy(dataCustom);
        alert("Độc giả được tạo thành công");
        this.$router.push({ name: "dangnhap" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.form--docgia {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 15px;
  padding: 20px;
}
</style>
