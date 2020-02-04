
export default [
    {
        name: "main",
        path: "/", 
        redirect: "/main/main",
        meta: {} ,
    },
    {
        name: "main",
        path: "main", 
        component: resolve => require(['Views/main'], resolve),
        meta: {} ,
    },
    {
        name: "qs",
        path: "qs",
        component: resolve => require(['Views/qs'], resolve),

    }
]