<template>
  <!-- Goi phuong thuc submitBook khi xay ra su kien submit -->
  <Form
    @submit="submitBook"
    :validation-schema="bookFormSchema"
    v-slot="{ meta }"
    class="form-CustomForm"
  >
    <div class="form-group">
      <!-- 
        for: giúp di chuyen con tro den o nhạp lieu cung id 
        name trong field và ErrorMessage giup lien ket va thong bao loi dung vi tri
      -->
      <label for="bookID">Mã Sách</label>
      <Field
        id="bookID"
        name="bookID"
        type="text"
        class="form-control form-control--input"
        v-model="bookLocal.S_MaSach"
        :disabled="isEditMode"
      />
      <ErrorMessage name="bookID" class="error-feedback" />
    </div>

    <!-- Trường S_TenSach -->
    <div class="form-group">
      <label for="S_TenSach">Tên Sách</label>
      <Field
        id="S_TenSach"
        name="S_TenSach"
        type="text"
        class="form-control form-control--input"
        v-model="bookLocal.S_TenSach"
      />
      <ErrorMessage name="S_TenSach" class="error-feedback" />
    </div>

    <!-- Trường S_DonGia -->
    <div>
      <label for="S_DonGia">Đơn Giá</label>
      <Field
        id="S_DonGia"
        name="S_DonGia"
        type="number"
        class="form-control form-control--input"
        v-model="bookLocal.S_DonGia"
      />
      <ErrorMessage name="S_DonGia" class="error-feedback" />
    </div>

    <!-- Trường S_SoQuyen -->
    <div>
      <label for="S_SoQuyen">Số Quyển</label>
      <Field
        id="S_SoQuyen"
        name="S_SoQuyen"
        type="number"
        class="form-control form-control--input"
        v-model="bookLocal.S_SoQuyen"
      />
      <ErrorMessage name="S_SoQuyen" class="error-feedback" />
    </div>

    <!-- Trường S_NamXuatBan -->
    <div>
      <label for="S_NamXuatBan">Năm Xuất Bản</label>
      <Field
        id="S_NamXuatBan"
        name="S_NamXuatBan"
        type="number"
        class="form-control form-control--input"
        v-model="bookLocal.S_NamXuatBan"
      />
      <ErrorMessage name="S_NamXuatBan" class="error-feedback" />
    </div>

    <!-- Trường S_TacGiaNguonGoc -->
    <div>
      <label for="S_TacGiaNguoGoc">Tác Giả - Nguồn Gốc</label>
      <Field
        id="S_TacGiaNguoGoc"
        name="S_TacGiaNguoGoc"
        type="text"
        class="form-control form-control--input"
        v-model="bookLocal.S_TacGiaNguonGoc"
      />
      <ErrorMessage name="S_TacGiaNguoGoc" class="error-feedback" />
    </div>

    <!-- Trường S_MaNXB -->
    <div>
      <label for="S_MaNXB">Mã Nhà Xuất Bản</label>
      <Field
        id="S_MaNXB"
        name="S_MaNXB"
        type="text"
        class="form-control form-control--input"
        v-model="bookLocal.S_MaNXB"
      />
      <ErrorMessage name="S_MaNXB" class="error-feedback" />
    </div>

    <!-- <p>{{ this.bookLocal.S_MaSach }} và {{ this.initialBookID }}</p> -->

    <div class="form-group">
      <button class="btn btn-primary" type="submit" :disabled="!meta.valid">
        Lưu
      </button>

      <!-- Chi hien nut khi bookLocal._id co ton tai -->
      <button
        v-if="bookLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteBook"
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
import Bookservice from "../services/sach.service";
import Publisherservice from "@/services/nhaxuatban.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  //Tao su kien
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true },
    isEditMode: { type: Boolean, default: false },
  },
  data() {
    const bookFormSchema = yup.object().shape({
      bookID: yup
        .string()
        .required("Mã sách không được để trống.")
        .min(1, "Mã sách ít nhất phải có 1 ký tự.")
        .test("is-unique", "Mã sách đã tồn tại.", this.checkBookIDExists),
      S_TenSach: yup
        .string()
        .required("Tên sách không được để trống.")
        .min(2, "Tên sách phải có ít nhất 2 ký tự.")
        .max(100, "Tên sách không được dài quá 100 ký tự."),
      S_DonGia: yup
        .number()
        .typeError("Kiểu dữ liệu phải là một số.")
        .required("Đơn giá không được để trống.")
        .positive("Đơn giá phải là một số dương.")
        .min(1000, "Đơn giá ít nhất phải là 1000."),
      S_SoQuyen: yup
        .number()
        .typeError("Kiểu dữ liệu phải là một số.")
        .required("Số quyển không được để trống.")
        .positive("Số quyển phải là một số dương.")
        .min(0, "Số quyển phải lớn hơn hoặc bằng 1."),
      S_NamXuatBan: yup
        .number()
        .typeError("Kiểu dữ liệu phải là một số.")
        .required("Năm xuất bản không được để trống.")
        .min(1900, "Năm xuất bản không thể nhỏ hơn 1900.")
        .max(
          new Date().getFullYear(),
          "Năm xuất bản không thể lớn hơn năm hiện tại."
        ),
      S_TacGiaNguoGoc: yup
        .string()
        .required("Tác giả không được để trống.")
        .min(2, "Tên tác giả phải có ít nhất 2 ký tự.")
        .max(100, "Tên tác giả không được dài quá 100 ký tự."),
      S_MaNXB: yup
        .string()
        .required("Mã nhà xuất bản không được để trống.")
        .min(1, "Mã nhà xuất bản ít nhất phải có 1 ký tự.")
        .test(
          "is-unique",
          "Mã nhà xuất bản không tồn tại.",
          this.checkPublisherExits
        ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // bookLocal để liên kết với các input trên form
      initialBookID: this.book._id,
      bookLocal: {
        ...this.book,
        S_MaSach: this.book._id, // Gán _id vào S_MaSach
      },
      bookFormSchema,
    };
  },

  methods: {
    // submit:book la ten su kien tu dat no cung tuong tu nhu ten mot bien. Nhung de phan biet thi dat theo cau truc tren
    //Thi co su kien sumit:book thi gui di this.bookLocal
    async checkBookIDExists(bookID) {
      try {
        if (bookID === this.initialBookID) {
          return true;
        }
        const response = await Bookservice.get(bookID);
        return !response; // True nếu không tồn tại, false nếu tồn tại
      } catch (error) {
        return true; // Nếu không tìm thấy hoặc có lỗi, coi như bookID không tồn tại
      }
    },

    async checkPublisherExits(publisherID) {
      try {
        const response = await Publisherservice.get(publisherID);
        return response;
      } catch (error) {
        console.log(error);
        return false; //Neu khong tim thay
      }
    },

    submitBook() {
      this.$emit("submit:book", this.bookLocal);
    },
    deleteBook() {
      this.$emit("delete:book", this.bookLocal.id);
    },
    Cancel() {
      const reply = window.confirm(
        "Bạn không lưu lại thay đổi! Bạn có muốn rời đi?"
      );
      if (!reply) {
        // stay on the page if
        // user clicks 'Cancel'
        return false;
      } else this.$router.push({ name: "trangchu" });
    },
  },
};
</script>

<style scoped>
@import "@/assets//main.css";
</style>
