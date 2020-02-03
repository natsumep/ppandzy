import mainChild from "./mainChildren";
export default [
    {
        name: "index",
        path: "/",
        redirect: "/main"
    },
    {
        name: "main",
        path: "/main", 
        component: resolve => require(['Views'], resolve),
        meta: { title: "" } ,
        children: mainChild,
    },
    {
        path: "*", // 这个必须放在最后匹配！！！！！！！！！！！  跳转404 专用
        component: resolve => require(['Views/404'], resolve),
        meta: {
            title: "404"
        }
    }
]