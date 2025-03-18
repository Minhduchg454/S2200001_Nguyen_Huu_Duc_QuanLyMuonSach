import { createWebHistory, createRouter } from "vue-router";
import TrangChu from "@/views/TrangChu.vue"
import TheoDoiMuonSach from "@/views/TheoDoiMuonSach.vue";
import DangNhap from "@/views/DangNhap.vue";
import NhaXuatBan from "@/views/NhaXuatBan.vue";
import DocGia from "@/views/DocGia.vue";
import Sach from "@/views/Sach.vue";
import NhanVien from "@/views/NhanVien.vue";
import MuonSach from "@/views/MuonSach.vue";

//Dieu huong trang

//Danh sach cac tuyen duong
const routes = [
    {
        path: "/",
        name: "trangchu",
        component: TrangChu
    },
    {
        path: "/theodoimuonsach",
        name: "theodoimuonsach",
        component: TheoDoiMuonSach
    },
    {
        path: "/dangnhap",
        name: "dangnhap",
        component: DangNhap,
    },
    {
        path: "/nhaxuatban",
        name: "nhaxuatban",
        component: NhaXuatBan,
    },
    {
        path: "/docgia",
        name: "docgia",
        component: DocGia
    },{
        path: "/sach",
        name: "sach",
        component: Sach
    },{
        path: "/nhanvien",
        name: "nhanvien",
        component: NhanVien
    },{
        path: "/muonsach",
        name: "muonsach",
        component: MuonSach
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;

//createWebHistory() giúp URL gọn gàng hơn và hoạt động như một trang web bình thường mà không có dấu #.