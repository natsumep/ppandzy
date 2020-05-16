
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
    },
    {
        name: "recordList",
        path: "record",
        component: resolve => require(['Views/record/record-list'], resolve),
    },
    {
        name: "recordAdd",
        path: "record-add",
        component: resolve => require(['Views/record/record-add'], resolve),
    }
]