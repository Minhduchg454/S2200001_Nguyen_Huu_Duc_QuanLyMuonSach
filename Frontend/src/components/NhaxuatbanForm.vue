<template>
  <Form
    @submit="submitPublisher"
    :validation-schema="publisherFormSchema"
    v-slot="{ meta }"
    class="form-CustomForm"
  >
    <div class="form-group">
      <label for="NXB_Ma">Mã Nhà Xuất Bản</label>
      <Field
        id="NXB_Ma"
        name="NXB_Ma"
        type="text"
        class="form-control form-control--input"
        v-model="publisherLocal.NXB_Ma"
        :disabled="isEditMode"
      />
      <ErrorMessage name="NXB_Ma" class="error-feedback" />
    </div>

    <div>
      <label for="NXB_TenNXB">Tên Nhà Xuất Bản</label>
      <Field
        id="NXB_TenNXB"
        name="NXB_TenNXB"
        type="text"
        class="form-control form-control--input"
        v-model="publisherLocal.NXB_TenNXB"
      />
      <ErrorMessage name="NXB_TenNXB" class="error-feedback" />
    </div>

    <div>
      <label for="NXB_DiaChi">Địa Chỉ</label>
      <Field
        id="NXB_DiaChi"
        name="NXB_DiaChi"
        type="text"
        class="form-control form-control--input"
        v-model="publisherLocal.NXB_DiaChi"
      />
      <ErrorMessage name="NXB_DiaChi" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
        Lưu
      </button>

      <button
        v-if="publisherLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deletePublisher"
      >
        Xóa
      </button>

      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ObjectService from "../services/nhaxuatban.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:publisher", "delete:publisher"],
  props: {
    publisher: { type: Object, required: true },
    isEditMode: { type: Boolean, default: false },
  },
  data() {
    const publisherFormSchema = yup.object().shape({
      NXB_Ma: yup
        .string()
        .required("Mã nhà xuất bản không được để trống.")
        .min(1, "Mã nhà xuất bản ít nhất phải có 1 ký tự.")
        .test("is-unique", "Mã đã tồn tại.", this.checkObjectIDExists),
      NXB_TenNXB: yup
        .string()
        .required("Tên nhà xuất bản không được để trống.")
        .min(2, "Tên nhà xuất bản phải có ít nhất 2 ký tự.")
        .max(100, "Tên nhà xuất bản không được dài quá 100 ký tự."),
      NXB_DiaChi: yup
        .string()
        .required("Địa chỉ không được để trống.")
        .min(5, "Địa chỉ phải có ít nhất 5 ký tự.")
        .max(200, "Địa chỉ không được dài quá 200 ký tự."),
    });
    return {
      publisherLocal: { ...this.publisher, NXB_Ma: this.publisher._id },
      publisherFormSchema,
    };
  },
  methods: {
    async checkObjectIDExists(objectID) {
      try {
        if (objectID === this.publisher._id) {
          return true;
        }

        const response = await ObjectService.get(objectID);
        if (response) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return true; // Nếu không tìm thấy hoặc có lỗi, coi như bookID không tồn tại
      }
    },

    submitPublisher() {
      this.$emit("submit:publisher", this.publisherLocal);
    },
    deletePublisher() {
      this.$emit("delete:publisher", this.publisherLocal.id);
    },
    Cancel() {
      const reply = window.confirm(
        "Bạn chưa lưu thay đổi! Bạn có muốn rời đi?"
      );
      if (reply) {
        this.$router.push({ name: "nhaxuatban" });
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/main.css";
</style>
