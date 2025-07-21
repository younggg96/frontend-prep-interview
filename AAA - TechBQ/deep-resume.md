## 1. What are the trade-offs between SSR and SSG in a Next.js application?
In my experience, the main trade-off between SSR and SSG comes down to performance vs. flexibility.

SSG is great for performance and SEO when the content is mostly static — pages are prebuilt at build time, which results in fast load times and excellent caching. However, it doesn’t scale well with high-volume or frequently changing data.

SSR, on the other hand, allows for dynamic rendering at request time. It’s more flexible and better fit for frequently updated content for especily for ecommerce webpage, but it needs high prefermance server, and requires server infrastructure to scale.

In my project, I used a hybrid strategy — leveraging SSG for marketing pages and SSR for product detail and user-specific pages. This gave us the best balance of performance, SEO.

## 2. How did you optimize the LCP and fully loaded time in your project?
We focused on three key areas to improve LCP and fully loaded time:

Image optimization: We migrated to next/image for automatic lazy loading and responsive images, reducing image load time.

Font loading: We switched to font-display: swap and self-hosted fonts to avoid render-blocking.

Code splitting and lazy loading: We implemented route-based and component-level lazy loading, so only critical components were rendered initially.
de
As a result, our LCP decreased from 3.1s to 1.2s, and the fully loaded time decreased from 8.4s to 1.3s. We also reduced the page size by 85% and HTTP requests by 60%, significantly improving web app performance.

| 方法                      | 说明                               |
| ----------------------- | -------------------------------- |
| ✅ 使用 `next/image` 组件    | 自动优化图片尺寸、格式和懒加载，减少图片加载时间         |
| ✅ Critical CSS / 优先渲染内容 | 确保首屏关键内容先加载（例如主标题和 Banner）       |
| ✅ 减少 render-blocking    | 推迟加载非关键的 JS 和 CSS                |
| ✅ 使用 CDN                | 静态资源靠近用户，加快传输速度                  |
| ✅ Web font 优化           | 设置 `font-display: swap` 避免字体阻塞渲染 |


## 3. What does hydration mean in Next.js and how did you optimize it?
Hydration in Next.js refers to the process of attaching event listeners, component  and making static HTML interactive on the client side.

The issue is that hydration can be expensive if too much JavaScript is loaded upfront. To optimize it:

We use dynamic() with { ssr: false } to defer non-critical components like modals and sliders.

We minimize the amount of client-side state and remove logic out of components that dont need to re-render.

We avoided using too many prop between different components, we use context or Zustand for shared state, which simplified the component tree and reduced re-renders.

These optimizations improved the Time to Interactive and reduced hydration time.

如果你的页面里：
初始加载就包含了大量交互组件（如 Modal、Charts、动画组件）
组件嵌套很深或过于复杂
JavaScript 包体积大或模块没分开加载（如没用 code splitting）
那么 Hydration 过程就会非常重：
浏览器要下载并执行大量 JavaScript
Hydration 会花很多时间，导致页面虽然显示了结构，但 按钮不能点、动画不动、内容无法交互


## 4. migrating our legacy medical e-commerce platform from Vue 2 to Next.js

One of the most challenging projects I led was migrating our legacy medical e-commerce platform from Vue 2 to Next.js.

On the technical side, we had to rethink everything from routing and state management to SSR and performance optimization. For example, the original Vue app used client-side rendering, so we had to refactor the entire architecture to leverage Next.js’s SSR and SSG capabilities. We modularized the layout, implemented atomic design, and used route-based code splitting and hydration optimization to boost performance. Migrating legacy Vue components also required rewriting logic in React and ensuring parity in functionality and SEO.

One additional challenge was that the legacy codebase had poor documentation, and some business logic had been hardcoded or wasn’t clearly. I worked closely with product manager to reverse-engineer certain features, clarify edge cases through QA feedback, and refine the components. I also created internal documentation from scratch, including clearly defined functional specifications, component responsibilities, and updated architectural diagrams.

On the team side, not everyone had experience with React or Next.js exept me, so I organized pair programming sessions, shared migration guidelines. I also communicated closely with backend and design teams to minimize blockers and align delivery milestones.

In the end, we improved web platform. our GTmetrix score from D to A, LCP from 3.1s to 1.2s, and SEO score from 67 to 100. It was a technically intense but very rewarding project that made our frontend future-proof and significantly faster.


## How do you ensure accessibility (a11y) and consistency across your component library?
We consider accessibility from the begining of our development. We rely on semantic HTML elements wherever possible and enhance them with ARIA attributes as needed.

For interactive components like modals, tooltips, and dropdowns, we use base components from Radix UI to handle keyboard navigation, focus trapping, and screen reader compatibility.

Consistency is achieved by using shared design, utility-first styling (via Tailwindcss), and a review process that includes a checklist for accessibility, responsive design, and design alignment. We also use Storybook to visually validate component states and ensure regressions wont happen.


## How do you structure atomic design in practice?
We use atomic design principles to create a clear, scalable structure:

we have base UI elements like buttons, inputs, icons.
we combine base UI elements into more functional units, like a search bar with an input and icon.
we also complex reusable structures such as headers, footers, or card.
Templates define the layout skeletons, and Pages are fully composed screens.

This hierarchy not only improves reusability but also makes onboarding and refactoring easier. Each level lives in a separate folder, and we use consistent naming, props, and visual tests to maintain structure.

📌 中文解释：

按照原子设计（Atomic Design）将组件分为 5 层：

Atom（最小组件，如按钮）

Molecule（组合组件，如搜索框）

Organism（复杂区域，如 Header）

Template（布局骨架）

Page（完整页面）

分层结构让团队更容易理解、使用和维护组件。