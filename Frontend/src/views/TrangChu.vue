<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <InputSearch v-model="searchText" />
      </div>
    </div>

    <div class="row mt-3 row-cols-1 row-cols-md-2">
      <!-- Cột danh sách sách -->
      <div>
        <h4>Danh sách sách</h4>
        <BookList
          v-if="filteredBooksCount > 0"
          :books="filteredBooks"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sách nào.</p>

        <div
          class="mt-3 d-flex justify-content-center gap-2"
          v-if="user.role == 'nhanvien'"
        >
          <button class="btn btn-sm btn-primary" @click="refreshList">
            <i class="fas fa-redo"></i> Làm mới
          </button>

          <button class="btn btn-sm btn-success" @click="goToAddBook">
            <i class="fas fa-plus"></i> Thêm mới
          </button>

          <button class="btn btn-sm btn-danger" @click="removeAllBooks">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>

      <!-- Cột chi tiết sách -->
      <div v-if="activeBook">
        <h4>Chi tiết Sách</h4>
        <BookCard :book="activeBook" />

        <router-link
          :to="{
            name: 'trangchu.edit',
            params: { id: activeBook._id },
          }"
          v-if="user.role == 'nhanvien'"
        >
          <span class="btn btn-sm btn--edit">
            <i class="fas fa-edit"></i> Hiệu chỉnh
          </span>
        </router-link>

        <router-link
          :to="{
            name: 'themsachmuonDocgia.add',
            params: { bookId: activeBook._id, userId: user.id },
          }"
          v-if="user.role == 'docgia' && activeBook && user.id && bookCount > 0"
        >
          <span class="btn btn-sm btn--edit">
            <i class="fas fa-edit"></i> Mượn sách
          </span>
        </router-link>

        <div v-if="bookCount == 0 && user.role == 'docgia'" class="stock">
          <p>Sách đã hết trong kho</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/sach.service";
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user");
    console.log("User từ App.vue:", user);
    return { user };
  },
  components: {
    BookCard,
    InputSearch,
    BookList,
  },

  //Trang thai component
  //Danh sach sach
  //Vi tri sach duoc chon
  //Luu tu khoa tim kiem
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
      bookCount: 0,
    };
  },

  watch: {
    //Giám sát các thay đổi của biến searchText.
    //Moi khi searchtext thay doi, dat activeIndex = -1 de bo chon
    searchText() {
      this.activeIndex = -1;
    },
    activeIndex(newVal) {
      console.log("activeIndex changed:", newVal);
    },
    activeBook(newBook) {
      if (newBook) {
        this.countBook();
      } else {
        this.bookCount = 0;
      }
    },
  },

  //Xu ly du lieu dong
  computed: {
    //Chuyển đổi các đối tượng thành chuỗi để tiện tìm kiếm
    //Lay tung gia tri cua moi sach trong danh sach sach va ghep no lai thanh 1 chuoi de tim kiem, cah nhau boi khoang trang
    //Tra ve mot mang cac chuoi
    bookStrings() {
      return this.books.map((book) => {
        const {
          _id,
          S_TenSach,
          S_DonGia,
          S_SoQuyen,
          S_NamXuatBan,
          S_TacGiaNguoGoc,
          S_MaNXB,
        } = book;
        return [
          _id,
          S_TenSach,
          S_DonGia,
          S_SoQuyen,
          S_NamXuatBan,
          S_TacGiaNguoGoc,
          S_MaNXB,
        ].join("");
      });
    },

    //Trả về danh sách các sách đã lọc
    //Nếu searchText rỗng thì trả toàn bộ dannh sách
    //Ngược lại: lọc danh sách có từ khoá tìm kiếm
    filteredBooks() {
      if (!this.searchText) return this.books;
      //neu co duyet tung sach
      return this.books.filter((_book, index) =>
        this.bookStrings[index].includes(this.searchText)
      );
    },

    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },

    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },

  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },

    async removeAllBooks() {
      if (confirm("Bạn muốn xoá tất cả ?")) {
        try {
          await BookService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddBook() {
      this.$router.push({ name: "trangchu.add" });
    },
    async getUserInfo() {
      this.user = await JSON.parse(localStorage.getItem("user"));
      console.log("User info:", this.user);
    },

    async countBook() {
      if (!this.activeBook) {
        this.bookCount = 0;
        return;
      }
      try {
        const book = await BookService.get(this.activeBook._id);
        this.bookCount = book.S_SoQuyen; // Gán giá trị vào biến bookCount
      } catch (error) {
        console.log("Lỗi khi lấy số lượng sách:", error);
        this.bookCount = 0;
      }
    },
  },

  mounted() {
    this.getUserInfo();
    this.countBook();
    this.refreshList();
  },
};
</script>

<style>
.btn--edit {
  border-radius: 5px;
  background-color: yellow;
}
.btn {
  margin: 5px;
  max-width: 150px;
}

.stock {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 180px;
  border-radius: 10px;
  color: white;
  background-color: red;
  padding: 5px;
  margin: 0px;
}

.stock p {
  margin: 0px;
  font-size: 0.8rem;
}
</style>

<!-- 

    Chức năng: 
    🔹 Hiển thị danh sách danh bạ và cho phép người dùng:
	•	Tìm kiếm danh bạ (🔍 InputSearch)
	•	Xem danh sách danh bạ (📋 ContactList)
	•	Xem chi tiết liên hệ (🆔 ContactCard)
	•	Thực hiện các thao tác:
	        Làm mới danh sách
		    Thêm liên hệ mới
		    Xóa tất cả danh bạ


    v-model để đồng bộ dữ liệu cha và con
    v-if="activeContact": Chỉ hiển thị khi có liên hệ được chọn.

-->
