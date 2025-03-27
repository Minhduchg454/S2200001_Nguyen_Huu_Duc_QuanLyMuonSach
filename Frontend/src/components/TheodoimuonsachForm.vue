<template>
  <Form
    @submit="submitBorrow"
    :validation-schema="borrowFormSchema"
    v-slot="{ meta }"
    class="form-CustomForm"
  >
    <div class="form-group">
      <label for="DG_MaDocGia">Mã Độc Giả</label>
      <Field
        id="DG_MaDocGia"
        name="DG_MaDocGia"
        type="text"
        class="form-control form-control--input"
        v-model="borrowLocal.DG_MaDocGia"
        :disabled="user.role === 'docgia'"
      />
      <ErrorMessage name="DG_MaDocGia" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="S_MaSach">Mã Sách</label>
      <Field
        id="S_MaSach"
        name="S_MaSach"
        type="text"
        class="form-control form-control--input"
        v-model="borrowLocal.S_MaSach"
        :disabled="user.role === 'docgia'"
      />
      <ErrorMessage name="S_MaSach" class="error-feedback" />
    </div>

    <div class="form-group" v-show="user.role !== 'docgia'">
      <label for="NV_MaNV">Mã nhân viên </label>
      <Field
        id="NV_MaNV"
        name="NV_MaNV"
        type="text"
        class="form-control form-control--input"
        v-model="borrowLocal.NV_MaNV"
      />
      <ErrorMessage name="NV_MaNV" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="NgayMuon">Ngày Mượn</label>
      <Field
        id="NgayMuon"
        name="NgayMuon"
        type="date"
        class="form-control form-control--input"
        v-model="borrowLocal.NgayMuon"
      />
      <ErrorMessage name="NgayMuon" class="error-feedback" />
    </div>

    <div class="form-group" v-show="user.role !== 'docgia'">
      <label for="NgayTra">Ngày Trả</label>
      <Field
        id="NgayTra"
        name="NgayTra"
        type="date"
        class="form-control form-control--input"
        v-model="borrowLocal.NgayTra"
      />
      <ErrorMessage name="NgayTra" class="error-feedback" />
    </div>

    <div
      v-if="!user.role"
      :class="borrowLocal.NgayTra ? 'text-green-600' : 'text-red-600'"
    >
      <p>{{ borrowLocal.NgayTra ? "Đã trả" : "Đang mượn" }}</p>
    </div>

    <div class="form-group">
      <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
        Lưu
      </button>
      <button
        v-if="borrowLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteBorrow"
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
import BookService from "../services/sach.service";
import ReaderService from "../services/docgia.service";
import EmployeeService from "../services/nhanvien.service";
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user"); // Lấy user từ App.vue
    console.log("User từ App.vue:", user);
    return { user };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:borrow", "delete:borrow"],
  props: {
    borrow: { type: Object, required: true },
  },
  data() {
    const borrowFormSchema = yup.object().shape({
      DG_MaDocGia: yup
        .string()
        .required("Mã độc giả không được để trống.")
        .test("is-unique", "Mã độc giả không tồn tại.", this.checkReaderExists),
      S_MaSach: yup
        .string()
        .required("Mã sách không được để trống.")
        .test("is-unique", "Mã sách không tồn tại.", this.checkBookExists),
      NV_MaNV: yup
        .string()
        .nullable()
        .test(
          "is-unique",
          "Mã nhân viên không tồn tại.",
          this.checkEmployeerExists
        ),
      NgayMuon: yup
        .date()
        .required("Ngày mượn không được để trống.")
        .test(
          "is-today-or-future",
          "Ngày mượn phải lớn hơn hoặc bằng ngày hôm nay.",
          (value) => {
            const today = new Date().setHours(0, 0, 0, 0);
            return new Date(value).setHours(0, 0, 0, 0) >= today;
          }
        ),
      NgayTra: yup
        .mixed()
        .nullable()
        .notRequired()
        .test(
          "valid-return-date",
          "Ngày trả phải lớn hơn hoặc bằng ngày mượn.",
          (value, { parent }) => this.afterBorrow(value, parent.NgayMuon)
        ),
    });

    return {
      borrowLocal: { ...this.borrow },
      borrowFormSchema,
    };
  },
  watch: {},
  methods: {
    //De lay du lieu tu form trong yup bat buoc dung parent
    afterBorrow(ngayTra, ngayMuon) {
      if (!ngayTra || !ngayMuon) return true;
      return new Date(ngayTra) >= new Date(ngayMuon);
    },

    async checkBookExists(bookID) {
      try {
        const response = await BookService.get(bookID);
        return response;
      } catch (error) {
        console.error("Error checking book ID:", error);
        return false;
      }
    },

    async checkReaderExists(readerID) {
      try {
        const response = await ReaderService.get(readerID);
        return response;
      } catch (error) {
        console.error("Error checking reader ID:", error);
        return false;
      }
    },

    async checkEmployeerExists(employeeID) {
      try {
        const response = await EmployeeService.get(employeeID);
        return response;
      } catch (error) {
        console.error("Error checking employee ID:", error);
        return false;
      }
    },

    submitBorrow() {
      this.$emit("submit:borrow", this.borrowLocal);
    },
    deleteBorrow() {
      this.$emit("delete:borrow", this.borrowLocal.id);
    },
    Cancel() {
      const reply = window.confirm(
        "Bạn chưa lưu thay đổi! Bạn có muốn rời đi?"
      );
      if (reply) {
        this.$router.push({ name: "theodoimuonsach" });
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/main.css";

.text-red-600 {
  margin-top: 20px;
  color: red;
}
.text-green-600 {
  margin-top: 20px;
  color: green;
}
</style>
