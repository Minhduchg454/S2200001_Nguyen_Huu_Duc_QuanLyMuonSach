<script>
export default {
  props: {
    reader: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Mã độc giả:</strong>
      {{ reader._id }}
    </div>
    <div class="p-1">
      <strong>Mật khẩu:</strong>
      {{ reader.DG_Password }}
    </div>
    <div class="p-1">
      <strong>Họ lót:</strong>
      {{ reader.DG_HoLot }}
    </div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ reader.DG_Ten }}
    </div>
    <div class="p-1">
      <strong>Ngày sinh:</strong>
      {{ reader.DG_NgaySinh }}
    </div>
    <div class="p-1">
      <strong>Phái:</strong>
      {{ reader.DG_Phai }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ reader.DG_DiaChi }}
    </div>
    <div class="p-1">
      <strong>Số điện thoại:</strong>
      {{ reader.DG_DienThoai }}
    </div>
  </div>
</template>
