# 					react组件的使用

1. **在 index.js  中的源代码，如下：**

   1. ```jsx
      // 导入两个 包
      import React from 'react'
      import ReactDOM from 'react-dom'
      
      // function组件  用以给数据加上各种标签
      function CmtItem(props){
          return<div >
          <h3>评论人：  {props.user}</h3>  
          <p>
               评论内容：  {props.content}
           </p>
             
      </div>  
      }
      // class组件 用以接收数据（this.state 可用 Ajax接收数据），并使用各个 小组件 最终渲染至页面
      class CmList extends React.Component{
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
                  <h1> 这是评论列表</h1>
                  {
                      this.state.CommentList.map(item => 
                          <CmtItem  {...item} key={item.id}>    </CmtItem>
                      // <div key={item.id}>
                      //     <h3>评论人：  {item.user}</h3>  
                      //     评论内容：  {item.content}
                      // </div>  
                      )
                  }
                 
              </div>
          }
      }
      
      ReactDOM.render( <CmList>
      </CmList>,document.getElementById('app') )
      ```



2.   **将上述的 源代码 中的组件进行抽离**

   1. 在 **components** 中创建  **CmtItem.jsx** 文件，用以存放上述的  **CmtItem 组件**。CmtItem.jsx,如下：

      - ```jsx
        import React from 'react'
        
        export default function CmtItem(props){
            return<div >
            <h3>评论人：  {props.user}</h3>  
            评论内容：  {props.content}
        </div>  
        }
        ```

   2. 在 **components** 中创建  **CmtList.jsx** 文件，用以存放上述的  **CmtList组件**。CmtList.jsx,如下：

      - ```jsx
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
                    <h1> 这是评论列表</h1>
                    {
                        this.state.CommentList.map(item => 
                            <CmtItem  {...item} key={item.id}>    </CmtItem>
                       
                        )
                    }
                   
                </div>
            }
        }
        ```
        
        
   
3. 在  **index.js** 文件中，如下
   
   - ```jsx
        // 导入两个 包
     import React from 'react'
        import ReactDOM from 'react-dom'
        
        import CmtList from '@/components/CmtList'
        
        ReactDOM.render( <CmtList>
                
        </CmtList>,document.getElementById('app') )
     ```
   
        
   
4. 经过上述  1，2，3 ，最终结果，如下：
   
   - <img src="D:\Github\Github文件存放\BookSum\我的重要笔记\react\react组件的使用\3720bd19f4661d2df2eced93a866d29.png" style="zoom: 50%;" />
   
5. **注意： 在  components 文件夹中，组件的相互引用问题** 
   
      - **推荐使用  @  来代表  根目录下的 src 文件夹路径** 
   - `import CmList from '@/components/CmtItem'`  这就相当于使用绝对路径导入组件，不会发生其他路径的问题（因为组件可能会到处使用）

3. **jsx 中 标签添加行内样式**

   1. **注意：jsx 中 标签添加行内样式，不能为 style 设置 字符串的值，而应该如下：**

      - ```jsx
        <h1 style={ {color: 'red'} }> </h1>
        ```

      - **解释：最外层的  花括号，表示  你里面的是   js 代码**

      - ​       **里面那层  花括号， 表示   js 的一个对象**

   2.   如果 样式值 仅仅是数字，就可以不用 引号；其他的 就要用 引号括起

4.    **将 jsx 中   的标签行内样式进行封装**

     1.   第一种封装： `const styleItem = {border: '1px dashed #ccc',margin:'10px',padding:'10px'}`

     2.   因为两个花括号里是一个 对象，所以可以  用一个大的对象进行  第二种  封装 ，封装如下

          - ```jsx
            //  这里的代码是 CmtItem.jsx 文件内容，
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
            ```

     3.   第三种封装  （在  component 文件夹下，建立文件 styles.js,  抽离样式表模块如下：）

          - ```js
            export default {
            	item: {border: '1px dashed #ccc',margin:'10px',padding:'10px'},
                user: {},
                content: {}
                
            }
            // 在  index.js 文件中引入即可
            // import styles from '@/components/styles'
            ```

