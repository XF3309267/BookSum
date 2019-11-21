# 					JS数组

## 1. 创建数组

- 使用  **Array 构造函数** 创建数组

  - let arr = new Array()`    等价于    `let arr = Array()` 

  - 指定有初始数组长度的数组    `let arr =  Array(3)`  （一个初始长度为 3  的数组）

  - 指定有初始值的数组                `let  arr = Array("a","b")`
  - **注意： 当你使用  上述    指定有初始值的数组   创建一个  只含有一个   数值的数组时，会与   指定数组长度混淆，请不要这样做**

- 使用  **数组字面量**  创建数组 
  - let  arr = ["a","b",1]

- `let  a = Array(3)`   与  `let b = [undefined,undefined,undefined]`  的区别
  -  两者读取元素值时  都为  undefined，a 是 长度为  3 的空数组，b 是三个成员都是  undefiend 的数组
  -  在各自的三个元素中，  a  的键位是空的  、  b  的键位是存在的  >>>  在使用for-in循环时，b能循环 3 次

- 两者创建数组的区别：

  - 使用  Array  构造函数
    - 使用  有指定初始值的方式  创建数组时， `Array(3,,4)`  逗号  与 逗号  之间不能没有元素，不然会报错
    - 最后一个逗号后面可以不接 元素值，即  `Array(3,4,)`  数组长度为  2 

  -  使用 数组字面量
    - 逗号之间可以没有元素，如 ` b = [, , , ]` ，数组长度为  3 

-  **注意： 当访问数组越界时， 返回的依然是**   `undefined`

## 2 . 检测 是否为数组

-  `Array.isArray( value )`
- 注意：  使用  `typeof  arr`   返回  Object （typeof  **只返回**   number  string boolean  undefined  function object；）
- **对于尚未   声明的变量  只能执行一项操作，即使用  typeof  检测其类型**，且会返回  **undefined**

## 3 .  数组字符串化

-  `toString()`  				返回数组的 字符串形式，且以  **逗号** 分隔元素

- `arr.join( value )`     value  不管是什么值，他都会隐式的使用  **toString()** 方法，然后对数组进行 字符串化

  - 数组的  join 方法也可用于字符串 或 类似数组的对象

    - ```js
      Array.prototype.join('hello','-');
      var obj = {0:'a',1:'b',length:2};
      Array.prototype.join.call(obj,'-');
      //  有待考究  
      ```

      

- `arr.valueOf()`              返回数组本身

## 4.  数组的 增删改查

1.  **push ()**    **pop()**    **>>>>>>>        增  删  数组     <<<<<<<<<**

   - **push()**   推入一个 或 多个 元素进数组（即 添加元素至末尾）
   - **pop()**     删除数组的最后一个元素，并返回该元素 ；（**若数组为空  pop()  返回   undefined，删除一个  空元素  故  会返回  undefined**）
   - 两者结合实现   **栈**   >>>>   "**后进先出**"

2.  **shift()**   **unshift**    **>>>>>>>        增  删  数组     <<<<<<<<<**

   - **shift()**   删除数组第一个元素，并返回该元素

   - **shift()**   可用于清空数组（好像没有多大意义）

     ```js
     var list = [1,2,3,4];
     var item;
     while(item = list.shift()){
         consol.log(item);
     }
     ```

   - **unshift()**   将一个 或 多个元素 添加到 目标数组的头部
   
   - **shift()  **  与   **push()**  结合实现  **队列** >>>>>>   **先进先出**

3. **concat()    合并数组,返回新数组**

   - 将参数添加至数组末尾   `['hello'].conat(['world'])`  、 

     `['hello'].concat(['world'],['!'])`

   - 参数也可以是其他类型的值
     
   - `[1,2].concat(3,4,5)` 
     
   -  **concat()**  也可实现数组的复制，如 `let newArr = [1,2].concat()`

     - 但使用  **concat()**  的复制数组   与  普通的数组赋值变量 不同

       1. **普通的数组赋值**：  只是  **浅拷贝**  

          ```js
          let a = [1,2,3];
          let b = a;
          b[0] = 0;
          console.log(a[0]);  //  0
          console.log(b[0]);  //  0
          // 像这种  b 变 ，a 也变的这种，就称为  浅拷贝
          // 在此稍微 讲一下
          // 引用数据类型：  名 存在栈中 ；  值 存在 堆内存中
          ```

          ![](C:\Users\Lenovo\Desktop\js数组\NA15%R_2[F$FHUHQJ5T~AL5.png)

       2.  **concat()**  复制数组

          ```js
          
          let a = [1,2,3];
          let b = a.concat();
          b[0] = 0;
          console.log(a[0]);  //  1
          console.log(b[0]);  //  0
          
          // 关于 深拷贝 、 浅拷贝 >>>  https://www.cnblogs.com/echolun/p/7889848.html 
          // 但是 concat() 并不是真正的  深拷贝
          // 当 a 数组元素中含有 引用数据类型的值时，b 改变该值  a 还是会跟着变化；例子如下：
           		let arra = [1, [20, 21], 3];
                  let arrb = arra.concat();
                  console.log("arrb = " + arrb);   // 1,20,21,3
                  arrb[1][0] = 200;
                  console.log("after");
                  console.log("arra ", arra);   	// 1,200,21,3
          	 	console.log("arrb ", arrb);	   	// 1,200,21,3
          ```

4.   **reverse()**  颠倒数组

- `arr.reverse()`     使得原数组改变
  
5.    **slice()**     提取数组  返回一个 **操作后的新数组**

   - **提取数组**   `arr.slice(start,end)`

     - 如：   `a=[1,2,3]`   `  let b = a.slice(1,2)`  返回 含有一个元素的数组   `[2]`(取头 不取尾)

     - 若 没有  **end** ，则会从  **start**  一直取尽最后一个元素值

     - 若 start  或   end  有值 为负数；  -1 表示倒数第一个元素

     - 若 start 值大于等于数组长度  或  第一个参数的值 大于第二个参数的值（位置的大小），则都返回 **空数组**

     - **slice()**  方法的重要应用（????）,将类似数组的对象转为真正的数组

       - ```js
         let a =  Array.prototype.slice.call({0:'a',1:'b',length:2}) ;
         //a >>>>  ['a','b']
         // 表示内心毫无波浪，到底会用在啥地方？？？？？？？
         ```

         

6.  **splice()**    删除数组元素 、 插入数组元素    **会改变数组**    `arr.splice(start,count,addElement,addElement2,......)`  删除的起始位置（插入的位置）、          删除个数、插入元素。

   - 若 start 为 负数，-1 表示倒数第一个元素

   - ```js
     // 不多讲，看例子：
     let a = ['a','b','c','d','e','f'];
     a.splice(4,2,1,2);		// ['e','f']
     console.log(a);			// ['a','b','c','d',1,2]
     // 最有意思的是，当该方法只有一个参数时，就可以将数组拆分为  两个数组；
     let aa = [1,2,3,4];
     let bb = aa.splice(2); // aa = [1,2]     bb =[3,4]
     ```

7.  **sort()**  数组排序， 可有一个参数（参数为一个方法）   **数组发生改变** 

   - **对 数值数组排序**

     - 因为 sort 会将数组元素转换为 字符串的形式，按照字符编码排序

     - 所以对 **数值数组排序**  要使用参数进行数组排序，如：

       - ```js
         [10111,1101,111].sort(function(a,b){
             return a-b;
             //  返回值为负数，则表示顺序不发生改变
             //  返回值为正数，则表示 交换顺序
             //  a 是啥，b 是啥。整个排序的机制是怎么样的，都有待去考究
         })
         ```

     -  也可以对  对象数组中的  数值属性进行排序，如下

     - ```js
       let arr = [
           {name:"jack",age:30},
           {name:"bob",age:24},
           {name:"maryy",age:28}
                 ];
       arr.sort(function(o1,o2){
           return o1.age - o2.age;
       })
       ```

8. **map()**   对数组每一项进行操作，将**每一次的执行的结果返回**并组成一个新的数组，不改变原数组

   -  **map()**   可接受两个参数，第一个参数： 一个函数对数组每一项进行操作，第二个参数绑定 this 变量

   - 而对于第一个参数（一个方法），可接受 三个参数 

     -  

       ```js
       // 例子一
       [1,2,3].map(function(ele,index,arr){
           // 第一个参数： 元素的值
           // 第二个参数： 元素的索引
           // 第三个参数： 数组本身
           return ele*index;
       });
       // 例子二
        let arra = ['a', 'b', 'c'];
        let arrb = [1, 2].map(function(e) {
        	return this[e];
        }, arra);  
       //  改变了  this 的指向
       //  但 map 没有第二个参数的时候， this 会指向 window全局
       console.log(arrb);  // ['b','c']
       ```

   - 当 **map()**  执行时，数组元素中含有空值时

   - ```js
     let i =0;
     let f = function(e){
         // console.log(i);   *********
         return 'a'
     }
     
     [1,undefined,2].map(f);  //  ['a','a','a']
     [1,null,2].map(f); 		 //  ['a','a','a']
     [1,,2].map(f);  //  ['a',,'a'];  在谷歌浏览器中返回   ['a',empty,'a']
     //**********                重点            **********************
     // 对于最后一种特殊的数组，方法 f 都只会执行两次。但是 返回的数组长度 依然是  3
     //****************************************************************
     //  对于  ****注释那句语句  不同浏览器表现不一致
     // 不是所有浏览器都可以在  f方法 中引入其他变量的，对于 IE 就不行，chrome 可以
     ```

9. **forEach()**  

   -  **forEach()**  与 **map()**  基本上一样

     -  **forEach()**   只是 **参照数组元素** 进行一些其他的操作

     -  可接受两个参数，第一个参数是方法，第二个参数是 改变方法中的 **this** 指向

     - ```js
       let out = [];
       [1,2,3].forEach(function(ele){
           this.push(ele*ele);
       },out);
        // out  >>   [1,4,9]
       ```

   - **forEfach()**  方法 对于  **特殊的数组**   操作也会像之前写的 **map()**  方法一样，
     -  对于  `[1,,2].forEach(f)`   只会执行两次操作
     - `[1,null,3].forEach(f)`   执行 3 次（ 对 1  、 null 、3   ）

   - **forEach()**  的特殊
     
   - 在 **forEach()**  中的方法中 使用  **return**  无效，其不会返回任何值
     
   -  实现用    **forEach()**  返回一个新数组

     ```js
     //  其实不是返回一个新数组,只是在每一次操作中，对其他数组进行 push
     let out = [];  //将变量初始化为  数组很重要，因为在方法中才可以使用  push 方法进行增添元素
     let  oldArr = [1,2,3];
     oldArr.forEach(function(ele){
         out.push(ele);
         //  也可以使用：    this.push(ele);     this.push(ele)  还是挺骚的 
         //	不过  forEach 的第二个参数就要为  out
     })
     ```

10.    **filter()**   过滤数组，返回 boolean 类型的值

    1. 和    **map()**   差不多； **filter()**  对数组每一项进行操作的时候；只会返回 原元素（即原来数组中的元素，没有进行过加工），而是否返回，取决于在对该项元素进行操作时，是否返回的是  true。（会在方法中写入限制条件）

    2. 和   **map()**  一样，可以接受两个个参数，第一个：过滤方法，function(ele,index,arr)； 第二个： 改变  this  指向

    3. ```js
       let arr = [1,2,3,4,5].filter(function(ele,index,arr){
           return index % 2===0;
       });
       //  arr  >>>  [1,3,5]
       
         		let obj = 3;
               let myFilter = function(item) {
                   if (item > this) {
                       return true;
                   }
               };
               let arrt = [2, 8, 3, 4, 1, 3, 2, 9];
               let newArrt = arrt.filter(myFilter, obj);
               console.log(newArrt);  // [8,4,9]
       ```

    4.  **map()   与  filter()   的区别**
       - **map() **  不管你是否会在第一个参数（即方法）中写返回值，新数组的  数组长度已经定了，就是执行 **map()**  的那个数组的长度。如：`let arr2 = arr1.map( function(ele){  } )` arr2的数组长度和 arr1 一样；若没有返回值，新数组对应的位置上会为  **undefined** ；当然**不可以**在方法中改变原数组的长度，来实现减少次数
       - 而 **filter()**  数组过滤方法，这个词很恰当，只对元素进行筛选，而不进行加工
       - **特殊数组** ，如 `[1,,3,4,5].filter(function(ele,index,arr){ })`  效果和 **map()**  返回结果一样，可依据上面进行自我总结；

11.  **some()  ,   every()** 

    - **some()**  、 **every()**  两者和 **map()**  一样，可接受两个参数：方法 和 改变 this 指向的值

    - 两个方法只会返回 true 或者 false

      - **some()**     **用途：只要数组中有符合的条件的元素就会返回  true**，且停止 对数组元素操作

      - ```js
        let arr = [1,2,3,4];
        let result = arr.some(function(ele,index,arr){
            return ele >=3;
            // 当返回 true 时，就不会对后面的元素进行操作
            // 当没有返回 true时，就会继续对后面的元素进行判断
        });true
        // result  >>>  true
        ```

      - **every( )**    **用途：只要数组中有未符合条件的元素就会返回  false**，且停止 对数组元素操作

      - ```js
        let arr = [1,2,3,4];
        let result = arr.every(function(ele,index,arr){
            return ele >=3;
            // 会对每一项进行判断；只要 返回了 false 就会停止对数组的操作
        });
        // result  >>>  true
        ```

    - 两者对于 特殊数组的反应
      - 对于   `arr = [1,,3,4]`  ,两者都会跳过  空元素，直到达到各自的条件
      - 对于    `arr = []`  **some()**  会返回 false，且不会执行 function 中的语句，**every()**  会返回 true，且不会执行 function 中的语句

12. **indexOf()    lastIndexOf()**       查找值，返回给定值的索引，不存在返回  -1

    - **indexOf()**  例子：`let index = ['a','b','c'].indexOf('b')`   返回查找该值第一次出现的位置
    - **indexOf()**  接受第二个参数：搜索起点。如： ` let index = ['a','b','c'].indexOf('b'，1)`  
    - **lastIndexOf()**  例子：`let index = ['a','b','c'].indexOf('b')`   返回查找该值最后一次出现的位置
    - 两者不能用以搜索  NaN 在数组中的位置
      - 如：`[NaN].indexOf(NaN) //-1 `  **lastIndexOf()**  也会返回  NaN

    -  **两者的匹配规则是使用   ===   全等  来进行匹配**，所以在进行匹配时，应注意到这一点（对于 引用类型加关注

### 数组操作方式总结：

1. 有些方法返回的依然是数组，就可以链式使用

   ```js
   var users = [
     {name: 'tom', email: 'tom@example.com'},
     {name: 'peter', email: 'peter@example.com'}
   ];
   
   users
   .map(function (user) {
     return user.email;
   })
   .filter(function (email) {
     return /^t/.test(email);
   })
   .forEach(console.log);
   // "tom@example.com"
   ```

2.  对于那种  对原数组发生改变的方法，返回的要么是 操作后的数组，要么是删除的元素
3.  附上大佬的博客： http://javascript.ruanyifeng.com/stdlib/array.html

## 后续： 对于         ES5   ES6    ES7  中的数组一系列，都有待继续深究













