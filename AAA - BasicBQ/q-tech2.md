技术栈（Next.js、SSR/SSG、Tailwind、Shadcn/UI、Component Design、Testing、Analytics、Performance、Design System）整理的技术问题清单。这些你都具备直接应答的基础。

---

## ✅ 技术方向问题（你都能答）

### 🔷 **前端架构 & 性能优化**

| 问题                                                                                                          | 你可以怎么回答                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **What performance bottlenecks did you encounter when migrating to Next.js, and how did you address them?** | 讲 SSR 带来的 cold start、LCP 处理、route splitting、lazy loading 的策略                                 |
| **How did you improve your Core Web Vitals like LCP or FID?**                                               | 提到资源预加载、image 优化、JS 减少 85%、HTTP 请求减 60%、SPA→SSR 流式渲染等                                        |
| **Can you explain the difference between SSR and SSG in Next.js, and when to use each?**                    | SSR for dynamic content (e.g., account, personalized pages), SSG for marketing/product pages |

---

### **Q: What performance bottlenecks did you encounter when migrating to Next.js, and how did you address them?**

**Answer:**
When I migrated our medical e-commerce platform from Vue 2 to **Next.js 14**, we faced several performance bottlenecks—mainly **large JavaScript bundles**, **slow LCP**, and **hydration delays** on complex pages like product detail and checkout.

To address this:

* We adopted **React Server Components** to avoid unnecessary client-side hydration, especially for static or read-only sections.
* Used **route-based code splitting** with the App Router to load only what’s needed per page.
* Applied **lazy loading** for non-critical components and `next/image` for image optimization.
* Refactored global state to **local or scoped hooks** to reduce re-renders and JS overhead.

As a result, we:

* Cut **LCP from 3.1s to 1.2s**
* Reduced **page size by 85%**
* Brought **fully loaded time down to 1.3s**

This directly improved SEO scores and contributed to a **25% uplift in conversion rate**.

---



### 🔷 **Design System 与组件设计**

| 问题                                                                                  | 你可以怎么回答                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **How did you design and scale your Design System using Tailwind and shadcn/ui?**   | 介绍 token → CSS var 流程、Tailwind preset、自定义主题、组件分包管理                 |
| **How do you ensure your components are accessible and maintainable across teams?** | 讲 CI 流程 + axe-core、Storybook、semantic naming、ARIA 支持、focus ring 管理 |
| **What was the biggest challenge in managing reusable components across teams?**    | 版本冲突 + peerDeps 问题 → pnpm monorepo + codemod + semantic-release    |

---

### 🔷 **测试体系 &质量保障**

| 问题                                                                    | 你可以怎么回答                                                                                      |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **What’s your frontend testing strategy?**                            | Unit (Jest for cart/filter), E2E (Playwright: login, checkout), Coverage >85%，PR block 未覆盖逻辑 |
| **How do you test accessibility in your components?**                 | 用 axe-core、jest-a11y、CI snapshot、Lighthouse plugin                                           |
| **Can you share how Playwright improved your deployment confidence?** | 减少回归问题 40%，模拟真实行为，自动 screenshot + coverage map                                               |

---

### 🔷 **数据驱动决策 & 实验**

| 问题                                                                         | 你可以怎么回答                                              |
| -------------------------------------------------------------------------- | ---------------------------------------------------- |
| **How did you use tools like Mixpanel or Google Analytics to improve UX?** | 结合用户路径数据优化组件顺序、表单 drop-off、按钮点击率等，推动转化率 +25%         |
| **Describe an A/B test you’ve run and what the outcome was.**              | 可讲 Apple Pay shortcut、改 CTA 按钮文案等，转化提升 xx%，通过小流量灰度上线 |

---

### 🔷 **协作工具链 & CI/CD**

| 问题                                                                                  | 你可以怎么回答                                                           |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **What tools do you use in your development workflow for quality and consistency?** | ESLint、Prettier、Husky、CI 中运行 jest + e2e + lighthouse + lint，全自动发版 |
| **How do you handle code review and enforce standards across a team?**              | PR checklist + shared RFC、pair programming、规范文档（你有提到）             |

---

### 🔷 **Netflix 关注的前沿方向**

| 问题                                                                         | 你可以怎么回答                                                                                                   |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Have you worked with React Server Components or considered using them?** | 是的，在 Next.js 14 App Router 中启用了 RSC，server-only components 无副作用，client-only 保留 `use client`；节省 JS payload |
| **What do you think about Edge Rendering vs traditional SSR?**             | Edge = 更低 TTFB，适合 personalization；SSR = 适合缓存静态内容；你在重构中考虑过它们                                               |

---
