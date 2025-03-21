<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <InputSearch v-model="searchText" />
      </div>
    </div>
    <div class="row mt-3 row-cols-1 row-cols-md-2 plus">
      <!-- Hien thi danh sach -->
      <div class="box--custom">
        <h4>Danh sách nhà xuất bản</h4>

        <!-- v-model: đồng bộ cha và con  -->
        <List
          v-if="filteredObjectsCount > 0"
          :books="filteredObjects"
          v-model:activeIndex="activeIndex"
          style="padding: 0px"
        />
        <p v-else>Không có nhà xuất bản nào.</p>

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

      <!-- Card -->
      <div v-if="activeObject" class="box--custom">
        <h4>Chi tiết Nhà xuất bản</h4>
        <Card :nhaxuatban="activeObject" />

        <router-link
          :to="{
            name: 'nhaxuatban.edit',
            params: { id: activeObject._id },
          }"
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
import Card from "@/components/NhaxuatbanCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import List from "@/components/BookList.vue";
import ObjectsService from "@/services/nhaxuatban.service";

export default {
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
        const { _id, NXB_TenNXB, NXB_DiaChi } = object;
        return [_id, NXB_TenNXB, NXB_DiaChi].join("");
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
      this.$router.push({ name: "nhaxuatban.add" });
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
