
import React from 'react'
import cssobj from '@/CSS/cmtItem.scss' 
// console.log("=============  CmtItem2  ===========")
console.log(cssobj)
const styles = {
    item: {border: '1px dashed #ccc',margin:'10px',padding:'10px'},
    user: {},
    content: {}
}

export default function CmtItem(props){
    return<div className={cssobj.cmtbox} >
    <h3 className={cssobj.title} >评论人：  {props.user}</h3>  
    <p className={cssobj.content}>
         评论内容：  {props.content}
    </p>
   
</div>  
}