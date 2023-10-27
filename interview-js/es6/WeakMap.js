/**
 * WeakMap 只接受对象作为键名 为了保证只有通过键对象的引用才能取得值
 * 键名如果允许原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了
 * WeakMap 的键名所引用的对象是弱引用
 * 弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。
 * 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
 * weakmap对象是不可枚举的，无法获取大小
 * 使用场景
 * 1.因为WeakMap实例不会妨碍垃圾回收，所以非常适合保存关联元数据  在 DOM 对象上保存相关数据
 * 2.数据缓存
 * 3.私有属性
 */
const wm = new WeakMap();
