# 浏览器页面渲染过程

浏览器渲染页面的一般过程：

1.浏览器解析 html 源码，然后创建一个 DOM 树。并行请求 css/image/js 在 DOM 树中，每一个 HTML 标签都有一个对应的节点，并且每一个文本也都会有一个对应的文本节点。DOM 树的根节点就是 documentElement，对应的是 html 标签。

2.浏览器解析 CSS 代码，计算出最终的样式数据。构建 CSSOM 树。对 CSS 代码中非法的语法它会直接忽略掉。解析 CSS 的时候会按照如下顺序来定义优先级：浏览器默认设置 < 用户设置 < 外链样式 < 内联样式 < html 中的 style。

3.DOM Tree + CSSOM --> 渲染树（rendering tree）。渲染树和 DOM 树有点像，但是是有区别的。

DOM 树完全和 html 标签一一对应，但是渲染树会忽略掉不需要渲染的元素，比如 head、display:none 的元素等。而且一大段文本中的每一个行在渲染树中都是独立的一个节点。渲染树中的每一个节点都存储有对应的 css 属性。

4.一旦渲染树创建好了，浏览器就可以根据渲染树直接把页面绘制到屏幕上。

以上四个步骤并不是一次性顺序完成的。如果 DOM 或者 CSSOM 被修改，以上过程会被重复执行。实际上，CSS 和 JavaScript 往往会多次修改 DOM 或者 CSSOM。

# 从输入 URL 到页面展示到底发生了什么？

1、输入地址
2、浏览器查找域名的 IP 地址
3、浏览器向 web 服务器发送一个 HTTP 请求
4、服务器的永久重定向响应
6、服务器处理请求
7、服务器返回一个 HTTP 响应
8、浏览器显示 HTML
9、浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS 等等）


### 1. **DNS Resolution**
> When the user enters a URL and hits enter, the browser first checks its local cache for a DNS record. If the record isn't found, the browser sends a DNS query to the DNS server to resolve the URL into an IP address.

### 2. **TCP Connection**
> Once the IP address is obtained, the browser establishes a reliable connection with the server using a TCP three-way handshake to initiate communication.

### 3. **HTTP/HTTPS Request**
> After establishing the connection, the browser sends an HTTP or HTTPS request to the server, which includes the request method (such as GET or POST), URL path, headers, and possibly a request body.

### 4. **Server Processing**
> Upon receiving the request, the server processes it, possibly involving database access, application logic, or data retrieval. The server then generates a response, which includes a status code, response headers, and the response body.

### 5. **Returning the Response**
> The server sends back the response to the browser. This response contains the status code (like 200 for success, 404 for not found, etc.), headers, and the actual content (such as HTML, JSON, images, etc.).

### 6. **Browser Rendering**
> The browser then begins rendering the page. It parses the HTML to build the Document Object Model (DOM) tree. Concurrently, it processes CSS to create the CSS Object Model (CSSOM) tree. Both trees are combined into a Render Tree, which the browser uses to calculate layout and paint elements on the screen.

### 7. **Loading Sub-resources**
> While parsing the HTML, the browser discovers additional resources like images, CSS files, and JavaScript files. It sends additional HTTP requests to fetch these resources and updates the page as they are loaded.

### 8. **Executing JavaScript**
> The browser also executes JavaScript code, which may dynamically modify the DOM. This could include updating content, making AJAX requests, or handling user interactions.

### Wrap-up Summary
You can summarize the entire process as: "DNS resolution, establishing a TCP connection, sending an HTTP/HTTPS request, server-side processing, receiving a response, browser parsing and rendering, loading additional resources, and executing JavaScript."

This clear structure shows your understanding of how browsers work under the hood and presents the key steps in an organized way.