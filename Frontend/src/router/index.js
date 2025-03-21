import { createWebHistory, createRouter } from "vue-router";
import TrangChu from "@/views/TrangChu.vue"
import BookEdit from "@/views/BookEdit.vue";
import BookAdd from "@/views/BookAdd.vue";
import NhaXuatBan from "@/views/NhaXuatBan.vue";
import NhaXuatBanEdit from "@/views/NhaXuatBanEdit.vue";
import NhaXuatBanAdd from "@/views/NhaXuatBanAdd.vue"
import NhanVien from "@/views/NhanVien.vue";
import NhanVienEdit from "@/views/NhanVienEdit.vue";
import NhanVienAdd from "@/views/NhanVienAdd.vue";
import DocGia from "@/views/Docgia.vue";
import DocGiaEdit from "@/views/DocGiaEdit.vue";
import DocGiaAdd from "@/views/DocGiaAdd.vue";
import TheoDoiMuonSach from "@/views/TheoDoiMuonSach.vue";
import TheoDoiMuonSachEdit from "@/views/TheodoimuonsachEdit.vue";
import TheoDoiMuonSachAdd from "@/views/TheodoimuonsachAdd.vue";
import DangNhap from "@/views/DangNhap.vue";
import ThemSachMuonDocgia from "@/views/ThemSachMuonDocgia.vue";
import DangKyDocGia from "@/views/DangKyDocGia.vue";



//Danh sach cac tuyen duong
const routes = [
    {
        path: "/",
        name: "trangchu",
        component: TrangChu,
        meta: {requiresAuth: true}
    },

    {
        path: "/book/:id",
        name: "trangchu.edit",
        component: BookEdit,
        props: true, // Truyền các biến trong $route.params vào làm props - Nhan gia tri id nhu mot prop cha xuong con
        meta: {requiresAuth: true}
    },
    {
        path: "/bookadd",
        name: "trangchu.add",
        component: BookAdd,
        meta: {requiresAuth: true}
    },

    //Nha xuat ban
    {
        path: "/nhaxuatban",
        name: "nhaxuatban",
        component: NhaXuatBan,
        meta: {requiresAuth: true}
    },
    
    {
        path: "/nhaxuatban/:id",
        name: "nhaxuatban.edit",
        component: NhaXuatBanEdit,
        props: true,
        meta: {requiresAuth: true}
    },
    
    {
        path: "/nhaxuatbanadd",
        name: "nhaxuatban.add",
        component: NhaXuatBanAdd,
        meta: {requiresAuth: true}
    },

    //Nhan vien
    {
        path: "/nhanvien",
        name: "nhanvien",
        component: NhanVien,
        meta: {requiresAuth: true}
    },

    {
        path: "/nhanvien/:id",
        name: "nhanvien.edit",
        component: NhanVienEdit,
        props: true,
        meta: {requiresAuth: true}
    },

    {
        path: "/nhanvienadd",
        name: "nhanvien.add",
        component: NhanVienAdd,
        meta: {requiresAuth: true}
    },
    //docgia
    {
        path: "/docgia",
        name: "docgia",
        component: DocGia,
        meta: {requiresAuth: true}
    },

    {
        path: "/docgia/:id",
        name: "docgia.edit",
        component: DocGiaEdit,
        props: true,
        meta: {requiresAuth: true}
    },
    {
        path: "/docgiaadd",
        name: "docgia.add",
        component: DocGiaAdd,
        meta: {requiresAuth: true}
    },

    //Dang nhap
    {
        path: "/dangnhap",
        name: "dangnhap",
        component: DangNhap,
        meta: { noHeader: true , layout: "auth"},
    },

    //Dang ky doc gia
    {
        path: "/dangkydocgia",
        name: "dangkydocgia",
        component: DangKyDocGia,
        meta: { noHeader: true , layout: "auth"},
    },



    //theo doi muon sach
    {
        path: "/theodoimuonsach",
        name: "theodoimuonsach",
        component: TheoDoiMuonSach,
        meta: {requiresAuth: true}
    },

    {
        path: "/theodoimuonsach/:id",
        name: "theodoimuonsach.edit",
        component: TheoDoiMuonSachEdit,
        props: true,
        meta: {requiresAuth: true}
    },

    {
        path: "/themsachmuonDocgiaadd",
        name: "theodoimuonsach.add",
        component: TheoDoiMuonSachAdd,
        meta: {requiresAuth: true}
    },

    //Them sach muon doc gia:
    {
        path: "/themsachmuonDocgia/:bookId/:userId",
        name: "themsachmuonDocgia.add",
        component: ThemSachMuonDocgia,
        props: true,
        meta: {requiresAuth: true}
    },

    //Khong dung duong dan
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        meta: {noHeader: true },
        component: () => import("@/views/NotFound.vue"),
    },
    

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("token");

    // Nếu trang yêu cầu xác thực và không có token
    if (to.meta.requiresAuth && !isAuthenticated) {
        console.log("Không có token, chuyển hướng về đăng nhập");
        next({ name: "dangnhap" });
    }
    else {
        next();
    }
});


export default router;

//createWebHistory() giúp URL gọn gàng hơn và hoạt động như một trang web bình thường mà không có dấu #.