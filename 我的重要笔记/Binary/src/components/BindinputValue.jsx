import React from 'react'
// import { log } from 'util'
export default class BindEvent extends React.Component {
    constructor(){
        super()
        this.state ={
            msg:'😄'
        }
    }
  
    render(){
        return <div>
            BinderEvent 组件
           {
               this.state.msg
           }
        
            <button onClick={()=>this.fun(  this.state.msg  )}>     按钮    </button>

           
            <input type="text" value={this.state.msg}   onChange={ (e)=>  this.textChange(e) }    ref='txt'/>
           
        </div>
        }
        textChange = (e)=>{
            const newValue = this.refs.txt.value
            const newValue2 = e.target.value
            this.setState({
                msg:newValue2
            })
            console.log(this.state.msg)
            // console.log(newValue)
        }
        fun = (arg1) => {
           this.setState({
               msg:'🍔'
           },function(){
               console.log("回调函数")
            console.log(this.state.msg);
           })
           console.log("after")
           console.log(this.state.msg);
        //    this.setState 的方法是  异步的（ 即主线程任务执行完，才会在  执行异步任务队列中 的异步任务）
        //      若 需要对 修改后的  this.state 的值进行操作，可在  this.setState 的第二个参数赋予  回调函数
        }

   
}