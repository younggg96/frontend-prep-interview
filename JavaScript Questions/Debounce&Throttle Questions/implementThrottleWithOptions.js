// 本题目中你需要实现一个增强的throttle()，
// 使其支持第三个参数option: {leading: boolean, trailing: boolean}

// leading: 是否立即执行
// trailing: 是否在冷却后执行
// 具体说明

// 同样地按照之前的3单位的throttle来举例。

// ─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
// 用{leading: true, trailing: true}来throttle后，我们得到

// ─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G
// 如果是 {leading: false, trailing: true}，A 和 E 被跳过了

// ─ ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ G
// 如果是 {leading: true, trailing: false}，只有 A D E 被保留

// ─ A ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ E
// 如果是 {leading: false, trailing: false}，显而易见，什么都不会发生

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function throttle(func, wait, option = {leading: true, trailing: true}) {
    // your code here
  }
  