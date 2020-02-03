
export default [
    {
        name: "main",
        path: "/", 
        redirect: "/main/project",
        meta: {} ,
    },
    {
        name: "project",
        path: "project", 
        component: resolve => require(['Views/main'], resolve),
        meta: {} ,
    }
]