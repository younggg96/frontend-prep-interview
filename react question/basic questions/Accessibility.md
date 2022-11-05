## 无障碍辅助功能
为什么我们需要无障碍辅助功能？
网络无障碍辅助功能（Accessibility，也被称为 a11y，因为以 A 开头，以 Y 结尾，中间一共 11 个字母）是一种可以帮助所有人获得服务的设计和创造。无障碍辅助功能是使得辅助技术正确解读网页的必要条件。

React 对于创建可访问网站有着全面的支持，而这通常是通过标准 HTML 技术实现的。

## 语义化的 HTML
语义化的 HTML 是无障碍辅助功能网络应用的基础。 利用多种 HTML 元素来强化您网站中的信息通常可以使您直接获得无障碍辅助功能。

MDN 的 HTML 元素参照（MDN HTML elements reference）
有时，语义化的 HTML 会被破坏。比如当在 JSX 中使用 <div> 元素来实现 React 代码功能的时候，又或是在使用列表（<ol>， <ul> 和 <dl>）和 HTML <table> 时。 在这种情况下，我们应该使用 React Fragments 来组合各个组件。

## 无障碍表单
### 标记
所有的 HTML 表单控制，例如 <input> 和 <textarea> ，都需要被标注来实现无障碍辅助功能。我们需要提供屏幕朗读器以解释性标注。

以下资源向我们展示了如何写标注：

W3C 向我们展示如何标注元素
WebAIM 向我们展示如何标注元素
Paciello Group 解释什么是无障碍名称
尽管这些标准 HTML 实践可以被直接用在 React 中，请注意 for 在 JSX 中应该被写作 htmlFor：

```
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```