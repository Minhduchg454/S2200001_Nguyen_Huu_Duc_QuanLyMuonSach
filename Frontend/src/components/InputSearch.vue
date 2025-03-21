<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="submit">
        <i class="fas fa-search"></i> Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  //Nhan du lieu tu component cha
  props: {
    modelValue: { type: String, default: "" },
  },

  //Su kien ma component phat ra, gui du lieu con len cha
  emits: ["submit", "update:modelValue"],

  //Xu ly su kien
  //Khi người dùng nhập chữ vào <input>,
  // hàm này sẽ phát sự kiện (emit) để gửi giá trị mới lên component cha.
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style>
.input-group {
  margin-top: 10px;
  border-radius: 8px;
  display: flex;
  background-color: white;
  transition: transform 0.2s ease;
  cursor: pointer;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.form-control {
  border: none;
}
</style>

<!-- Giao dien 
    khi nguoi dung nhap du lieu @input thi updateModelValue duoc goi
    + phat su kien update:modelvalue cap nhat du lieu modelvalue tren component cha

    •   Sự kiện @keyup.enter: Khi nhấn phím Enter, phương thức submit() được gọi.
	•	Sự kiện @click trên nút tìm kiếm: Khi nhấn vào nút, phương thức submit() cũng được gọi.
	•	Phát sự kiện "submit" để component cha biết rằng người dùng đã thực hiện tìm kiếm.
-->

<!-- Component co the tai su dung o nhieu noi, mot thanh phan cua trang weg 
    Trong Vue, component có thể chứa component khác. 
        +Component chứa được gọi là component cha (parent component), còn component được chứa bên trong gọi là component con (child component).
        ✅ Component là khối giao diện tái sử dụng trong Vue.
        ✅ Component có thể là cha hoặc con, tạo thành một cây giao diện.
        ✅ Cha truyền dữ liệu xuống con bằng props.
        ✅ Con gửi dữ liệu lên cha bằng $emit().

-->

<!-- 
props: một component có thể nhận dữ liệu từ cha
   + modelValue là một prop duy nhất của component này, giúp con nhận dữ liệu từ cha
   + kiểu dữ liệu của props là String
   + Giá trị mặc định là chuỗi rỗng, nếu kg có nào truyền từ cha

   emits: khai báo sự kiện mà component này có thể phát ra
   + submit : khi người dùng nhất nút gửi
   + update:modelValue - khi giá trị nhập thay đổi, giúp cập nhật dữ liệu con lên cha

   method: xử lý sự kiện
    + updateModelValue(e): gọi khi người dùng thay đổi nội dung, gửi từ con lên cha
        phát ra sự kiện update:modelValue về component cha
        truyền giá trị e.target.Value về cha
    + submit: gọi hàm khi phát ra sự kiện "submit" về component cha
    + Dùng để xử lý khi người dùng nhấn nút gửi dữ liệu



    Kiến thức

   1️⃣ props – Nhận dữ liệu từ component cha
	•	Component con có thể nhận giá trị từ cha thông qua props.
	•	Ở đây, modelValue giúp cha truyền dữ liệu vào ô tìm kiếm.

    2️⃣ emit – Gửi dữ liệu từ component con lên cha
	•	Khi giá trị nhập thay đổi, component con sẽ dùng this.$emit("update:modelValue", e.target.value); 
    để cập nhật giá trị vào cha.
	•	Khi nhấn Enter hoặc nút tìm kiếm, this.$emit("submit"); được kích hoạt.

    3️⃣ v-model – Cách kết nối với component cha
	•	Khi component cha sử dụng v-model, Vue tự động xử lý props và emit.

-->
