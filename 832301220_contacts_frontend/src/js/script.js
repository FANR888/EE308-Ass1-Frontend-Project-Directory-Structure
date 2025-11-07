const API_URL = "http://8.148.176.83:8000/contacts/";

let allContacts = [];

async function loadContacts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  allContacts = data.results || []; 
  renderContacts(allContacts);     
}

// 渲染联系人表格
function renderContacts(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach((c, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("draggable", "true"); // 可拖拽
    tr.dataset.index = index; // 存储当前行索引

    tr.innerHTML = `
      <td class="drag-handle">≡</td>
      <td><input value="${c.name}" onchange="editContact(${c.id}, this.value, 'name')"></td>
      <td><input value="${c.phone}" onchange="editContact(${c.id}, this.value, 'phone')"></td>
      <td><input value="${c.email}" onchange="editContact(${c.id}, this.value, 'email')"></td>
      <td><button onclick="deleteContact(${c.id})">删除</button></td>
    `;

    tbody.appendChild(tr);
  });

  addDragEvents(); // 绑定拖拽事件
}


function renderContactsWithHighlight(data, keyword) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach((c, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("draggable", "true");
    tr.dataset.index = index;

    const nameHTML = highlightText(c.name, keyword);
    const phoneHTML = highlightText(c.phone, keyword);
    const emailHTML = highlightText(c.email, keyword);

    tr.innerHTML = `
      <td class="drag-handle">≡</td>
      <td>${nameHTML}</td>
      <td>${phoneHTML}</td>
      <td>${emailHTML}</td>
      <td><button onclick="deleteContact(${c.id})">删除</button></td>
    `;

    tbody.appendChild(tr);
  });

  addDragEvents();
}

// 添加联系人
async function addContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone) {
    alert("姓名和电话不能为空！");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, email })
  });

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  await loadContacts();
}

// 修改联系人
async function editContact(id, value, field) {
  const res = await fetch(`${API_URL}${id}/`);
  const contact = await res.json();
  contact[field] = value;

  await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
}

// 删除联系人
async function deleteContact(id) {
  if (!confirm("确认删除该联系人吗？")) return;

  await fetch(`${API_URL}${id}/`, { method: "DELETE" });
  await loadContacts();
}

// 模糊搜索
function filterContacts() {
  const keyword = document.getElementById("search").value.trim().toLowerCase();

  if (!keyword) {
    renderContacts(allContacts);
    return;
  }

  // 过滤匹配的联系人
  const filtered = allContacts.filter(c =>
    c.name.toLowerCase().includes(keyword) ||
    c.phone.toLowerCase().includes(keyword)
  );

  renderContactsWithHighlight(filtered, keyword);
}

// 后端搜索接口
function searchContact() {
  const keyword = document.getElementById("search").value.trim();
  fetch(`http://8.148.176.83:8000/contacts/search_contact/?q=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(data => renderContacts(data))
    .catch(err => console.error('搜索出错:', err));
}
loadContacts();

// 重置搜索框并恢复全部联系人
function resetSearch() {
  document.getElementById("search").value = "";
  loadContacts(); // 重新从后端获取最新联系人列表
}

function addDragEvents() {
  const rows = document.querySelectorAll("tbody tr");
  let dragSrc = null;

  rows.forEach(row => {
    row.addEventListener("dragstart", e => {
      dragSrc = row;
      row.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    row.addEventListener("dragover", e => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      const tbody = document.querySelector("tbody");
      const afterRow = getDragAfterElement(tbody, e.clientY);
      if (afterRow == null) {
        tbody.appendChild(dragging);
      } else {
        tbody.insertBefore(dragging, afterRow);
      }
    });

    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
      updateOrder();
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("tr:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateOrder() {
  const newOrder = [];
  document.querySelectorAll("tbody tr").forEach(row => {
    const index = row.dataset.index;
    newOrder.push(allContacts[index]);
  });
  allContacts = newOrder; 
  console.log("联系人新顺序：", allContacts);
  
  fetch(`${API_URL}reorder/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(allContacts.map((c, i) => ({ id: c.id, order: i })))
});
}

//高亮文本
function highlightText(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}
