/*
 * @Author: fangp
 * @Date: 2020-05-26 10:52:04
 * @LastEditors: 
 * @LastEditTime: 2020-05-26 16:18:03
 */ 
import { SERVER_PATH as serverPath  } from 'Config/index';


export const main = [
    {
        name:"qh",
        method:"GET",
        path:"/caihong",
        serverPath: serverPath,
    },
    {
        name:"memory/post",
        method:"POST",
        path:"/memory",
        serverPath: serverPath,
    },
    {
        name:"memory/list",
        method:"GET",
        path:"/memory",
        serverPath: serverPath,
    }
  ]