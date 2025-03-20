<template>
  <div class="page page--notfound">
    <p>Opps, không thể tìm thấy trang.</p>
    <p>
      Trở về
      <router-link to="/"> trang chủ </router-link>
    </p>
  </div>
</template>

<style>
.page--notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
