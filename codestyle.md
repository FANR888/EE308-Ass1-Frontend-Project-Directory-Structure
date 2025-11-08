# 🧩 前端代码规范（Code Style）

**来源**：  
本规范综合参考以下主流官方与企业标准：  
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)  
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)  
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)  
- 结合项目实际需求制定

---

## 📁 一、项目结构与命名

### 1.1 项目目录
```bash
EE308-Ass1-Frontend-Project-Directory-Structure/
│ 832301220_contacts_frontend/
│ ├── src/
│ │ ├── contacts.html
│ │ ├── css/
│ │ │ ├── style.css
│ │ ├── js/
│ │ │ └── script.js
├── README.md 
└── codestyle.md
```

### 1.2 命名规则
| 类型 | 命名规范 | 示例 |
|------|-----------|------|
| 文件夹 | 全小写、用中划线分隔（kebab-case） | `static/js`, `static/css` |
| 文件 | 小写字母 + 中划线 | `style.css`, `script.js` |
| 变量与函数 | 小驼峰命名（camelCase） | `loadContacts()`, `highlightText` |
| 常量 | 全大写 + 下划线（UPPER_SNAKE_CASE） | `API_URL` |
| 类名 | PascalCase（大驼峰） | `ContactManager` |
| HTML ID | 小驼峰 | `add-section`, `search-section` |
| CSS 类 | 中划线分隔（kebab-case） | `.drag-handle`, `.highlight` |

---

## 🧱 二、HTML 规范

### 2.1 基本规则
- 文件必须以 `<!DOCTYPE html>` 开头。  
- 使用语义化标签：`<header>`、`<main>`、`<footer>`、`<section>`。  
- 属性值必须使用双引号。  
- 每个标签独占一行或换行缩进 2 空格。  
- 避免使用内联样式与事件（如 `onclick`）。  

### 2.2 注释与缩进
- 使用 `<!-- 注释内容 -->` 格式。  
- 缩进统一为 **2 个空格**。

### 2.3 示例
```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>📒 通讯录管理系统</title>
    <link rel="stylesheet" href="../static/css/style.css" />
  </head>
  <body>
    <h1>📒 通讯录</h1>

    <!-- 添加联系人区域 -->
    <div id="add-section">
      <input id="name" placeholder="姓名" />
      <input id="phone" placeholder="电话" />
      <input id="email" placeholder="邮箱" />
      <button onclick="addContact()">添加</button>
    </div>
  </body>
</html>
```

## 🎨 三、CSS 规范

### 3.1 基本书写规范
- 缩进为 2 个空格。
- 每个规则组之间保留一空行。
- 属性冒号后空一格。
- 每条属性声明后以分号结尾。
- 避免使用内联样式。

### 3.2 命名规范
- 类名使用 `kebab-case`，语义清晰。例如：`.highlight`, `.drag-handle`, `.text-cell`。
- 统一字体为 "Microsoft Yahei"，确保中文可读性。
- 避免使用无语义命名（如 .box1, .div2）。

### 3.3 排版与层次
推荐属性顺序：
- 布局属性（`display`, `position`, `margin`, `padding`）
- 盒模型属性（`width`, `height`, `border`, `box-sizing`）
- 文本样式（`font`, `color`, `line-height`）
- 背景与特效（`background`, `transition`, `box-shadow`）

### 3.3 示例
```css
/* 页面整体样式 */
body {
  font-family: "Microsoft Yahei";
  margin: 40px;
  background-color: #f8f9fa;
}

/* 输入框样式 */
input {
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 按钮交互效果 */
button {
  padding: 5px 10px;
  margin: 3px;
  border: 1px solid #888;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f4f4f4;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #ddd;
}
```

## ⚙️ 四、JavaScript 规范

### 4.1 基础语法
- 使用 `const` / `let`，禁止使用 `var`。
- 每条语句结尾加分号 `;`。
- 字符串使用单引号 ' ' '。
- 模板字符串使用反引号 ` 仅在拼接变量时使用。
- 所有函数声明或表达式之间空一行。

### 4.2 命名规则
| 类型     | 规则               | 示例                                |
| ------ | ---------------- | --------------------------------- |
| 常量     | UPPER_SNAKE_CASE | `API_URL`                         |
| 函数     | camelCase        | `loadContacts()`                  |
| 事件处理函数 | 动词开头             | `addContact()`, `deleteContact()` |
| 临时变量   | 简短、语义化           | `res`, `data`, `tbody`            |

### 4.3 代码风格
- 每层缩进 2 个空格。
- 大括号 `{}` 单独占行，与语句同缩进。
- 严格使用 `===` / `!==`。
- 函数体不超过 80 行。
- 优先使用箭头函数简化回调。

### 4.4 异步与网络请求
- 所有异步操作使用 `async/await`。
- 使用 `fetch()` 发起 HTTP 请求。
- 每个请求应加上 `Content-Type: application/json`。
- 必须处理异常（try/catch）。
```JavaScript
# 示例
const API_URL = 'http://8.148.176.83:8000/contacts/';

async function loadContacts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allContacts = data.results || [];
    renderContacts(allContacts);
  } catch (error) {
    console.error('加载联系人失败:', error);
  }
}
```

### 4.5 DOM 操作与渲染
- 所有 DOM 查询使用 `document.querySelector()` 或 `querySelectorAll()`。
- 避免频繁修改 DOM，应集中渲染后更新。
- 动态生成的 HTML 通过模板字符串插入。
```JavaScript
# 示例
function renderContacts(data) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach((c, index) => {
    const tr = document.createElement('tr');
    tr.setAttribute('draggable', 'true');
    tr.innerHTML = `
      <td class="drag-handle">≡</td>
      <td><input value="${c.name}" onchange="editContact(${c.id}, this.value, 'name')"></td>
      <td><input value="${c.phone}" onchange="editContact(${c.id}, this.value, 'phone')"></td>
      <td><input value="${c.email}" onchange="editContact(${c.id}, this.value, 'email')"></td>
      <td><button onclick="deleteContact(${c.id})">删除</button></td>
    `;
    tbody.appendChild(tr);
  });
}
```
### 4.6 注释规范
单行注释：`//`
多行注释：
```JavaScript
/**
 * 函数说明：添加新联系人
 * @param {string} name - 姓名
 * @param {string} phone - 电话
 * @param {string} email - 邮箱
 */
```

### 4.7 拖拽交互逻辑
- 拖拽元素需添加 `draggable="true"`。
- 使用 `dragstart`、`dragover`、`dragend` 三类事件组合。
- 拖拽中添加 `.dragging` 类控制透明度。
- 结束后调用 `updateOrder()` 同步顺序。














