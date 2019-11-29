### 					React  绑定事件

1. 在 react 中有一套自己的事件定绑定机制，事件名   >>  小驼峰  的形式命名

   - 如： `<button  onClick={function(){}}>     </button>`

2. 为事件提供处理函数，必须如下格式

   - `onClick = {function}`
   - 即 {}  中必须是一个匿名 函数  （当然   `()=>{}` 箭头函数也是匿名函数
     - 箭头函数中的  **this**  总是指向 包裹这个箭头函的  this
     - **错误：** `<button onClick={()=>{this.style.backgroundColor = 'red'} }>`

3. **标准的事件绑定  方式**

   - ```jsx
      render(){
             return <div>
                 BinderEvent 组件
     
                 // 标注的事件绑定
                 <button onClick={()=>
                     {  
                         this.fun()
                         // console.log(this)
                         // this.fun()
                     }
                 }>
                 按钮
                 </button>
             </div>
         }
         
        fun = () => {
        		this.style.backgroundColor = "red"
         }
     ```

     