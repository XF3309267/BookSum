## 					CSS  paddding

1.   **内联元素的  padding** 
   1.   **注意：  padding  不能 为   负数**
   2. 内联元素的  上下  padding ，虽然能改变  内联元素的大小，但不影响布局，不能撑大块级父元素，上下 padding  会覆盖其他相邻内容；

2.   **padding  的百分比值**

   1.   **padding 的百分比，是相对父元素的 宽度 的**（无论是 上下  padding  还是  左右 padding）
      - 如果父元素是  块级元素 ，且当他的宽度没有指定，就默认是独占一行的宽度

   2.   **定位元素  脱离文档流 不能 撑起父元素**

   3.   **实现网页  头图 比例效果**（即不管任何图片，比例始终如此）

      - ```html
        <style>
            .box{
                padding: 10% 50%;   
                position: relative;
                //  图片始终以  1 ：5  的效果呈现77
                
            }
            .box > img{
                position: absloute;
                width: 100%;
                height: 100%;
                left:0;
                top:0;
            }
            	//  父元素  虽然没有宽高；但主要是 子元素相对 父元素定位
              	//  这类子元素  依然能够识别 父元素的 真实 宽 高
                //  如上  box  实际宽度 是 padding  填充的 宽高
        </style>
        ```

   4. **插入一个 “ 幽灵元素”  讲解**

      1.  **幽灵元素只会出现在  line-box 中**

      2. **怎么会出现   “ 幽灵元素”  **

         - 如果一个  line-box 盒子中，没有文字、 没有保留的空格、

           没有 margin 、padding、border，其中有一项是 非 0 的 inline 元素

           没有 其他的  **in-flow** 内容（如：图片 、inline-block 、 inline-table元素）

           且不以保留的换行符结束

           就会被  **视作高度为  0  的  inline-box**

      3. **“ 幽灵元素”**  是什么    官方解释：  “strut”  支柱，存于每个 行框盒子  前面 
         - 不占据宽度  ， 无法用 DOM 获取

   5. **行内元素 padding 也会断行**

      - ```html
        <div style="border: 2px dashed #cd0000">
            <span style="padding:50%;background-color:gray;">
            	这里有很多字
            </span>
        </div>
        ```

        (《CSS世界》P78)

   6. **标签内置的  padding**

      1. **ol/ul**  内置  padding-left ,单位  px 

         - 造成问题：
           1. 如果 **font-size**  较小，`<li>`  元素的符号就离   文字（感觉）较远
           2. 若  **font-size**  较大，  `<li>`  元素的符号就会 跑到   **ol  或  ul  **的外面去

         - 解决方法：
           - 若字体在  12px - 14px，建议  定死  **ol  ul ** 的 `padding-left： 22px`

      2. 很多表单元素拥有内置 padding  元素：  **input    textarea    button   select   **

         -  **radio   checkbox**  没有  内置 padding

      3. **对于 button 的padding**

         1. `button{padding:0}` ；   针对  Firefox   `button:-moz-focus-inner{padding: 0}` 

   7.   **button 高度实用例子**   (我也不知道有啥子用)

   ```html
   <style>
       button{
   	position:absolute;
           clip:rect(0 0 0 0 );
       }
       label{
           display:inline-block;
           line-height:20px;
           padding:10px;
       }
   </style>
   <button id="btn">
       
   </button>
   <label for="btn">
   按钮
   </label>
   
   ```

   

   

   

   