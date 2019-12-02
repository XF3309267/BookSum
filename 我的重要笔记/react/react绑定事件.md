### 					React  绑定事件  和  修改 `this.state`  数据

<hr>

### React 事件绑定

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

   
    ### 修改  state  的值 
   
   1. ```jsx
      // 举例：
      
      //  class 中
      //constructor(){
      //       super()
      //        this.state ={
      //            msg:'😄',
      //			  str: 'ma'
      //       }
      //    }
      
      
        fun = (arg1) => {
                 this.setState({
                     msg:'🍔'
                 },function(){
                     	console.log("回调函数")     			// 
                  	console.log(this.state.msg);		  	//  🍔
                 })
                 console.log("after")
                 console.log(this.state.msg);    				// 😄
            
       // *************  注意：  this.setState 的方法是  异步的   **************
      // this.setState 的方法是  异步的（ 即主线程任务执行完，才会在  执行异步任务队列中 的异步任务）
      // 若 需要对 修改后的  this.state 的值进行操作，可在  this.setState 的第二个参数赋予回调函数
              }
      ```
   
      - **解释：** `this.setState(  )` 方法  接收两个参数
   
        - 第一个参数（  对象形式  >>>  `{msg: 'aaa'}`  ),只需写出你想修改的属性 名 与 值
        - 第二个参数  （是一个方法，  回调函数,即 修改完成后，应该执行的函数）
   
      - **VScode 小技巧： 注释折叠**
   
        -   
   
          ```js
          // region    这里是折叠
          //
          //	  这两个包夹的注释就可以进行折叠
          //
          // endregion
          
          // 折叠就会编程
          
          // region  这里是折叠...
          
          ```
   
      ### state中的值 与 DOM 标签中的 value 绑定
   
      1. **单向数据绑定    （ state中的值  单向传递给   input 中的 value）**
   
         - ```jsx
            <input type="text" value={this.state.msg}  onChange={(e)=>this.textChange(e) }    ref='txt'/>
           // 可以看到 这里 input 中的 value， 被赋值为   this.state.msg
           //  当你不能通过改变  input 的 输入框中内容，而去改变  this.state.msg 中的值
           //  在此，而不只这些。你也无法改变 输入框中的值,因为 你改完后，  value={this.state.msg} 
           //   这句 有会将  this.state.msg  的值 赋给  input.value
           ```
   
      2.  **双向数据绑定**
   
         - ```jsx
            render(){
                   return <div>
                       BinderEvent 组件
                      {
                          this.state.msg
                      }
                   
                       <button onClick={()=>this.fun(  this.state.msg  )}>     按钮    </button>
                       <input type="text" value={this.state.msg}  onChange={ (e)=>  this.textChange(e) }    ref='txt'/>
                   </div>
                   }
                   textChange = (e)=>{
                       {/*
           				每当  input 输入框中的 值 有变化，
                             就会将 调用 this.setState() 方法 将 input.value 值赋给 msg
                       */}
                       const newValue = this.refs.txt.value
                       
                // 只要你在 DOM 标签中添加了 ref 属性，在 React 中就可以使用 this.refs.值 获取该元素
                  
                       const newValue2 = e.target.value
                //  *********  也可以使用  e.target  该元素
                       this.setState({
                           msg:newValue2
                       })
                       console.log(this.state.msg)
                   }
           // 为 input 设置 onChange 
           // 所以 每当 input  输入框中 有任何变化
           ```
   
           