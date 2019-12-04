

import React from 'react'

// 导入组件需要的样式表
import cssobj from '@/CSS/cmtList.scss'    //  webpack 处理不了  css 后缀的文件，要处理，必须加  loader

//  上述方式 导入的样式表  默认的情况下没有作用域的概念，不管你是在哪个组件上导入了样式表，
//   默认都属于全局（即 一个组件导入了一个样式表，在其他的组件中都可以使用该样式）


// import cssobj from '@/CSS/cmtList.css'   
// 在导入模块化以后，cssobj 对象就有了，准确的数据
// （没有模块化的时候， cssobj 只是一个空对象（ 因为  css 样式表 并没有向外暴露任何东西））
//  例如：  css 中的 .title{ },  在 jsx 中使用： <h1 className={cssobj.title}>   </h1>
 
//  =========    在 Vue 中 可以使用  <style scoped> </style>  scoped 指令

import  'bootstrap/dist/css/bootstrap.css'

import CmtItem from '@/components/CmtItem2'

export default class CmList extends React.Component{
    constructor(){
        super()
        this.state = {
            CommentList:[
            {id:1,user:'张三',content:'第1个 大娃'},
            {id:2,user:'李四',content:'第2个 二娃'},
            {id:3,user:'王五',content:'第3个 三娃'},
            {id:4,user:'赵六',content:'第4个 四娃'},
            {id:5,user:'田七',content:'第5个 五娃'},
            ]
        }
    }
    render(){
        return <div className="container">
           
            <h1 className={[cssobj.title,'test'].join(' ')}> 这是评论列表</h1>
            {/* <button className={bootcss.btn}></button> */}
            <button className="btn btn-info"> 按钮</button>
            {
                this.state.CommentList.map(item => 
                    <CmtItem  {...item} key={item.id}>    </CmtItem>
                )
            }
        </div>
    }
}