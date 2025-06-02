1. 你在将 Vue 2 重构为 Next.js/React.js 的过程中遇到了哪些技术挑战？是如何解决的？

EN Answer:
One major challenge was aligning legacy Vue 2 features with React’s component model. Vue’s reliance on two-way binding, scoped slots, and global mixins didn’t translate directly to React’s functional paradigm. I addressed this by breaking down components into reusable functions using useState, useEffect, and custom hooks. I also introduced a consistent state management strategy using Context and Zustand.
Another challenge was replicating Vue Router behavior using Next.js’s file-based routing. I ensured dynamic routes and nested layouts worked properly by restructuring page directories and leveraging Next.js middleware. This allowed us to preserve UX while adopting React best practices.

中文翻译：
一个主要的挑战是在技术迁移中将 Vue 2 的特性对齐到 React 的组件模型。Vue 中的双向绑定、作用域插槽和全局 mixin 无法直接映射到 React 的函数式编程范式。我通过使用 useState、useEffect 和自定义 hook 将组件拆分为可复用的逻辑函数，并引入了 Context 和 Zustand 统一状态管理。
另一个挑战是将 Vue Router 的行为迁移到 Next.js 的文件式路由系统。我通过调整页面目录结构、使用动态路由和中间件，成功复现了嵌套路由与用户体验，且符合 React 的最佳实践。

⸻

2. SSR 和 SSG 分别是如何使用的？为什么选择这样的架构组合？

EN Answer:
We used SSR (Server-Side Rendering) for pages that required up-to-date content and SEO sensitivity, such as product detail, search results, and checkout. This ensured fast initial load times and indexability by search engines.
SSG (Static Site Generation) was applied to relatively static content such as category pages and documentation, which we pre-rendered at build time and cached via CDN.
This hybrid approach optimized both performance and scalability—SSR offered freshness and SEO benefits, while SSG ensured minimal latency and server load.

中文翻译：
我们对需要实时数据和 SEO 敏感度高的页面（如产品详情页、搜索页、结账页）使用了 SSR（服务器端渲染），以确保页面加载速度和被搜索引擎索引的能力。
对于内容较为稳定的页面（如分类页、文档页），我们使用了 SSG（静态页面生成），在构建时预渲染，并通过 CDN 缓存，提高访问速度。
这种 SSR + SSG 的混合架构兼顾了实时性与性能，同时也具备良好的可扩展性。

⸻

3. GTmetrix 和 Lighthouse 的优化结果令人印象深刻，你具体做了哪些优化手段？如何验证效果？

EN Answer:
We improved performance through route-level code splitting using dynamic import(), reducing initial JavaScript payload. We used next/image for optimized image delivery with lazy loading and automatic resizing. Fonts were loaded asynchronously with font-display: swap.
Tailwind JIT mode helped us purge unused CSS, significantly reducing bundle size. We also minimized third-party scripts and deferred non-critical assets.
To validate results, we monitored GTmetrix (LCP dropped from 3.1s to 1.2s, total page size down 85%) and Lighthouse scores (SEO from 67 to 100). Real user monitoring via GA4 and Sentry confirmed improved interactivity and reduced error rates.

中文翻译：
我们通过使用动态 import() 实现了路由级代码分割，显著减少了初始 JavaScript 体积。使用 next/image 提供优化后的图像，支持懒加载和自动缩放，字体加载采用 font-display: swap 异步方式。
借助 Tailwind 的 JIT 模式清除未使用的 CSS，大大缩小了样式体积，同时还精简了第三方脚本并延迟加载非核心资源。
效果验证方面，我们使用 GTmetrix 监测性能（LCP 从 3.1 秒降至 1.2 秒，页面体积减少 85%），Lighthouse SEO 分数也从 67 提升到 100。同时，通过 GA4 和 Sentry 实时监控用户体验与错误率，验证了交互体验的提升。

⸻

4. 你提到实现了 hydration 优化、懒加载、路由级代码分割，可以详细讲讲它们的实现方式吗？

EN Answer:
For hydration optimization, we used next/dynamic with { ssr: false } to defer non-essential components on the client side, such as modals or analytics widgets. This avoided unnecessary rehydration during initial render.
Lazy loading was implemented using dynamic imports and intersection observers for components below the fold.
For route-level code splitting, we leveraged Next.js’s automatic code splitting, ensuring that each route only loads its necessary modules. This significantly improved TTI (Time to Interactive), especially on mobile.

中文翻译：
在 hydration 优化方面，我们使用 next/dynamic 并设置 { ssr: false } 来延迟加载如弹窗、分析工具等非核心组件，从而避免在初次渲染时进行无效的 hydration。
懒加载通过动态导入和 Intersection Observer API 实现，对视口外的组件进行延迟加载。
路由级代码拆分得益于 Next.js 的自动拆包机制，每个路由只加载所需模块，从而显著提升 TTI（首次可交互时间），尤其在移动端表现尤为明显。