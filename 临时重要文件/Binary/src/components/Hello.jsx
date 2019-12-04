// 用普通的 function 构造函数 创建组件
import React from 'react'
export default function Hello(props){  // 以对象属性的方式接受数据
    return <div> --{props.name} ---{props.age} ---{props.gender} </div>
}