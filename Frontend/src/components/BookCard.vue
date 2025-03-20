<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Tên sách:</strong>
      {{ book.S_TenSach }}
    </div>
    <div class="p-1">
      <strong>Mã sách:</strong>
      {{ book._id }}
    </div>
    <div class="p-1">
      <strong>Đơn giá:</strong>
      {{ book.S_DonGia }}
    </div>
    <div class="p-1">
      <strong>Số quyển:</strong>
      {{ book.S_SoQuyen }}
    </div>
    <div class="p-1">
      <strong>Năm xuất bản:</strong>
      {{ book.S_NamXuatBan }}
    </div>
    <div class="p-1">
      <strong>Tác giả - Nguồn gốc:</strong>
      {{ book.S_TacGiaNguonGoc }}
    </div>
    <div class="p-1">
      <strong>Mã nhà xuất bản:</strong>
      {{ book.S_MaNXB }}
    </div>
  </div>
</template>
