<template>
  <ul>
    <li
      class="list--custom"
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <p>{{ getObjectTitle(book) }}</p>
      <p :class="getStatusClass(book)">{{ getStatus(book) }}</p>
      <p v-if="book.S_SoQuyen">{{ getQuantity(book) }}</p>
    </li>
  </ul>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user");
    console.log("User từ App.vue:", user);
    return { user };
  },
  props: {
    listBook: { type: Array, default: [] },
    books: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    getObjectTitle(book) {
      const nameKeys = [
        "S_TenSach",
        "NXB_TenNXB",
        "NV_HoTenNV",
        "DG_Ten",
        "NgayMuon",
      ];
      const keyFound = nameKeys.find((key) => book[key]);

      if (keyFound === "S_TenSach") {
        return book[keyFound];
      }

      if (keyFound === "DG_Ten") {
        return `${book.DG_HoLot} ${book.DG_Ten}`.trim();
      }

      if (keyFound === "NgayMuon") {
        // Tìm sách trong listBook dựa vào S_MaSach
        const bookFromList = this.listBook.find(
          (item) => item._id === book.S_MaSach
        );

        if (bookFromList) {
          return `${book.DG_MaDocGia} | ${bookFromList.S_TenSach}`;
        }

        return `${book.DG_MaDocGia} | Không tìm thấy sách`;
      }

      return keyFound ? book[keyFound] : "Không có dữ liệu";
    },
    getStatus(book) {
      let status;
      if (book.NgayMuon) {
        if (book.NV_MaNV && book.NgayTra) {
          status = "Đã trả";
        } else if (book.NV_MaNV) {
          status = "Đang mượn";
        } else {
          status = "Chưa duyệt";
        }
      } else {
        status = " ";
      }
      return status;
    },
    getStatusClass(book) {
      const status = this.getStatus(book);
      return {
        "status-returned": status === "Đã trả",
        "status-borrowed": status === "Đang mượn",
        "status-pending": status === "Chưa duyệt",
      };
    },
    getQuantity(book) {
      if (book.S_SoQuyen) {
        return `SL: ${book.S_SoQuyen}`;
      }
      return "";
    },
  },
};
</script>

<style>
.list--custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0px;
  border-radius: 5px;
  border: solid black 0.8px;
  width: 100%;
}

.active {
  border: solid rgb(27, 42, 248) 2px;
  font-weight: bold;
}

.list--custom p {
  margin: 0px;
}

.status-returned {
  color: green;
}

.status-borrowed {
  color: orange;
}

.status-pending {
  color: red;
}
</style>