5.   ## **使用  CSS 样式  美化组件**

     1.   在  src 文件夹下  于  **components**  平级，创建  css 文件，用以存放  css 文件

     2.   再 在  css 文件夹下，创建  **cmtList.css**  文件  

     3.   因为  webpack 识别不了  .css 结尾的文件，需添加  loader

     4. 终端命令行输入 ：`cnpm i style-loader css-loader -D`  ，执行 默认是最新的版本

        -  **注意： style-loader  与   css-loader  的版本问题**
   -  **若 style-loader  和  css-loader 版本是 3.0+的版本，**
     
     5. 在 webpack.config.js 中新增一个 loader，如下：（2.0 和 3.0 的配置选一个即可）
     
        - ```js
            module: {
                      rules: [ // 是所有第三方的匹配  模块配置规则
                          { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/},
                  // use:  后面的值，因为只有一个 所以可以写成字符串，多个  可以写成  数组形式
                  // exclude 排除项 ， 配置 babel-loader 时 一定要加   exclude 排除项
                    //  在  style-loader  和  css-loader 版本是 2.0的版本的配置 
                          { test: /\.css$/, use: ['style-loader','css-loader']}
            
          // webpack 打包时会发现 import cssobj from '@/CSS/cmList.css'这行会发现后缀名它不识别
          //      它会 拿着   cmList.css文件 找第三方  loader
          //    因为这句   { test: /\.css$/, use: ['style-loader','css-loader']}
          //    webpack 会将  cmList.css文件 交给  css-loader 处理，处理结果  会交给前面继续			处理，直到前面没有。
                             
              //  以下是  style-loader  和  css-loader 3.0+版本的配置
                        
             {
                   test: /\.css$/,
                     // use:['style-loader' ,' css-loader'],
                    use:[
                     		'style-loader',
                         	{
                       		loader:  'css-loader',
                     			options: {
                          	modules: {
                        			mode: 'local',
             // mode 值，local 模块化的；global  全局化的
                         
                    				localIdentName: '[path][name]__[local]--[hash:base64:5]',
              // localIdentName  后面会讲到
                      			context: path.resolve(__dirname, 'src'),
                      			hashPrefix: 'my-custom-hash',
                      		},
                     		}
                   	 }
                      ],          
           	 }  
                        
          
                        
                        
                      ]
                  },
          ```
          
     
     6.   在 **CmtList2** 文件下，导入  css 文件
     
          - ```jsx
            import cssobj from '@/CSS/cmtList.css'    
            //  上述方式 导入的样式表  默认的情况下没有作用域的概念，不管你是在哪个组件上导入了样式表，
            //   默认都属于全局，即整个项目（即 一个组件导入了一个样式表，在其他的组件中都会使用该样式）
            //   ========   这样就不能为 组件 建立单独的  css 文件 ，需要为 CSS模块化 ===========
            //  没有模块化的时候， cssobj 只是一个空对象（ 因为  css 样式表 并没有向外暴露任何东西）
            
            //  ==在 Vue 中 可以使用  <style scoped> </style>  scoped 指令，指定作用域
            //  React 中没有类似这样的指令（React 没有指令的概念）
            ```
     
     7.   **为了能够   为各个组件建立单独的  css 文件**      
     
          1.   ` { test: /\.css$/, use: ['style-loader','css-loader?modules']} `  **css-loader 后面加参数** 
               -  **modules**  为  普通的 样式表（即 后缀 .css 文件） 启用模块化，且只有  **css-loader** 有参数。这样之后，在哪个组件中导入，就只会在哪个作用域中有效。
     
     8.    **模块化  css 文件后，如何在组件中使用  css 样式表**  
     
          1.   ```jsx
               //  CmtList2 文件下
               
               import React from 'react'
               import cssobj from '@/CSS/cmtList.css'  
               // 模块化 后， cssobj 是一个对象，
               // cssobj，属性名 是css文件中的 类选择器 或者是 ID选择器；
               //		   而属性值是，乱码形式的 类名 或者 ID名 
               //		   类选择器 或者是 ID选择器 会模块化，标签选择器不会 模块化
               
               // 当然   { test: /\.css$/, use: ['style-loader','css-loader?modules']} 
               // 后面可以继续添加 参数，让 cssobj 的属性值，简单明了化（路径+名+hash（乱码））
               
               // 使用模块化的 css 样式
               
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
                       return <div>
                           <h1 className={cssobj.title}> 这是评论列表</h1>
                           
                           {/*
                           	在 css 文件中有
                           	.title{
                           		color: red;
                           	}
                           
                           */}
                           
                           {
                               this.state.CommentList.map(item => 
                                   <CmtItem  {...item} key={item.id}>    </CmtItem>
                               )
                           }
                       </div>
                   }
               }
               ```
     
     9.   **自定义样式规则   >>>    **   
     
          1.   `{ test: /\.css$/, use: ['style-loader','css-loader?modules']}`
     
               - 使用  `localIdentName`   自定义生成 类名的格式
     
                 - `[path]`    **表示   样式表   相对于 `项目根目录 `所在的路径**
     
                 - `[name]`    **表示  样式表文件名称**
     
                 - `[local]`    **表示 样式表  的类 或 id 定义的名称**
     
                 - `[hash:length]`  **表示 32 位的  hash 值（可 指定 length  ）**
     
                 - 如：**（以下是在  css-loader 2.0  的 module 配置）**
     
                   - ```jsx
                       {
                       	test: /\.css$/,
                       	use:['style-loader' ,' css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]']
                       }
                     ```
     
                     
     
                 - 如： **（css-loader 3.0 的  module  配置）**
     
                   - ```jsx
                        // {
                              test: /\.css$/,
                               use:[
                                		'style-loader',
                                    	{
                                  		loader:  'css-loader',
                                			options: {
                                     	modules: {
                                   			mode: 'local',
                        // mode 值，local 模块化的；global  全局化的
                                    
                               				localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                 			context: path.resolve(__dirname, 'src'),
                                 			hashPrefix: 'my-custom-hash',
                                 		},
                                		}
                              	 }
                             
                     ```
     
     10.   **在 已被模块化的 css 样式表中 ，单独使  某个 选择器  全局化 **
     
           - ```css
             :global(.test){
                 font-style:italic;
             }
             ```
     
           - **注意： 在全局化 某个选择器后，只要有一个组件  引入了包含该 全局选择器 的样式，其他组件也可使用该 样式。**
     
           - **在其他组件使用  全局化的   选择器**，
     
             -  如： ` <h1 className={[cssobj.title,'test'].join(' ')}> 这是评论列表</h1>`
             - 如： ` <h1 className='test'> 这是评论列表</h1>`
     
           - ```css
             :local(.test){
                 font-style:italic;
             }
             // 会模块化
             ```
   
