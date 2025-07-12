## What’s your approach to writing unit vs E2E tests?
I follow a layered testing strategy, where unit tests focus on individual logic, utility functions, and component behavior in isolation, while E2E tests verify full user flows and business-critical paths like login, search, and checkout.

For unit testing, we use Jest to test component logic, state transitions, and prop rendering. These are fast, deterministic, and provide tight feedback during development.

For E2E, we use Playwright to simulate real user behavior across browsers and devices. It helps catch regressions that unit tests can't, especially for complex workflows and third-party integration points.

I aim to balance both: unit tests for coverage and speed, E2E tests for confidence in real-world usage.

📌 中文解释：

单元测试用来验证小范围逻辑，运行快，调试方便；

E2E 用于确保用户流程完整性，覆盖“真实点击、跳转、网络请求”等；

两者结合，兼顾开发效率与用户体验保障。

## How do you mock API calls in your tests?
For unit tests, I typically use Jest’s mocking capabilities to replace fetch, or any external data calls. I mock both resolved and rejected states to test different UI branches and edge cases.

For E2E tests, I often use Playwright’s route interception feature to stub API responses. This helps decouple tests from unstable backends, speeds up execution, and makes tests more deterministic.

单元测试中用 jest.mock() 来模拟 API 响应，覆盖各种状态；

E2E 测试中用 Playwright 的 page.route() 拦截请求返回 mock 数据；

有时候也会用 MSW 提供更接近真实环境的 mock。


## What are the challenges you faced in achieving high coverage?
One challenge is that legacy code wasn't designed with testability. There were side effects, tight coupling, and missing separation of concerns, which made writing unit tests difficult.

I had to refactor parts of the codebase, extract logic from UI components into hooks or utils. This improved testability and maintainability.

Another challenge is that writing meaningful E2E tests is time-consuming, especially when flows involve auth, payments, or third-party services. To make testing easier, we focused on the most important user flows first, automated the test setup, and used CI to run tests

📌 中文解释：

老代码耦合严重，难以 mock，导致难以测试 → 通过重构解耦逻辑、抽出 hooks；

E2E 测试流程复杂（如支付、认证），编写成本高 → 通过优先级排序、自动化准备数据、并行运行等方式优化。

🧱 “耦合严重”是什么意思？
📘 中文解释：
当我们说“代码耦合严重”时，意思是：
某个模块（组件、函数、类）与其他模块之间绑定太紧密，缺乏独立性。

这意味着：
你改动一个地方，另一个地方也会受到影响；
模块之间依赖太多，难以拆分、重用或测试；
很难单独拿出来 mock 或覆盖测试逻辑。

我们主要通过三个方式降低测试难度和成本：
优先测试关键功能流程（比如登录、下单）；
自动化测试数据准备（不用手动造数据）；
在持续集成（CI）中并行执行测试，节省运行时间。