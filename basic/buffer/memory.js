/**
 * @MEMORY_MANAGE 
 * Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。
 *
 * slab 具有如下三种状态：
 * @full 完全分配状态
 * @partial 部分分配状态
 * @empty 没有被分配状态
 * 
 * @界限 Node.js 以 8KB 为界限来区分是小对象还是大对象  
 */

/**
 * @AIM Buffer 内存分配总结
 * 
 * @INIT 初始化8KB内存空间
 * @DISTINCTION 根据申请的内存大小分为 小 Buffer 对象 和 大 Buffer 对象
 * 小buffer 判断slab空间是否足够，够的话改变偏移量，
 * 不够的话创建新的slab空间
 * 
 * 大buffer 调用createUnsafeBuffer(size)函数
 * 
 * @垃圾回收
 * 不论是小 Buffer 对象还是大 Buffer 对象，
 * 内存分配是在 C++ 层面完成，
 * 内存管理在 JavaScript 层面，
 * 最终还是可以被 V8 的垃圾回收标记所回收
 */