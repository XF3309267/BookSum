// 这是没有  引用  CSS样式  之前的   CmtList.jsx文件
import React from 'react'

import CmtItem from '@/components/CmtItem'

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
        return <div>
            <h1 style={ { color:'red',textAlign:'center',fontWeight:200} }> 这是评论列表</h1>
            {
                this.state.CommentList.map(item => 
                    <CmtItem  {...item} key={item.id}>    </CmtItem>
                )
            }
           
        </div>
    }
}