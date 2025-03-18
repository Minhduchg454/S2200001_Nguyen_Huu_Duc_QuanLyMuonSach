//import thu vien de tao server
const express = require("express"); 
 //import thu vien CORS cho phep cac request tu domain khac
const cors = require("cors");

const sachRouter = require ("./app/routes/sach.route");
const nhaxuatbanRouter = require ("./app/routes/nhaxuatban.route");
const nhanvienRouter = require ("./app/routes/nhanvien.route");
const docgiaRouter = require ("./app/routes/docgia.route");
const theodoimuonsachRouter = require ("./app/routes/theodoimuonsach.route");
const xacthucRouter = require ("./app/routes/xacthuc.route");
const ApiError = require ("./app/api-error")


// express () la mot ham xd, tra ve function co the goi cac phuong thuc khac .use(), .get(),..
const app = express();


//Middleware: la ham trung gian, mot ham chay truoc khi cac request den cac route handler
    //Cho phep API cua ban nhan request tu domain khac, mac dinh trinh duyet chan
     //Giup Express doc JSON tu request body

app.use(cors());
app.use(express.json());

//Dinh nghia khi client gui yeu cau thi theo dinh dang. Vidu http://localhost:4000/api/contact/favorite
app.use("/api/sach", sachRouter);
app.use("/api/nhaxuatban", nhaxuatbanRouter)
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/docgia", docgiaRouter);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);
app.use("/api/xacthuc", xacthucRouter);


/*
    Middleware đầu tiên kiểm tra xem có route nào khớp không. Nếu không, nó tạo lỗi 404.
        //Neu khong co yeu cau nao khop, sai duong dan, miđleware se tu dong goi next () voi mot loi ApiErỏ
        // app.use() khoi chay khi khong co route phu hop, bat loi
        //Chuyen loi nay den miđleware xu ly loi tiep theo
    
    Middleware thứ hai sẽ bắt lỗi và trả về phản hồi JSON với mã lỗi và thông báo lỗi phù hợp.
        // Bat va phan hoi khi co loi trong ung dung
        //Neu loi ma trang thai se trang ve ma loi, nguoc lai tra ve ma 500
        //Neu co loi thong bao se..........
*/



app.use((req, res, next) => {
    return next(new ApiError(404, "Resoure not found"));
});


app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server Error",
    });
});


//Router handler, co duong dan cu the
app.get("/", (req, res) => {
    res.json({message: "Welcome to Quan ly muon Sach"})
})

module.exports = app;