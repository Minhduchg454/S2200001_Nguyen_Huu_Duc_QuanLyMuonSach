<template>
  <div>
    <div class="p-1">
      <strong>Mã NXB:</strong>
      {{ nhaxuatban._id }}
    </div>
    <div class="p-1">
      <strong>Tên NXB:</strong>
      {{ nhaxuatban.NXB_TenNXB }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ nhaxuatban.NXB_DiaChi }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nhaxuatban: { type: Object, required: true },
  },
};
</script>
