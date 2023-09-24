# 什么是 Accessibility？
Accessibility，通常缩写为 A11Y ，这缩写取的是首字母 + 中间字母长度 + 结尾字母，译为 “可访问性”。这是一种让尽可能多的人访问我们所开发的网站的技术概念，通过这个概念，让互联网访问公平变得可能。
A11Y是一件非常正确的事，在某些国家与地区，甚至提供无障碍站点已经成为了法律的一部分。
在MDN上有这么一句话：“Web根本的目的是为了服务于所有人，而不是受限于软硬件，语言，文化，位置以及身心状态。”（原文：The Web is fundamentally designed to work for all people, whatever their hardware, software, language, culture, location, or physical or mental ability.）
Web Accessibility，译为 “网页亲和力（又称网络无障碍、网络可达性、网络可用性、网页可访问性）” 。
无论是一般人或者是身心障碍的朋友，都需要有规范的网站方可便捷地获取信息，无障碍网页则是拓展对网页的规范，以更严谨的态度及条件来设计网页，使网页内容落实“无障碍”让不同程度或需求的用户，可以顺畅的获取网站上的信息。
意思就是，即使是部分有浏览障碍的用户，也是我们在开发的时候所需要考虑的，那么我们日常需要考虑的障碍类型有哪些呢？

### 我们所应该关注的障碍类型

根据W3C所处的Web内容无障碍指南（WACG） 所提到的，主要的障碍类型有以下四类：

1. 视力障碍
2. 听力障碍
3. 行动障碍
4. 认知障碍

世界卫生组织(World Health Organization)的残疾和健康(Disability and health)状况说明书指出，“超过10亿人，约占世界人口的15%，患有某种形式的残疾”，“1.1亿至1.9亿成年人在功能上存在重大困难。”

### 视力障碍（Visual impairments）
视力障碍，是指视力下降到一定程度，导致某种程度的问题无法通过通常的手段（例如眼镜）解决。有些人还包括因无法接触眼镜或隐形眼镜而导致视力下降的人。视力障碍可能会导致人们在日常日常活动（例如驾车，阅读，社交和步行）中遇到困难。这部分的人通常会使用一些辅助的功能来阅读屏幕，例如放大镜，屏幕缩放以及屏幕阅读器。常见的屏幕阅读器有：

