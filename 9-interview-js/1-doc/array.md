## 数组常用方法

- ***改变原数组的方法**

push()向数组的末尾添加新元素 return 就是这个数组的长度
pop（） 删除数组的最后一项   return 就是你删除的那个数据
unshift() 向数组首位添加新元素 return 就是数组的长度
shift() 删除数组的第一项 return 就是删除掉的那个数据
reverse() 对数组进行倒序
sort() 对数组的元素进行排序
splice()对数组进行增删改  截取数组 返回值 是一个新数组 里面就是你截取出来的数据

- ***不改变原数组的方法***

concat()用于连接两个或多个数组
join() 用指定的分隔符将数组每一项拼接为字符串
slice()按照条件查找出其中的部分元素 返回值 就是截取出来的数据 放到一个新的数组中 注意 包前不好后 包含开始索引不包含结束索引
indexOf 从左检查检测当前值在数组中第一次出现的位置索引
lastIndexOf 检测当前值在数组中最后一次出现的位置索引


- ***ES6新增的数组方法***

forEach()ES5 及以下循环遍历数组每一项
map()ES6 循环遍历数组每一项
reduce（）叠加后的效果   
filter() 过滤功能
every()判断数组中每一项都是否满足条件
some()判断数组中是否存在满足条件的项
includes()判断一个数组是否包含一个指定的值
find()返回匹配的值
findIndex()返回匹配位置的索引
fill() 方法能使用特定值填充数组中的一个或多个元素
copyWithin()用于从数组的指定位置拷贝元素到数组的另一个指定位置中
toLocaleString()、toString()将数组转换为字符串
flat()、flatMap()扁平化数组
entries() 、keys() 、values()遍历数组