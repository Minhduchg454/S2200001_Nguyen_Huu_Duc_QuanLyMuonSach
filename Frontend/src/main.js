import './assets/main.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"

createApp(App).use(router).mount('#app')

/*
    Tạo ứng dụng Vue từ ./App.vue
    Sử dụng router để quản lý điều hướng
    mount('#app') → Gắn ứng dụng vào thẻ <div id="app"></div> trong index.html
     
    
    => Khi chạy ứng dụng, Vue sẽ hiển thị giao diện dựa trên App.vue và điều hướng bằng Vue Router.


*/