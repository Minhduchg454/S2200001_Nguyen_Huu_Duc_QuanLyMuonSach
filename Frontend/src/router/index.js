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
//Dieu huong trang

//Danh sach cac tuyen duong
const routes = [
    {
        path: "/",
        name: "trangchu",
        component: TrangChu
    },

    {
        path: "/book/:id",
        name: "trangchu.edit",
        component: BookEdit,
        props: true // Truyền các biến trong $route.params vào làm props - Nhan gia tri id nhu mot prop cha xuong con
    },
    {
        path: "/bookadd",
        name: "trangchu.add",
        component: BookAdd,
    },

    //Nha xuat ban
    {
        path: "/nhaxuatban",
        name: "nhaxuatban",
        component: NhaXuatBan,
    },
    
    {
        path: "/nhaxuatban/:id",
        name: "nhaxuatban.edit",
        component: NhaXuatBanEdit,
        props: true
    },
    
    {
        path: "/nhaxuatbanadd",
        name: "nhaxuatban.add",
        component: NhaXuatBanAdd,
    },

    //Nhan vien
    {
        path: "/nhanvien",
        name: "nhanvien",
        component: NhanVien
    },

    {
        path: "/nhanvien/:id",
        name: "nhanvien.edit",
        component: NhanVienEdit,
        props: true
    },

    {
        path: "/nhavienadd",
        name: "nhanvien.add",
        component: NhanVienAdd,
    },
    //docgia
    {
        path: "/docgia",
        name: "docgia",
        component: DocGia
    },

    {
        path: "/docgia/:id",
        name: "docgia.edit",
        component: DocGiaEdit,
        props: true
    },
    {
        path: "/docgiaadd",
        name: "docgia.add",
        component: DocGiaAdd,
    },

    //Dang nhap
    {
        path: "/dangnhap",
        name: "dangnhap",
        component: DangNhap,
        meta: { noHeader: true },
    },



    //theo doi muon sach
    {
        path: "/theodoimuonsach",
        name: "theodoimuonsach",
        component: TheoDoiMuonSach
    },

    {
        path: "/theodoimuonsach/:id",
        name: "theodoimuonsach.edit",
        component: TheoDoiMuonSachEdit,
        props: true
    },

    {
        path: "/themsachmuonDocgiaadd",
        name: "theodoimuonsach.add",
        component: TheoDoiMuonSachAdd,
    },

    //Them sach muon doc gia:
    {
        path: "/themsachmuonDocgia/:bookId/:userId",
        name: "themsachmuonDocgia.add",
        component: ThemSachMuonDocgia,
        props: true
    },

    //Khong dung duong dan
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;

//createWebHistory() giúp URL gọn gàng hơn và hoạt động như một trang web bình thường mà không có dấu #.