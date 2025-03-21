<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- Search -->
        <InputSearch v-model="searchText" />
      </div>
    </div>
    <div class="row mt-3 row-cols-1 row-cols-md-2 plus">
      <!-- Danh sach  - trai -->
      <div class="box--custom">
        <h4>Nhân viên</h4>

        <!-- v-model: đồng bộ cha và con  -->
        <List
          v-if="filteredObjectsCount > 0"
          :books="filteredObjects"
          v-model:activeIndex="activeIndex"
          style="padding: 0px"
        />
        <p v-else>Không có nhân viên nào.</p>

        <div class="mt-3 d-flex justify-content-center gap-2">
          <button class="btn btn-sm btn-primary" @click="refreshList">
            <i class="fas fa-redo"></i> Làm mới
          </button>

          <button class="btn btn-sm btn-success" @click="goToAddObject">
            <i class="fas fa-plus"></i>Thêm mới
          </button>

          <button class="btn btn-sm btn-danger" @click="removeAllObjects">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
      <!-- Chi tiet - phai -->
      <div v-if="activeObject" class="box--custom">
        <h4>Chi tiết nhân viên</h4>
        <Card :employee="activeObject" />
        <router-link
          :to="{
            name: 'nhanvien.edit',
            params: { id: activeObject._id },
          }"
          v-show="user.id === activeObject._id"
        >
          <span class="btn btn-sm btn--edit">
            <i class="fas fa-edit"></i> Hiệu chỉnh
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/NhanvienCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import List from "@/components/BookList.vue";
import ObjectsService from "@/services/nhanvien.service";
import { inject } from "vue";

export default {
  setup() {
    const user = inject("user"); // Lấy user từ App.vue
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
        const { _id, NV_HoTenNV, NV_DiaChi, NV_SoDienThoai } = object;
        return [_id, NV_HoTenNV, NV_DiaChi, NV_SoDienThoai].join("");
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
      try {
        this.objects = await ObjectsService.getAll();
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

    goToAddObject() {
      this.$router.push({ name: "nhanvien.add" });
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
