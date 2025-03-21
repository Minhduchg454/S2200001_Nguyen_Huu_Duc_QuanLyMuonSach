<template>
  <Form
    @submit="submitEmployee"
    :validation-schema="employeeFormSchema"
    v-slot="{ meta }"
  >
    <div class="form-group">
      <label for="NV_MaNV">Mã Nhân Viên</label>
      <Field
        id="NV_MaNV"
        name="NV_MaNV"
        type="text"
        class="form-control form-control--input"
        v-model="employeeLocal.NV_MaNV"
        :disabled="isAddMode"
      />
      <ErrorMessage name="NV_MaNV" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="NV_Password">Mật Khẩu</label>
      <Field
        id="NV_Password"
        name="NV_Password"
        type="text"
        class="form-control form-control--input"
        v-model="employeeLocal.NV_Password"
      />
      <ErrorMessage name="NV_Password" class="error-feedback" />
    </div>

    <label for="NV_HoTenNV">Họ và Tên</label>
    <Field
      id="NV_HoTenNV"
      name="NV_HoTenNV"
      type="text"
      class="form-control form-control--input"
      v-model="employeeLocal.NV_HoTenNV"
    />
    <ErrorMessage name="NV_HoTenNV" class="error-feedback" />

    <label for="NV_ChucVu">Chức vụ</label>
    <Field
      id="NV_ChucVu"
      name="NV_ChucVu"
      as="select"
      class="form-control form-control--input"
      v-model="employeeLocal.NV_ChucVu"
    >
      <option value="" disabled>Chọn chức vụ</option>
      <option value="Nhân Viên">Nhân Viên</option>
      <option value="Admin">Admin</option>
    </Field>
    <ErrorMessage name="NV_ChucVu" class="error-feedback" />

    <label for="NV_DiaChi">Địa Chỉ</label>
    <Field
      id="NV_DiaChi"
      name="NV_DiaChi"
      type="text"
      class="form-control form-control--input"
      v-model="employeeLocal.NV_DiaChi"
    />
    <ErrorMessage name="NV_DiaChi" class="error-feedback" />

    <label for="NV_SoDienThoai">Số Điện Thoại</label>
    <Field
      id="NV_SoDienThoai"
      name="NV_SoDienThoai"
      type="text"
      class="form-control form-control--input"
      v-model="employeeLocal.NV_SoDienThoai"
    />
    <ErrorMessage name="NV_SoDienThoai" class="error-feedback" />

    <div class="form-group">
      <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
        Lưu
      </button>

      <button
        v-if="employeeLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteEmployee"
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
import ObjectService from "../services/nhanvien.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:employee", "delete:employee"],
  props: {
    employee: { type: Object, required: true },
    isAddMode: { type: Boolean, default: false },
  },
  data() {
    const employeeFormSchema = yup.object().shape({
      NV_MaNV: yup
        .string()
        .required("Mã nhân viên không được để trống.")
        .min(1, "Mã nhân viên ít nhất phải có 1 ký tự.")
        .test(
          "is-unique",
          "Mã nhân viên đã tồn tại.",
          this.checkEmployeeIDExists
        ),
      NV_Password: yup
        .string()
        .required("Mật khẩu không được để trống.")
        .min(1, "Mật khẩu ít nhất phải có 1 ký tự."),
      NV_ChucVu: yup
        .string()
        .required("Chức vụ không được để trống.")
        .oneOf(["Nhân Viên", "Admin"], "Chức vụ không hợp lệ."),
      NV_HoTenNV: yup
        .string()
        .required("Họ tên nhân viên không được để trống.")
        .min(2, "Họ tên phải có ít nhất 2 ký tự.")
        .max(100, "Họ tên không được dài quá 100 ký tự."),
      NV_DiaChi: yup
        .string()
        .required("Địa chỉ không được để trống.")
        .min(5, "Địa chỉ phải có ít nhất 5 ký tự.")
        .max(200, "Địa chỉ không được dài quá 200 ký tự."),
      NV_SoDienThoai: yup
        .string()
        .required("Số điện thoại không được để trống.")
        .matches(/^\d+$/, "Số điện thoại chỉ được chứa số.")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số.")
        .max(15, "Số điện thoại không được dài quá 15 chữ số."),
    });

    return {
      employeeLocal: { ...this.employee, NV_MaNV: this.employee._id },
      employeeFormSchema,
    };
  },
  methods: {
    async checkEmployeeIDExists(employeeID) {
      try {
        if (employeeID === this.employee._id) {
          return true;
        }
        const response = await ObjectService.get(employeeID);
        return !response;
      } catch (error) {
        console.error("Error checking employee ID:", error);
        return true;
      }
    },

    submitEmployee() {
      this.$emit("submit:employee", this.employeeLocal);
    },
    deleteEmployee() {
      this.$emit("delete:employee", this.employeeLocal.id);
    },
    Cancel() {
      const reply = window.confirm(
        "Bạn chưa lưu thay đổi! Bạn có muốn rời đi?"
      );
      if (reply) {
        this.$router.push({ name: "nhanvien" });
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/main.css";
</style>