付费的产品：JAWS (Windows) 和 Dolphin Screen Reader (Windows)。
免费的产品：NVDA (Windows)，ChromeVox (Chrome, Windows and Mac OS X)和 Orca (Linux)。
内置的产品：VoiceOver (macOS, iPadOS, iOS)，Narrator (Microsoft Windows，ChromeVox (on Chrome OS)和 TalkBack (Android).

### 听力障碍（Hearing impairments）
听觉障碍又称听力缺损，指听觉部分或完全丧失，而耳聋人士则是指完全没有或几乎没有听力者。听力缺损可能发生在单耳或双耳，有可能是暂时或永久性质。孩童的听力问题可能影响语言学习，而对成人可能造成工作上的困难。对某些人而言，尤其是老年人口，听力缺损可能造成孤独感。
听力障碍的人可能听力水平低或甚至完全听不见声音，听力受损的人可能会使用ATs(请参阅针对患有听力、语音、言语或语言障碍的人的辅助设备)，不过在Web中并没有专门的ATs可以使用。
### 行动障碍（Mobility impairments）
行动障碍是指一个人不能使用他/她的一条或多条四肢，或缺乏行走、抓取或抬起物体的力量。轮椅、拐杖或助行器的使用可用于辅助行动。活动能力障碍可能由多种因素引起，如疾病、事故或先天性疾病，也可能是神经肌肉和骨科损伤所致。
声控轮椅是提高行动障碍人士生活质量最重要的发明之一。声控轮椅最初发明于1977年。
缺少手臂或者手指的障碍人士会严重影响使用键盘与鼠标，但是在近些年，语音识别设备跟软件都有了极大的发展，也为这部分障碍人士提供了不少的便利。
认知障碍（Cognitive impairments）
认知障碍是一种范围广泛的残疾类型，从能力最有限的智障人士到我们随着年龄增长和思考和记忆困难而出现的所有人。 该范围包括患有精神疾病的人，例如抑郁症和精神分裂症。 它还包括有学习障碍的人，例如阅读障碍和注意力缺陷多动障碍。 重要的是，尽管认知障碍的临床定义存在很多差异，但与之相关的人们会遇到一系列常见的功能问题。 其中包括难以理解内容，记住如何完成任务以及因网页布局不一致而引起的混乱。
另外提一点，就是癫痫患者也属于我们认知障碍者的范畴，我们在开发的时候，这部分人士也是我们需要考虑的。
在MDN上有为了认知障碍者总结的开发守则：

用多种方式展示内容，例如通过文本，语音或视频；
编写易于理解的内容，例如少用方言或者颜文字；
重要的内容要细心写；
尽量减少干扰，例如一些没什么用的功能与广告；
网页布局与导航要一致；
常规的元素样式，例如带下划线的链接（未访问时为蓝色）和访问时为紫色；
流程交互要具有进度以及步骤指示；
用户权限认证方式要简单；
错误信息要展示清楚；
表单要便于填写与操作。


# WAI-ARIA

Web Accessibility Initiative –可访问的富Internet应用程序（WAI-ARIA）是由万维网联盟（W3C）发布的一项技术规范，该规范指定了如何增加网页的可访问性，尤其是动态内容以及使用该工具开发的用户界面组件。 Ajax，HTML，JavaScript和相关技术。

## 前言
WAI-ARIA是A11Y应用规范，主要就是针对于上述的障碍类型以及WCAG要求的技术细则，运用好这些技术细则，那么浏览障碍人士便能轻松访问我们的应用。
在本文，我们讨论下前端里的WAI-ARIA规范，以下是规范里的三个主要特征：

### 角色（Roles）

WAI-ARIA角色是使用role属性在元素上设置的，类似于role属性[role]中定义的role属性。

例子如下：
```<li role="menuitem">Open file…</li>```


#### role 可选属性有点多，但其实主要就分了四类：

- 抽象角色（Abstract Roles）
- 小部件角色（Widget Roles）
- 文件结构角色（Document Structure Roles）
- 地标角色（Landmark Roles）

#### 其主要作用为：
角色信息描述。
相关角色的等级信息。
角色上下文。
引用其他规范中的相关概念。

使用OWL（Web Ontology Language）提供允许语义继承的类型层次结构。
每个角色支持的状态和属性。

### 状态与属性（States and Properties）
WAI-ARIA提供了可访问性状态和属性的集合，这些状态和属性用于支持各种操作系统平台上的平台可访问性API。辅助技术可以通过公共的用户代理应用（例如读屏软件）DOM或通过映射到平台可访问性API来访问这些信息。当与角色结合时，用户代理应用可以为辅助技术提供用户界面信息，以便随时传递给用户。状态或属性的更改将导致向辅助技术发出通知，这可能会警告用户发生了更改。
我们来看个例子：

```<li role="menuitemcheckbox" aria-checked="true">Sort by Last Modified</li>```

上面的例子里，使用了一个```<li>```来创建一个可点击的菜单，通过JS的事件来改变aria-checked，从而让用户代理应用理解这部分的功能作用。
由于这部分是用户主动进行的操作，并非默认状态，所以为了更佳的体验，我们可以对aria-checked="true"时li进行样式处理，如下：

```
[aria-checked="true"] { font-weight: bold; }
[aria-checked="true"]:before { background-image: url(checked.gif); }
```

#### WAI-ARIA状态与属性分类如下：

- 小部件属性

aria-autocomplete
aria-checked (state)
aria-disabled (state)
aria-expanded (state)
aria-haspopup
aria-hidden (state)
aria-invalid (state)
aria-label
aria-level
aria-multiline
aria-multiselectable
aria-orientation
aria-pressed (state)
aria-readonly
aria-required
aria-selected (state)
aria-sort
aria-valuemax
aria-valuemin
aria-valuenow
aria-valuetext


- 实时区域属性

aria-atomic
aria-busy (state)
aria-live
aria-relevant


- 拖放属性

aria-dropeffect
aria-grabbed (state)


- 关系属性

aria-activedescendant
aria-controls
aria-describedby
aria-flowto
aria-labelledby
aria-owns
aria-posinset
aria-setsize



### 焦点管理（Managing Focus）
WAI-ARIA里提倡，所有的用户交互对象都应该是可聚焦的，就是键盘可选中的。
当我们使用标准的HTML标签以及WAI-ARIA小部件时，开发者应该按顺序创建键盘可访问的节点，例如Tabs键，方向键等。
开发者应该对以下的容器角色进行焦点管理：

combobox
grid
listbox
menu
menubar
radiogroup
tree
treegrid
tablist

焦点管理这部分内容其实一个更加感性的内容，很多时候我们得依赖我们的业务逻辑以及技术选型。
例如在如今很常见的单页面应用里，当我们进行路由切换，或者通过AJAX进行内容更改的时候，对于视力正常的人来说，我们很容易就会知道了，但是如果是依赖读屏软件的失明人士，可能会不知所措，我明明是点击了下一页，怎么内容不知道读到哪里去了？
例如这样：

```
<nav>
  <a href="/">Home</a>
  <a href="/goods">goods</a>
  <a href="/user">user</a>
</nav>
<main>
    <Link />
</main>
```

但是如果我们加上切换路由或者进行数据交互时重置焦点的功能，那么对读屏软件来说，便可以重头开始读，对失明人士来说便不会感觉到突兀：
```
<nav>
  <a href="/">Home</a>
  <a href="/goods">goods</a>
  <a href="/user">user</a>
</nav>
<main>
    <h1 tabindex="-1">鱼头家的商城</h1>
    <Link />
</main>
<script>
    function routerChange() {
        const heading = document.querySelector('h1')
        heading.focus()
        document.title = heading.textContent
    }
</script>
```

## 常见属性

#### aria-label 给元素设置一段描述性的文字，可以由屏幕阅读器读出，它内部的文字将被忽略

```
<div aria-label="HullQin的自我介绍">
你好，我是HullQin。
</div>
```

上方这个div被选中时，屏幕阅读器会播报「HullQin的自我介绍」，而不会播报「你好，我是HullQin」

#### role="button", 将元素标记为按钮。
```
<div role="button" onclick="alert(123)">
哈哈
</div>
```
上方这个div被选中时，屏幕阅读器会播报「哈哈，按钮」。但是没有role这个属性时，只会播报「哈哈」，视障用户并不知道它可以被点击。

## 尽量使用Html5语义化标签
在body中正确使用这些标签： 
```
<header>，<footer>，<article>，<section>，<p>，
<div>，<span>，<img>，<aside>，<audio>，<canvas>，
<datalist>，<details>，<embed>，<nav>，<output>，
<progress>，<video>
```
 等等。
经典误区：给div设置onclick事件。
有时候为了方便，你可能直接把div当作button了，并绑定了onclick事件。这是不对的，无障碍软件可能无法识别到它是有点击事件的，就不会播报出来。
建议点击事件尽量只绑定在```<a>```或```<button>```这种原生clickable的元素上，而不是```<div>```上。

## 隐藏无意义元素

如果是无用元素（如不影响业务流程的logo、图片），在最内层的Dom结点设置aria-hidden="true"，或在一组无用元素的容器结点设置aria-hidden="true"。

那么这些元素永远不会被激活（选中）了。

## 打包(合并)密集内容
针对密集的文字内容，需要打包阅读。什么意思呢？

```
<div>
<div>名称：</div>
<div>HullQin</div>
</div>
```

这段话会被拆分为2个元素，「名称」和「HullQin」分别可以被选中和播报。这对视障群体并不友好，因为焦点多、密集，明明是同一块内容，却分散到2个焦点上，这不方便他们摸索整个页面。
他们期望的结果是「名称：HullQin」，通过这样打包阅读，就把Key、Value绑定起来了，也减少了焦点数量。
打包阅读，有以下几种方案：

方案优点缺点【推荐】父结点设置aria-label，值为所有子结点内容拼接的字符串，子结点设置aria-hidden="true"兼容性最好维护成本高（若子结点需要动态改变，父结点的aria-label也需要随之改变）【推荐】父结点设置aria-labelledby，值为所有子结点的id（用空格拼接），子结点设置aria-hidden="true"，注意使用该方法，每个子结点都需要设置id维护成本低（若子结点需要动态改变，父结点无需变化）存在兼容性问题，低版本屏幕阅读器会忽略aria-labelledby或aria-describedby。【不推荐】父结点设置role="option"方式最简单option表明这是个select下拉框的选项，读屏软件会错误理解该控件的作用，部分安卓机会播报“单指双击即可执行”。

## 管理焦点
如果需要主动管理焦点（例如页面初始焦点放在大标题上、弹窗打开时切换焦点至弹窗标题、弹窗关闭时恢复之前的焦点位置），需要通过element.focus()方法来控制焦点，但只有```<button>、<a>```这种可交互结点才会被focus成功，```<div>```这种纯展示结点不会被focus，需要设置tabindex="-1"（不要设置为非负整数，非负整数会允许键盘通过tab激活该焦点），再设置样式outline:0（因为浏览器默认样式在结点focus时会有边框，样式选择器是:focus-visible）。
注意事项：设置tabindex="-1"后，部分安卓手机会播报“单指双击即可执行”。

## 弹窗
需要给弹窗容器设置```aria-modal="true"```和```role="dialog"```。

## 结点动态变更
例如按钮状态可能会在js中变为disabled，注意最好直接用原生的disabled属性，否则，你还需要手动设置aria-disabled为true


# outline
https://juejin.cn/post/7216227563012833337

Interactive elements

HTML offers a selection of elements which help to create interactive user interface objects.

detail dialog summary

```
<p>有outline</p>
<details>
    <summary>直接通过键盘展开！</summary>
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
</details>
<p>无outline</p>
<details class="outline-none">
    <summary>直接通过键盘展开！</summary>
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
</details>

<p>有outline</p>
<a href="#">我是有 outline 的 a 标签</a> 
<p>无outline</p>
<div class="outline-none">
  <a href="#">我是没有 outline 的 a 标签</p> 
</div>
```

如果仅使用键盘浏览的话，可交互标签有 outline 用户才能知道自己当前操作到哪个位置了。

# :focuse-visible

:focuse-visible 是完全由浏览器决定是否需要展示突出样式的。也就是说，它区别于 :focus 最重要的一点就是，:focus 是匹配所有元素的聚焦状态， 而它 由浏览器来判断 是否需要展示聚焦状态
```
// html
<p>1. 点击也会有 outline</p>
<details class="focus">
    <summary>直接通过键盘展开！</summary>
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
</details>
<p>2. 点击没有 outline</p>
<details class="focus-visible">
    <summary>直接通过键盘展开！</summary>
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
    <p>这里是具体的展开内容。</p> 
</details>

// css
.focus summary:focus {
  outline: 2px solid blueviolet;
}

.focus-visible summary:focus-visible {
  outline: 2px solid blueviolet;
}
```

我们可以发现，:focus 的样式在鼠标点击的时候也会触发（但在鼠标交互的时候我们并不需要凸显 outline），而 :focuse-visible 的样式仅仅在键盘操作的时候才会触发。这个时候这个伪类对我们来说就很有用了，因为大部分时候我们不需要在网站内容跟鼠标交互中去凸显元素的 outline。
总结一下，我们可以简单的认为：:focus 在鼠标、键盘的操作下都会触发，:focuse-visible 仅仅在键盘操作的时候触发。但其实，最终决定是否为 :focuse-visible 状态的主要还是浏览器。

# Button

当我们点击完按钮后，按钮一直保持着 :focus 的状态，直到我们下一次操作鼠标、键盘的时候 :focus 的状态才消失。而这一点就很好的说明了，这是浏览器自己的行为，跟组件库无关，这是一个正常的交互。
那既然明确了这是一个正常的交互，我们一起探讨一下为什么要这样设计呢？答案很明显，就是 a11y。因为我们无法确保我们的用户都是通过鼠标来访问的。
假设现在有这么一个场景，一个长页面有好多个按钮，每个按钮点击完都会有一个表单弹窗，用户需要填写这些表单。我们可以通过 button 的 focus 状态来快速恢复当前的阅读上下文。

通过 focus 状态，我们可以操作完 button1，通过 TAB 再操作 button2。假设 button 点击后没有 focus 状态，我们填写完弹窗再回到页面就无法恢复到当前的上下文环境了，就需要从 button1 开始，一个一个地按 TAB ...
