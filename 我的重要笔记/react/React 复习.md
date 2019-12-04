# 	React 复习

#### 1.创建基本的 webpack4.x 的项目

 	1. 运行  `npm init -y`  ;             快速初始化一个项目   **如何才能使用 cnpm  ** >>>  命令行执行：                     npm install cnpm -g --registry=https://registry.npm.taobao.org 
      2. 在项目根目录中创建  **src** 源代码目录 （存放所有项目源代码）和 **dist** （要发布的产品存放在这）产品目录[^1]

[^1]: 我们会将 自己写的源代码 统统发在 **src** 目录下方，**dist**  存放已完成要发布的产品文件

 3. 在 **src** 目录下 创建 index.html

 4. 使用 npm 安装 webpack ， 运行  `npm i webpack -D` ，`npm i webpack-cli  -D`  ，

    - **cli**  脚手架 。 在 3.6X 之前 在终端中输入 **webpack** 就会自动打包，现在 在4.x之后 **webpack** 命令需

      **webpack-cli** 来提供。

    -  可以在 npm 命令后面 加上淘宝镜像 ： --registry=https://registry.npm.taobao.org

    - 也可使用，cnpm 安装 webpack，但之前必须全局X运行 `npm i cnpm -g` 

    - 安装完后，需要使用命令行  `webpack` 进行打包构建，**在打包构建之前src目录下必须存在  index.js文件**

 5. webpack 提供了默认的打包文件入口（即：src 目录下的 index.js 文件）

    - 打包的输出文件是 dist 目录下的 main.js

    -  **webpack-dev-server**  会将 **index.js** 文件进行**实时打包编译**，而其会将打包好的 **js文件**  托管放到内存中，所以在项目中看不到。但是我们可以假装在项目根目录中有一个，看不见的  **main.js**,所以可以在   **index.html** 文件中链接  **main.js**  文件 ，如：  `   <script src="/main.js"></script>`   

    - 也可自己写入口文件.下列代码写在在根目录下的  **webpack.config.js**，如下：

      - **创建  webpack.config.js 文件必须在  执行webpack命令行之前 创建好 **，因为入口文件的原因
      
      - ```js
        module.exports = {
        
        ​    mode: 'development', *// development production*
            // 解释： mode 属性：  (4.x 新增的属性，配置文件必须有此属性，且有值)
            //			development 开发环境 
            //			production	产品环境 (文件内容 会进行一定的压缩)
        
        ​    entry: './src/main.js'  // js 文件名可以自己定义，js 入口文件
        }
        ```

