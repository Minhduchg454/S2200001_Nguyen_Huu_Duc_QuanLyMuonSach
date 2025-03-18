
//Xuat mot module co the import vao file khac trong node.js

module.exports = {
    //Cau hinh ESLint de kiem tra code
    // Thiet lap moi truong ma ma JavaSript se chay
    env: {
        node: true, //Cho phep bien va module co san trong NodeJs
        commonjs: true, //Cho phep su dung require va module.export
        es2021: true, //Ho tro tinh nang moi nhat cua ECMAScripts
    },
    extends: ['eslint:recommended', 'prettier'],
    // Kich hoat bo quy tat co ban ma eslint de xuat de bat loi code
    //Tat cac quy tat ESLint co the gay xung dot voi prettier
}

