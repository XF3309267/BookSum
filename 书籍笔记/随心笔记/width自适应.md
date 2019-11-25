### width ：auto  （即 width 默认值）会出现 的四个值（有待研究 ，等待看完 《CSS世界》）

1. **fill-available**     **充分利用可用的空间**
   
   - 如： **p**  **div **  等块级元素
   
2.  **收缩与包裹**     （**包裹性**  >>>   收缩到合适）
   
   - 如： 浮动 、绝对定位、inline-block  、table  
   - 类似    **CSS3  中的   fit-content**
   
3. **收缩到最小** 

   - 当  **table-layout： auto** ，就是这种情况         
   - 类似  **CSS3  中  min-content**

4.  **超出容器限制**    >>>    **max-content**

   - 选择子元素中 最大的宽度 作为自己的 宽度值

5. ### 总结：

   1.  CSS3 中宽度自适应的四个值： fill-available  max-content  min-content fit-content
      1. 父元素：  width: max-content;  -webkit-max-content (在 safari浏览器中)
         -  从选择子集元素中宽度 最大 的那个作为 自己（父元素）的宽度；（何为 “最大” : 子集元素都尽可能展     	现最大      的宽度，然后从中挑选宽度最大的）
      2.  父元素：  width: min-content;  -webkit-min-content (在 safari浏览器中)
         -  会选择子集元素中宽度 最大 的那个作为 自己（父元素）的宽度；这里的 “最大”，和前面不一样，子集元素尽可能的缩小自己的宽度
         - width: (谷歌浏览器要加 -webkit- 就很奇怪) 
      3. 元素：   width: -webkit-fill-available; 让自身充满父元素。
         - 当然要在设置宽度值有效的情况下，如内联元素，设置宽度值无效