6.   ### **导入 第三方  样式表（如： bootstrap） **

     1.   装 bootstrap  `cnpm i bootstrap@3.3.7 -s`（装的是  **bootstrap3**，装到了  node_modules 下面）

          - 导入包时的 路径写法：
            - 若 引用某个包时，这个包被安装到了  node_modules  目录中，则可以省略 node_modules 这层目录，直接以  包名 开始引入自己的模块

     2.   因为 bootstrap 会引入其他各种  字体  图片，所以
          - 字体  图片 的后缀名，  webpack  识别不了，需加上：

          - ```jsx
             {test: /\.ttf|woff|woff2|eot|svg$/,use:'url-loader'}   //打包处理  字体文件  的 loader
            ```

          - 安装  字体 loader 

            - `cnpm i url-loader -D`
            - 字体  loader 有依赖于  file-loader
              - `cnpm i file-loader -D`

     3.   组件中 引入 bootstrap

          - `import bootcss from 'bootstrap/dist/css/bootstrap.css'` 
          - 使用规则  和 其他 引入的 css 样式表 使用规则是一样的
          - 模块化后的  bootstrap  样式表的使用
            - ` <button className={[bootcss.btn,bootcss['btn-primary']]}> 按钮</button>`
            - **注意：错误使用 : **  ` <button className="btn btn-primary"> 按钮</button>`
              - **因为： bootstrap 样式已经模块化了，不是全局的** 

     4.   **注意： 因为 module 配置，使引入的  CSS 样式表  都是模块化的。要想引入的 bootstrap 样式，能够全局使用，如下:**  

          1.   **错误示范：**

               - ```jsx
                  {
                                     test: /\.css$/,
                                     // use:['style-loader' ,' css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]'],
                                     use:[
                                         'style-loader',
                                         {
                                             loader:  'css-loader',
                                             options: {
                                                 modules: {
                                                     mode: 'local',
                                                     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                                     context: path.resolve(__dirname, 'src'),
                                                     hashPrefix: 'my-custom-hash',
                                                   },
                                             }
                                         },
                                         
                                     ],
                                     exclude: /node_modules/ 
                                 },
                 ```

                 -  添加了   ` exclude: /node_modules/ `  排除项，会导致  `import bootcss from 'bootstrap/dist/css/bootstrap.css'` ，引入的  css 文件不被 webpack 识别

          2.   **正确示范：**

               1. 自己规定， **第三方的  样式表  都以  .css 结尾**； **自己的样式表，都以   .scss  或  .less  结尾**
               
               2. 这样在  module 可以为  不同的  样式表 ，配置是否模块化
                  
                  - 所以在此   bootstrap.css  不管 ，而  .scss  .less  进行模块化（只为自己写的  css 样式表模块化
                  
               3. **安装 能够解析  scss 的   loader**
                  
                  - `cnpm i sass-loader  node-sass  -D`     没错是   sass
                  
               4. 配置 loader，（下列是  整体的 rules）
               
                  - ```jsx
                        rules: [ 
                       		{ test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/},
                      		{
                             	test: /\.css$/,
                               	use:['style-loader' ,'css-loader'],
                            	},
                         //打包处理  字体文件  的 loader
                      	{test: /\.ttf|woff|woff2|eot|svg$/,use:'url-loader'},  
                        {   	   //  打包  处理  scss 文件的  loader
                         test: /\.scss$/,
                          	use:[
                         			'style-loader',
                       				 {
                             			loader:  'css-loader',
                              			options: {
                              				modules: {
                              				mode: 'local',
                            				localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                   			},
                           						}
                             						},
                         			'sass-loader'
                        		],        
                        },
                            
                            
                            
                     	// 可以在 css-loader 通过 ？ 后追加参数， 
                       	//  有个 固定的 参数 modules ，  表示为 普通的样式表   启用模块化；
                        // 为 .css 后缀的文件启用模块化，只有 css-loader 才有
                    
                    //    webpack 打包时，会发现   import cssobj from '@/CSS/cmList.css'   这行 会发现 后缀名它不识别        
                    //    它会 拿着   cmList.css文件 找第三方  loader
                    //    因为这句   { test: /\.css$/, use: ['style-loader','css-loader']}
                    //    webpack 会将  cmList.css文件 交给  css-loader 处理，处理结果  会交给前面继续处理，直到前面没有。
                            
                    //   { test: /\.css$/, use: ['style-loader','css-loader']}    -loader 是 webpack 2 以后必须有的
                                ]
                            
                    ```
               
                  - 说明：
               
                    - ```jsx
                      	{
                               	test: /\.css$/,
                                 	use:['style-loader' ,'css-loader'],
                              	},
                       {/*
                       	这段配置，主要是为了 第三方的样式表
                       */}	
                      ```
               
                    - ```jsx
                        {   	   //  打包  处理  scss 文件的  loader
                           test: /\.scss$/,
                            	use:[
                           			'style-loader',
                         				 {
                               			loader:  'css-loader',
                                			options: {
                                				modules: {
                                				mode: 'local',
                        		// 因为 .scss 文件是自己写的  css 样式
                        		// 故要对其进行 模块化
                              				localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                     			},
                             						}
                               						},
                           			'sass-loader'
                          		],        
                          },
                      ```
               
                      

 