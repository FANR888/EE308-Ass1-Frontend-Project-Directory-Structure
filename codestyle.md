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

'''html
## 🧱 二、HTML 规范









