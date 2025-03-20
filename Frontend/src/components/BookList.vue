<script>
export default {
  props: {
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
      //Tìm key dau tien co gia tri hop le
      const keyFound = nameKeys.find((key) => book[key]);
      //Duyet tung phan tu cua name key vao do trong book
      //Neu key nao ton tai thi lay key do ra
      //Neu key hop le thì lay gia tri trong mang book co tu khoa key. vd book["S_TenSach"]==book.S_TenSach
      //                                                                book["NXB_TenNXB"]==book.NXB_TenNXB

      //Ghep ten lai
      if (keyFound === "DG_Ten") {
        //Ghep hai chuoi lai va loai bo khoang trang
        return `${book.DG_HoLot} ${book.DG_Ten}`.trim();
      }

      if (keyFound == "NgayMuon") {
        const status = book.NgayTra ? "Đã trả" : "Đang mượn";
        return `${status}: ${book.DG_MaDocGia} | ${book.S_MaSach}`;
      }

      return keyFound ? book[keyFound] : "Không có dữ liệu";
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ getObjectTitle(book) }}
    </li>
  </ul>
</template>

<!-- 
    v-for="(contact,index) in contacts"
    + contacts là mảng các phần từ
    + contact là một phần từ trong mảng và index là chỉ số phần từ đó


    props: nhận dữ liệu từ component cha
        + contacts nhận danh sách liên hệ từ cha, là một mảng
        + Chỉ số liên hệ được chọn, mặc định là -1

    emits: sự kiện, cập nhật activeIndex cho cha khi người dùng click vào một liên hệ
        +method: 
            Khi click vào một liên hệ, gọi updateActiveIndex(index).
	        Phát sự kiện "update:activeIndex" để component cha cập nhật activeIndex.

    Template: hiển thị danh sách liên hệ, chọn một liên hệ và làm nổi bật liên hệ đó
        +hiện danh sách với v-for, lập qua mảng contact với index, tạo danh sách với li
            contact: dữ liệu từng liên hệ, index là số thứ tự phần tử trong mảng
            :key="contact._id" giúp Vue nhận diện từng phần tử trong danh sách, dễ dàng cập nhật khi có thay đổi

    Nếu index === activeIndex thì thêm class"active" làm nổi bật liên hệ đó
        Bắt sự kiện Click: khi click vào liên hệ, cập nhật activeIndex lên cha

-->
