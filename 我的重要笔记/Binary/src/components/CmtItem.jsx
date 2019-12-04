
// 这是没有  引用  CSS样式  之前的   CmtLItem.jsx文件
import React from 'react'


const styles = {
    item: {border: '1px dashed #ccc',margin:'10px',padding:'10px'},
    user: {},
    content: {}
}

export default function CmtItem(props){
    return<div style={styles.item} >
    <h3 >评论人：  {props.user}</h3>  
    评论内容：  {props.content}
</div>  
}