<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <InputSearch v-model="searchText" />
      </div>

      <div class="row mt-3 row-cols-1 row-cols-md-2 plus">
        <div class="box--custom">
          <h4>Theo dõi mượn sách</h4>
          <List
            v-if="filteredObjects.length"
            :books="filteredObjects"
            :listBook="listBook"
            v-model:activeIndex="activeIndex"
            style="padding: 0px"
          />
          <p v-else>Không có mã sách hoặc mã độc giả nào.</p>

          <div
            v-if="user.role === 'nhanvien'"
            class="mt-3 d-flex justify-content-center gap-2"
          >
            <button class="btn btn-sm btn-primary" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddObject">
              <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button class="btn btn-sm btn-danger" @click="removeAllObjects">
              <i class="fas fa-trash"></i> Xóa tất cả
            </button>
          </div>
        </div>

        <div v-if="activeObject" class="box--custom">
          <h4>Chi tiết sách mượn</h4>
          <Card :borrow="activeObject" />
          <router-link
            v-if="user.role === 'nhanvien'"
            :to="{
              name: 'theodoimuonsach.edit',
              params: { id: activeObject._id },
            }"
          >
            <span class="btn btn-sm btn--edit">
              <i class="fas fa-edit"></i> Hiệu chỉnh
            </span>
          </router-link>
          <button
            v-if="user.role === 'docgia' && !activeObject.NV_MaNV"
            class="btn btn-sm btn-danger"
            @click="removeObjects"
          >
            <i class="fas fa-trash"></i> Huỷ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/TheodoimuonsachCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import List from "@/components/BookList.vue";
import ObjectsService from "@/services/theodoimuonsach.service";
import BookService from "@/services/sach.service";
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user");
    console.log("User từ App.vue:", user);
    return { user };
  },
  components: {
    Card,
    InputSearch,
    List,
  },

  //Trang thai component
  //Danh sach sach
  //Vi tri sach duoc chon
  //Luu tu khoa tim kiem
  data() {
    return {
      listBook: [],
      objects: [],
      activeIndex: -1,
      searchText: "",
    };
  },

  watch: {
    //Giám sát các thay đổi của biến searchText.
    //Moi khi searchtext thay doi, dat activeIndex = -1 de bo chon
    searchText() {
      this.activeIndex = -1;
    },
  },

  //Xu ly du lieu dong
  computed: {
    //Chuyển đổi các đối tượng thành chuỗi để tiện tìm kiếm
    //Lay tung gia tri cua moi sach trong danh sach sach va ghep no lai thanh 1 chuoi de tim kiem, cah nhau boi khoang trang
    //Tra ve mot mang cac chuoi
    objectsStrings() {
      return this.objects.map((object) => {
        const { _id, NgayMuon, NgayTra, DG_MaDocGia, S_MaSach } = object;
        return [_id, NgayMuon, NgayTra, DG_MaDocGia, S_MaSach].join("");
      });
    },

    //Trả về danh sách các sách đã lọc
    //Nếu searchText rỗng thì trả toàn bộ dannh sách
    //Ngược lại: lọc danh sách có từ khoá tìm kiếm
    filteredObjects() {
      if (!this.searchText) return this.objects;
      //neu co duyet tung sach
      return this.objects.filter((_object, index) =>
        this.objectsStrings[index].includes(this.searchText)
      );
    },

    activeObject() {
      if (this.activeIndex < 0) return null;
      return this.filteredObjects[this.activeIndex];
    },

    filteredObjectsCount() {
      return this.filteredObjects.length;
    },
  },

  methods: {
    async retrieveObjects() {
      console.log("User ID:", this.user.id);
      try {
        if (this.user.role == "docgia") {
          this.objects = await ObjectsService.getAll({
            DG_MaDocGia: this.user.id,
          });
          this.listBook = await BookService.getAll();
        } else {
          this.objects = await ObjectsService.getAll();
          this.listBook = await BookService.getAll();
        }
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveObjects();
      this.activeIndex = -1;
    },

    async removeAllObjects() {
      if (confirm("Bạn muốn xoá tất cả ?")) {
        try {
          await ObjectsService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async removeObjects() {
      if (confirm("Bạn muốn huỷ mượn?")) {
        try {
          await ObjectsService.delete(this.activeObject._id);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddObject() {
      this.$router.push({ name: "theodoimuonsach.add" });
    },
  },

  mounted() {
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
</style>