6. 因为 **src** 下面的  **index.js** 文件，是入口文件。所以每对 **index.js** 文件进行更改一次，就要重新打包构建。

   - 为了避免 上述的麻烦，所以需要配置 **实时打包编译**  使用命令行 ` cnpm i webpack-dev-server -D`  

   - 实时打包编译后，**index.js**  的变化，都会在实时的  表现在根目录下那个  **main.js** 中

   - 而且需要在 packpage.json 文件中的  **script**  属性中 **加入**，如下

     ```js
     "scripts": {
             "test": "echo \"Error: no test specified\" && exit 1", // 这是文件中自带的
           	 "dev": "webpack-dev-server --open"
         	// 在终端命令行中，就可使用： npm run dev (表示执行 dev 这个脚本)
         	//  1. "webpack-dev-server"		脚本的作用，下面有解释
         	//  2. "--open --port 3000"  	自动打开浏览器, "--port" 默认端口号：3000
         	//	3. "--host 127.0.0.1" 		定义域名
         	//  4. "--compress"  			对文件进行 压缩(======= 有待考究 ========)
             // 	5. "--open firefox"			默认打开的浏览器：firefox
         },
     ```

     - **webpack-dev-server:**   webpack-dev-server是webpack官方提供的一个小型Express服务器。使用它可以为webpack打包生成的资源文件提供web服务。[webpack-dev-server官方文档](https://webpack.github.io/docs/webpack-dev-server.html)

       webpack-dev-server 主要提供两个功能：

       - 为静态文件提供服务

       - 自动刷新和热替换(HMR)

7. 终端中的命令行，有显示如下：

```
Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
```

- ​	`webpack output is served from /`  表示： **webpack 输出文件**  正在被 托管于 根路径
  - ​    即： http://localhost:8080/main.js  可在浏览器中显示  main.js  文件

- ​    代码第一行：  项目正在运行于  ` http://localhost:8080/ `  。请在终端中  使用  `ctrl`  +  **鼠标左键**  打开
  - ​	如果只是普通的在 资源管理器中打开，不会链接到 内存中的  **main.js**  文件

8. **将首页也放到内存中去**   

   - 在终端执行命令： `cnpm i html-webpack-plugin -D`  

   - 在 **webpack.config.js 文件** 中写入下列代码：（webpack.config.js  与 src 同级）

     -  

       ```js
       const path = require('path')
       const HtmlWebPackPlugin = require('html-webpack-plugin') 
       //导入  在内存中自动生成  index 页面的 插件
       
       // 创建一个插件实例对象
       const htmlPlugin = new HtmlWebPackPlugin({
           template: path.join(__dirname, '/src/index.html'), //源文件    
           // "__dirname": 当前文件所处目录，因为 webpack.config.js 文件
           //   就在根目录下，所以其表示的是  根目录
           filename: 'index.html' 		// 生成内存中首页的名称
           // 根据源文件中的 文件， 生成 内存中的一个  html 首页
       })
       
       	// webpack 配置文件
       	//  下列是配置文件, 向外暴露一个打包的配置对象
       module.exports = {
               mode: 'development', //  development  production
           	// entry:  './src/main.js'   打包的入口文件，
           	// 也可不用写，因为默认打包的入口文件是  src  -> index.js 文件
               plugins: [
                   htmlPlugin
               ]
           } 
       // html  页面存入了内存
// htmlPlugin  会自动把打包好的  main.js（即之前存入内存中的  main.js） 追加到页面中去
       ```
       
       -  **html-webpack-plugin**     (========        有待考究                ===========)

9. ###  在项目中使用  react 

   1. 运行  `cnpm  i react  react-dom -s`   安装两个包

      - -D   与  -S  的区别（<<<<   应百度  详细去了解   >>>>>）
        - -S      从开发到上线 都需要用到的包
        - -D    工具就用  -D

      1. **react**     用于  **创建组件**  和  **虚拟DOM**（用 JS 来表现页面上的元素，组件的生命周期都在这个包中
      2. **react-dom**   操作生成好的虚拟DOM，渲染到页面上（因为虚拟DOM会存于内存中）

   2. 在  **index.js**  中导入这两个包，且必须如下写

      ```js
        import  React from 'react'  
        import  ReactDOM from 'react-dom'
      // import 后按理接的是 一个变量名，但在此  必须如上 写
      
      ```

   3. **如何创建 虚拟 DOM 元素**    （下列 是写在   index.js 中，即 入口  JS文件中）
      1. `React.createElement()`    返回 一个虚拟  DOM 元素
         - 方法参数列表说明　　（）
           1.  第一个参数，  创建 元素的类型  字符串形式，如： `'h1'`
           2.  第二个参数，  DOM 元素的属性，**对象**  或 **对象形式**  或 **null**, 如：           `{id: 'myh1',title:'this is a title'}`
           3. 第三个参数，   子节点   （可能是  虚拟DOM 或  文本节点）
           4. **第三个参数 以及 后面的参数，都是该元素的子节点**
   4.  `ReactDOM.render()`   **将虚拟DOM 渲染到页面上**
      
      1. 参数1： 要渲染的  虚拟DOM元素
      2. 参数2： 指定页面上的一个容器 ，即虚拟DOM元素要装进哪个   容器（是一个 DOM 元素）

10. ### 使用  babel   转换  JS 中的标签

    1. **在  JS  文件中,混合写入类似于  HTML 的语法,叫做  JSX 语法(符合  XML 规范的 JS语法)**

    2. **JSX  语法的本质,是在 运行时,将 HTML 标签 转换成了  React.createElement  形式来执行**

    3. **配置  babel**
       
       3. `cnpm i @babel/core babel-loader@8 @babel/preset-env @babel/preset-react -D`
          -  `cnpm i @babel/plugin-transform-runtime`
       4. - 将  jsx   转换为  `React.createElement()` 
       
    4.  在 webpack.config.js 中 写入下列代码 ，
    
        1.  ```js
        const path = require('path')
            const HtmlWebpackPlugin = require('html-webpack-plugin')
            
            const htmlPlugin = new HtmlWebpackPlugin({
                inject: 'body',
                template: path.join(__dirname, './src/index.html'),
                filename: 'index.html',
               
            })
            
            
            // webpack  默认只能打包处理  .js 后缀的文件，像 .png .vue 无法主动识别，所以要配置第三方  //     的 loader；
            
            
            module.exports = {
                
                    mode: 'development',
                    plugins: [
                        htmlPlugin
                    ],
                    //  第三方  要放到  module 节点下
                    //  webpack  处理不了的，就会第一时间 找第三方规则
                // *********  加了如下 *******************    
                module: {
                        rules: [ // 是所有第三方的匹配  模块配置规则
                        { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/},
                    // use:  后面的值，因为只有一个 所以可以写成字符串，多个 可以写成  数组形式
                     // exclude 排除项 ， 配置 babel-loader 时 一定要加   exclude 排除项
                        ]
                    }
                }
            ```
        
    5. 在使用  babel8.0  时，我的  babel 配置
    
       1.  ```jsx
       "devDependencies": {
               "@babel/core": "^7.7.4",
               "@babel/preset-env": "^7.7.4",
               "@babel/preset-react": "^7.7.4",
               "babel-loader": "^8.0.6",
               "html-webpack-plugin": "^3.2.0",
               "webpack": "^4.41.2",
               "webpack-cli": "^3.3.10",
               "webpack-dev-server": "^3.9.0"
             }
           ```
           
       2. **2019/12/03**
    
          

       3. **安装 了版本  babel8**。（对于  **react  **  还需去官方文档了解）

    6. **完成上述操作后，需在根目录下 新建一个 文件，文件名为：  .babelrc **

       1.  **.babelrc**  内容如下

           1.  ```.babelrc
           {
                   "presets":["@babel/preset-env","@babel/preset-react"],
                   "plugins":["@babel/plugin-transform-runtime"]
               }
               // 说明： 对 8.0 的 babel  配置
               ```
    
    ------

11. ####   在  JSX  中 写入  JS 代码

    1. 在  JSX  区域中，写入  **js  代码**  或 引用  **js变量**，必须 将 js 代码写在   {}   中，如： 

       ```jsx
       const h1 = <h1> h1 h1 h1   </h1>;  // JSX 元素 赋给  js 的一个变量
       const tit = 'sss';
       const a =10;
       
       const  arr = { // jsx 数组
           <h2> h2 </h2>,  
           <h3> h3 </h3>
       }
       ReactDOM.render(
           // 引用变量
           <div>
           {a+2}
           </div>
           <hr/>
           //变量赋给 标签的属性
           <p title={tit}>  这是一个 p标签 </p>  // 不用加双引号
       	<hr/>
       	//  h1 是一个 js 对象，不过是 jsx 语法
       	{h1} 
       	<hr/>
           {arr}   // 会逐个输出数组元素
                      
                      )
       ```

    2.  **进阶版    jsx  中使用 js**

       1. js 字符数组  转换为  可用的  jsx 数组( jsx:     js 文件中使用 HTML标签)

          1. ```js
             const arrStr = ['毛利兰','Jack',"Bob"];
             const nameArr = [];
             arrStr.forEach(item =>{
             	const temp = <h5> {item} </5>;
             	nameArr.push(temp);
             })
             ```

          2.  

             ```jsx
             //  因为 在  jsx 中， {arr} 能够数组每一项
             //  例子 1 的升级版。用 map 返回数组原理，为每一个数组 添加 标签，如下：
             ReactDOM.render(
             	<div>
             	// 如果箭头函数，右侧只有一行语句，花括号可以不写，return 也可以不用写
             	 {arrStr.map(item => <h3 key={item}> {item} </h3>)}
             	</div>
             )
             
             //  注意 在 React 中，需要把 key 添加给 被循环的直接控制的最外层元素
             //      如：{arrStr.map(item => <div  key={item}> <h3> {item} </h3> </div>)}
             //       不过 key 的值，可以自己定义，当然 独一无二  ，每一个数组元素独有的
             
             ```

          3.  在  jsx 中，给标签使用  类 样式，

             ```
             <p className= "class1" > 2312312 </p>
             因为 class 也是  js 中的关键字
             ```

          4.  jsx  中， label 中的 for 的使用                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

             ```
               <label htmlFor = "id1"> label </label>
             ```

          5. 在 jsx 中的注释

             -  ```jsx
{
               // 注释
               }
               { /*  注释  */}
               ```
       
    3. ### React 中创建组件

       1. #### **创建组件 的方式    1  **     （下列写在了  index.js 文件中）

          1. ```jsx
             //  第一种创建组件的方式
             //   组件的首字母必须大写
              function Hello(){
              	return null;
              	// 如果不想渲染任何东西， 需要返回 null
              	// 组件中必须返回 一个合法的 JSx 虚拟DOM 元素
              	
              }
              //  使用组件
              ReactDOM.render(<div> 
              <Hello>   <Hello>
                  {/* 以标签的方式 放置 render 中	*/}
              </div>,document.getElementById('app'))
             ```
       
       2. **组件传递数据**
       
         1. ```jsx
                const dog = {
                    name: 'dog'，
                    age: 3,
                    gender:'雄'
                }
                ReactDOM.render(<div>   
                        {
                            //  向组件传递数据
                        }
                  //  注意   键名 =  键值  的形式传递数据
                <Hello name={dog.name} age={dog.age} gender={dog.gender}>  </Hello>
                  </div>
                )
                        //  组件接受数据，使用 props 形参接受
                function Hello(props){  // 以对象属性的方式接受数据
                    return <div> --{props.name} ---{props.age} ---{props.gender} </div>
                }
                 //  展开运算符
                                  var arr1 = [2,3,4]
                                  var arr2 = [7,8,9,...arr1]
                                  //  ...arr1  展开 arr1 ,并在此处，添加到了  arr2
                                  //  ************   例子1 的升级   ************
                                  <Hello {...dog}>  <Hello>
              ```
       
          3. **组件抽离**  （即  将组件统一放置一个文件中）
       
             1. 在 src 目录下创建  components 文件夹，用以存放各种组件
       
             2. 在 components  文件下 创建  以  .jsx 后缀的文件，存放组件
       
             3. ```jsx
                 import React from 'react'
                          // 创建一个 react 组件的一个包，就 必须依赖 react 的包
                          // 如上的  Hello  组件
                          // 创建  Hello.jsx  文件，写入以下内容
                  export default function Hello(props){  // 声明并导出
                              return <div> --{props.name} ---{props.age} ---{props.gender} </div>
                         }
                ```
       
          4. **导入组件**  
       
             - `import Hello from  './components/Hello.jsx'`
               
             -  若未做单独配置，就文件必须使用  jsx 后缀
       
          5. **如何省略  .jsx 后缀名**
       
             1.  在 webpack.config.js 文件中，写入以下代码，且以  plugin   module 平级
                 ```jsx
                        2. 
                            reslove:{
                            	extensions:['.js','.jsx','.json']
                                // 表示这几个文件的后缀名，可以省略不写
                            }
                ```
       
          6. **建立别名**
       
             ```jsx
                       
                       resolve:{
                                   extensions:['.js', '.jsx', '.json'],
                                   alias:{   //配置 别名
                                   '@': path.join(__dirname,'./src')   
                                       // @ 符号 表示项目根目录中  src 的这一层目录
                                   }
                                
                               }
                       // 导入包时，就可以
                       // import Hello from '@/components/Hello'  
                       //  (哪里会使用Hello 组件，就在哪里导入包)
             ```
       
          2. #### **创建组件方式  2        使用 class （ES6 语法） 关键字 来创建组件** 
       
             1. **介绍  ES6   class**
       
             2. ```jsx
                class Animal{
                
                
                    // 每一个类中都有一个构造器，
                    // 如果程序员没有手动指定构造器，那么可以认为  类内部有一个  隐形的 空构造器 	   //	>>  constructor(){}
                    
                    //  构造器作用：
                    //              每当  new 该类的时候，就会优先执行  构造器的代码
                    
                    //  constructor(name,age) {
                    //      this.name = name,
                    //      this.age = age 
                    // }  相当于  VVVVV
                    // function  Aniaml(name,age) {
                    //      this.name = name,
                    //      this.age = age 
                    // }
                
                
                    constructor(name,age){
                        this.name = name,
                         this.age = age 
                    }
                }
                
                
                const a1 = new Animal("大号",3)
                  console.log(a1)
                ```
       
             3. **实例属性       静态属性**
       
                1. **实例属性**
       
                   1. 通过 new 出来的实例访问到的属性， 叫做   **实例属性**
       
                      即  构造函数中  **this 对象**  上的属性
       
                2.  **静态属性**
       
                   1. 静态属性只能由 构造函数  或 类  来访问
       
                   2.  挂载在构造函数上的属性，叫做  静态属性。如：
       
                      - ```jsx
                        //  (普通构造函数中)
                        function Person(name,age){
                            this.name = naem,
                            this.age = age
                        }
                        Person.info  = "aaa" // 这就是静态属性， 
                        const a = new Person('Jack',22)
                        console.log(Person.info)  //  aaa
                 console.log(a.info)       //   undefined
                        
                        
                        const dog = {
                                       name: 'dog'，
                                       age: 3,
                                       gender:'雄'
                                   }
                                   ReactDOM.render(<div>   
                                           {
                                               //  向组件传递数据
                                           }
                                     //  注意   键名 =  键值  的形式传递数据
                                   <Hello name={dog.name} age={dog.age} gender={dog.gender}>  </Hello>
                                     </div>
                                   )
                                           //  组件接受数据，使用 props 形参接受
                                   function Hello(props){  // 以对象属性的方式接受数据
                                       return <div> --{props.name} ---{props.age} ---{props.gender} </div>
                                   }
                        
                                   
                        ```
                        
                      - 
                      
                        ```jsx
                         
                               // 在 class 中
                               class Animal{
                         constructor(name,age){
                                       	this.name = name,
                          				this.age  = age
                                   }
                                // 静态属性, 由  static 关键字来描述
                                   static aa = "aainfo"  	// 静态属性（今后用的不多
                               	fun(){  					// 实例方法
                                }
                               	// 类的静态方法（今后用的不多
                               	static show(){
                                   }
                               }
                               console.log(Animal.info)  // 'aainfo'
                               class name(组件名称) extends React.Component{
                                    constructor(){
                                       super()
                                       this.state = {  		 	// class 组件私有数据
                                           msg:"movie插件"		// 例子而已
                                           					 	// 可读可写
                                       }
                                    }
                                   // 组件中必须要有  render 函数
                                   render(){  // 实例方法
                                           this.state.msg ="sfsfd"
                              return <div>
                                               这是一个 Movie 组件
                                            <br/ >
                                               name =  {this.props.name}
                                               <br/ >
                                               name =  {this.props.age}
                                               <br/ >
                                               name =  {this.props.gender}
                                               <br/>
                                       <h1> {this.state.msg}</h1>
                             </div>
                                           // render函数中必须要返回合法的  jsx 虚拟DOM结构
                          }
                                   }
                                 // 使用  Movie 组件
                                      ReactDOM.render(<div>   
                                       <Movie {...dog}>  </Movie>
                                       </div>,
                                       document.getElementById('claComponent')
                                   )
                                       {
                                   /*
                                             <Movie {...dog}>  </Movie>
                                 				使用 Movie 组件
                             <Movie name={dog.name} age={dog.age} gender={dog.gender}>  </Movie>
                                也可以
                                 <Movie {...dog}>  </Movie>
                                 
                                 如何将数据传递给组件，在此说明（以下是个人理解）
                           在 组件实例中，以键值对的形式传递数据，如： name = {dog.name}
                          	然后被 Component类以 thi.props.name = {dog.name}形式获取
                         	它不像  function  那样可以引入 参数，而进行接收外部的数据
                          	
                        >> 而在 funciton 构造函数，使用的是  props形参的属性 接受键名，
                        >> props 属性值 接受键值,一一对应   
                             */}     
                        ```
       
             4. **创建实例方法**
       
                - ```jsx
                  class Animal{
                      constructor(name,age){
                          this.name = name,
                          this.age  = age
                      }
                      // 静态属性, 由  static 关键字来描述
                      static aa = "aainfo"
                    //  fun 挂在了 原型对象上 >>>  实例方法
                  	fun(){
                   console.log("this is a function")
                      }
                  //  等价于   function 构造函数中的
                   //  Animal.prototype.fun(){
                   //		
                   //  }
                   }
                  ```
       
                 1. **在 class  {  }  中只能写，如下   **（ class 构造函数在内部还是  **function 构造函数** 实现
       
                    1. **构造器**
       
                       - ```js
                         class Animal{
                             // class中必须有  constructor 构造
                             constructor(name,age){
                         	this.name = name //实例属性
                         	this.age = age
                        }
                         }
                         ```
                       
                    2. **静态属性   静态方法**   
       
                       - ```jsx
                                 class Animal{
                              static info = "aaa"
                             	static show(){
                             
                             }
                             }
                         ```
       
                    3. **实例方法  **
       
                       - ```
                         class Animal{
                         	jiao(){
                         	
                         	}
                         }
                         ```
       
                    4. **类的继承**
       
                       1. ```js
                          //   在此 类的 继承 类似于  Java  的类（应该是抄袭）
                          class Person{
                              constructor(name,age){
                                  this.name = name,
                                  this.age = age
                              }
                              sayHello(){  //子类也会拥有这个实例方法
                                  console.log("Hello EveryOne")
                       }
                          }
                       class American extends Person(){  // 继承 Person
                              // 继承了父类，如果子类要写 constructor 构造函数
                              // 子类的构造函数中 第一行有效代码必须调用父类的构造函数
                              //  
                              constructor(name,age){
                                  // super()： 父类的构造函数
                                  super(name,age) 
                              }
                          }
                          
                          ```
       
       3. #### **使用 class  组件**  :heavy_check_mark:
       
          1. 最基本的结构
       
             - ```jsx
                // 如果要使用 class 定义组件，必须让自己继承 React.Component
                class name(组件名称) extends React.Component{
                     constructor(){
                        super()
                        this.state = {  // class 组件私有数据
                            msg:"movie插件" // 例子而已
                            // 可读可写
                        }
                    }
                    // 组件中必须要有  render 函数
                	render(){
                        // render函数中必须要返回合法的  jsx 虚拟DOM结构
                    }
                }
                ```
       
          2. **function 创建组件   和    class 创建组件的   区别**
             1. 使用 **class** 创建组件，有自己的数据 和 生命周期函数
       
             2. 但 **function** 创建的组件，只有 props，没有自己的数据 和 生命周期函数
       
             3. ```jsx
                class Movie extends React.Component{
                
                    constructor(){
                        super()
                        this.state = {  // 
                            msg:"movie插件"
                        }
                        // this.state 上的属性是可读可写的
                    }
                  
                    // 组件中必须要有  render 函数
                	render(){
                        this.state.msg ="sfsfd"
                        return <div>
                            这是一个 Movie 组件
                            <br/ >
                            name =  {this.props.name}
                            <br/ >
                            name =  {this.props.age}
                            <br/ >
                            name =  {this.props.gender}
                            <br/>
                    <h1> {this.state.msg}</h1>
                    </div>
                        // render函数中必须要返回合法的  jsx 虚拟DOM结构
                    }
                }
                ```
       
             4. 用   **构造函数**  创建出来的组件， 叫做   “ **无状态组件** ”  ， （**今后用的不多**）
       
             5. 用   **class**   创建的组件，叫做  “ **有状态组件** ”            （**今后会经常用到**）
       
             6. 有状态组件  和  无状态组件的 本质区别：
       
                - 有无  **state 属性**，  有无  **生命周期函数**
       
             7. **使用推荐**
       
                -  若 一个组件需要有自身的数据， 推荐使用  **class 组件**
                - 若一个组件不需要有自身的数据，推荐使用  **构造函数组件**（function创建的组件
                - **无状态组件的优势：** 运行效率会更快一点
                - **强烈推荐使用  “  有状态组件 ”** ，因为 后续可能还会添加其他功能，以备不时之需。
       
             8. 组件中 **props 和 state/data 之间的区别**
       
                - props 中的数据是外界传递过来的
                - state/data 中的数据，是组件自身私有的数据（也可能是 Ajax 获取回来的数据，）
                - props 中的数据只读，不能重新赋值
                - state / data (Vue中与其类似的属性值)