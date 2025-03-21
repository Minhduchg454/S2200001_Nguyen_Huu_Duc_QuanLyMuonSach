<template>
  <Form
    @submit="submitReader"
    :validation-schema="readerFormSchema"
    v-slot="{ meta }"
    class="form-CustomForm"
  >
    <div class="form-group">
      <label for="DG_UserName">Mã Độc Giả</label>
      <Field
        id="DG_UserName"
        name="DG_UserName"
        type="text"
        class="form-control form-control--input"
        v-model="readerLocal.DG_UserName"
        :disabled="isEditMode"
      />
      <ErrorMessage name="DG_UserName" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="DG_Password">Mật Khẩu</label>
      <Field
        id="DG_Password"
        name="DG_Password"
        type="text"
        class="form-control form-control--input"
        v-model="readerLocal.DG_Password"
      />
      <ErrorMessage name="DG_Password" class="error-feedback" />
    </div>

    <div>
      <label for="DG_HoLot">Họ Lót</label>
      <Field
        id="DG_HoLot"
        name="DG_HoLot"
        type="text"
        class="form-control form-control--input"
        v-model="readerLocal.DG_HoLot"
      />
      <ErrorMessage name="DG_HoLot" class="error-feedback" />
    </div>

    <div>
      <label for="DG_Ten">Tên</label>
      <Field
        id="DG_Ten"
        name="DG_Ten"
        type="text"
        class="form-control form-control--input"
        v-model="readerLocal.DG_Ten"
      />
      <ErrorMessage name="DG_Ten" class="error-feedback" />
    </div>

    <div>
      <label for="DG_NgaySinh">Ngày Sinh</label>
      <Field
        id="DG_NgaySinh"
        name="DG_NgaySinh"
        type="date"
        class="form-control form-control--input"
        v-model="readerLocal.DG_NgaySinh"
      />
      <ErrorMessage name="DG_NgaySinh" class="error-feedback" />
    </div>

    <div>
      <label for="DG_Phai">Giới Tính</label>
      <Field
        id="DG_Phai"
        name="DG_Phai"
        as="select"
        class="form-control form-control--input"
        v-model="readerLocal.DG_Phai"
      >
        <option value="" disabled>Chọn giới tính</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </Field>
      <ErrorMessage name="DG_Phai" class="error-feedback" />
    </div>

    <div>
      <label for="DG_DiaChi">Địa chỉ</label>
      <Field
        id="DG_DiaChi"
        name="DG_DiaChi"
        type="text"
        class="form-control form-control--input"
        v-model="readerLocal.DG_DiaChi"
      />
      <ErrorMessage name="DG_DiaChi" class="error-feedback" />
    </div>

    <div>
      <label for="DG_DienThoai">Điện Thoại</label>
      <Field
        id="DG_DienThoa"
        name="DG_DienThoai"
        type="text"
        class="form-control form-control--input"
        v-model="readerLocal.DG_DienThoai"
      />
      <ErrorMessage name="DG_DienThoai" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
        <p class="button--text">{{ saveButtonText }}</p>
      </button>
      <button
        v-if="!isManageReader && readerLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteReader"
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
import ObjectService from "../services/docgia.service";
import { isCancel } from "axios";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:reader", "delete:reader", "cancel:isEdit"],
  props: {
    reader: { type: Object, required: true },
    isRegisterMode: { type: Boolean, default: false },
    isEditMode: { type: Boolean, default: false },
    isManageReader: { type: Boolean, default: false },
  },
  data() {
    const readerFormSchema = yup.object().shape({
      DG_UserName: yup
        .string()
        .required("Mã độc giả không được để trống.")
        .test("is-unique", "Mã độc giả đã tồn tại.", this.checkReaderIDExists),
      DG_Password: yup.string().required("Mật khẩu không được để trống."),
      DG_HoLot: yup.string().required("Họ lót không được để trống."),
      DG_Ten: yup.string().required("Tên không được để trống."),
      DG_NgaySinh: yup.date().required("Ngày sinh không được để trống."),
      DG_Phai: yup
        .string()
        .oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ.")
        .required("Giới tính không được để trống."),
      DG_DiaChi: yup.string().required("Địa chỉ không được để trống"),
      DG_DienThoai: yup.string().required("Điện thoại không được để trống"),
    });

    return {
      readerLocal: { ...this.reader, DG_UserName: this.reader._id },
      readerFormSchema,
    };
  },
  computed: {
    saveButtonText() {
      return this.isRegisterMode ? "Đăng ký" : "Lưu";
    },
  },
  methods: {
    async checkReaderIDExists(readerID) {
      try {
        if (readerID === this.reader._id) {
          return true;
        }
        const response = await ObjectService.get(readerID);
        return !response;
      } catch (error) {
        console.error("Error checking employee ID:", error);
        return true;
      }
    },
    submitReader() {
      this.$emit("submit:reader", this.readerLocal);
    },
    deleteReader() {
      this.$emit("delete:reader", this.readerLocal.id);
    },
    cancelEdit() {
      this.$emit("cancel:isEdit");
    },

    Cancel() {
      const reply = window.confirm(
        "Bạn chưa lưu thay đổi! Bạn có muốn rời đi?"
      );
      if (reply) {
        if (this.isRegisterMode) {
          this.$router.push({ name: "dangnhap" });
        } else if (this.isManageReader) {
          this.$emit("cancel:isEdit");
          this.$router.push({ name: "trangcanhan" });
        } else {
          this.$router.push({ name: "docgia" });
        }
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/main.css";

.button--text {
  margin: 0px;
}
</style>
