// Shared navigation behaviour
const menuToggle = document.querySelector("#menuToggle");
const navbar = document.querySelector("#navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Task 0: print student details and show the requested greeting when the button is clicked.
console.log("Name: Balzhan");
console.log("Group: Write your group");

const helloButton = document.querySelector("#helloButton");
if (helloButton) {
  helloButton.addEventListener("click", () => alert("Hello, JavaScript World!"));
}

// Task 1: variables and operators
const variablesOutput = document.querySelector("#variablesOutput");
const runVariables = document.querySelector("#runVariables");
if (runVariables && variablesOutput) {
  runVariables.addEventListener("click", () => {
    const studentName = "Balzhan"; // string
    const age = 18; // number
    const isStudent = true; // boolean
    const a = 12;
    const b = 4;
    const results = [
      `Name: ${studentName} (string)`,
      `Age: ${age} (number)`,
      `Is student: ${isStudent} (boolean)`,
      `${a} + ${b} = ${a + b}`,
      `${a} - ${b} = ${a - b}`,
      `${a} * ${b} = ${a * b}`,
      `${a} / ${b} = ${a / b}`,
      `Hello, ${studentName}!`
    ];
    variablesOutput.innerHTML = results.map(item => `<div>${item}</div>`).join("");
    console.log(...results);
  });
}

// Task 2: changing content
const changeTextButton = document.querySelector("#changeTextButton");
const changeTextParagraph = document.querySelector("#changeTextParagraph");
if (changeTextButton && changeTextParagraph) {
  changeTextButton.addEventListener("click", () => {
    changeTextParagraph.textContent = "The paragraph has been changed with JavaScript!";
  });
}

// Task 3: changing styles
const styleDemo = document.querySelector("#styleDemo");
const changeColorButton = document.querySelector("#changeColorButton");
const changeFontButton = document.querySelector("#changeFontButton");
const resetStyleButton = document.querySelector("#resetStyleButton");
if (styleDemo && changeColorButton) {
  const colors = ["#dff7ef", "#ffe8d8", "#e9e5ff", "#e0f0ff"];
  let colorIndex = 0;
  changeColorButton.addEventListener("click", () => {
    styleDemo.style.backgroundColor = colors[colorIndex % colors.length];
    colorIndex++;
  });
}
if (styleDemo && changeFontButton) {
  let large = false;
  changeFontButton.addEventListener("click", () => {
    large = !large;
    styleDemo.style.fontSize = large ? "1.35rem" : "1rem";
  });
}
if (styleDemo && resetStyleButton) {
  resetStyleButton.addEventListener("click", () => {
    styleDemo.style.backgroundColor = "";
    styleDemo.style.fontSize = "";
  });
}

// Task 4: create and remove list elements
const addItemButton = document.querySelector("#addItemButton");
const removeItemButton = document.querySelector("#removeItemButton");
const itemList = document.querySelector("#itemList");
const itemCount = document.querySelector("#itemCount");
if (addItemButton && itemList) {
  let itemNumber = itemList.children.length;
  addItemButton.addEventListener("click", () => {
    itemNumber++;
    const li = document.createElement("li");
    li.textContent = `New item ${itemNumber}`;
    itemList.appendChild(li);
    if (itemCount) itemCount.textContent = itemList.children.length;
  });
}
if (removeItemButton && itemList) {
  removeItemButton.addEventListener("click", () => {
    if (itemList.lastElementChild) itemList.lastElementChild.remove();
    if (itemCount) itemCount.textContent = itemList.children.length;
  });
}

// Task 5: mouseover and mouseout events
const hoverBox = document.querySelector("#hoverBox");
if (hoverBox) {
  hoverBox.addEventListener("mouseover", () => {
    hoverBox.style.backgroundColor = "#6558e8";
    hoverBox.style.color = "#ffffff";
    hoverBox.style.transform = "scale(1.02)";
  });
  hoverBox.addEventListener("mouseout", () => {
    hoverBox.style.backgroundColor = "#dff7ef";
    hoverBox.style.color = "#202238";
    hoverBox.style.transform = "scale(1)";
  });
}

// Task 6: show input value on keyup
const liveInput = document.querySelector("#liveInput");
const livePreview = document.querySelector("#livePreview");
if (liveInput && livePreview) {
  liveInput.addEventListener("keyup", () => {
    livePreview.textContent = liveInput.value || "Your text will appear here...";
  });
}

// Task 7: basic calculator
const calcDisplay = document.querySelector("#calcDisplay");
const calcButtons = document.querySelectorAll("[data-calc]");
if (calcDisplay && calcButtons.length) {
  let current = "";
  let stored = null;
  let operator = null;
  let shouldReset = false;

  const updateDisplay = value => { calcDisplay.textContent = value || "0"; };
  const calculate = (left, right, op) => {
    if (op === "+") return left + right;
    if (op === "−") return left - right;
    if (op === "×") return left * right;
    if (op === "÷") return right === 0 ? "Cannot divide by zero" : left / right;
    return right;
  };

  calcButtons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.dataset.calc;
      if (value === "clear") {
        current = ""; stored = null; operator = null; shouldReset = false;
        updateDisplay("0"); return;
      }
      if (value === "equals") {
        if (stored !== null && operator && current !== "") {
          const result = calculate(stored, Number(current), operator);
          current = String(result);
          stored = null; operator = null; shouldReset = true;
          updateDisplay(current);
        }
        return;
      }
      if (["+", "−", "×", "÷"].includes(value)) {
        if (current === "" || !Number.isFinite(Number(current))) return;
        stored = Number(current); operator = value; current = ""; shouldReset = false;
        updateDisplay(value); return;
      }
      if (value === "decimal") {
        if (shouldReset) { current = "0"; shouldReset = false; }
        if (!current.includes(".")) current = current === "" ? "0." : current + ".";
        updateDisplay(current); return;
      }
      if (shouldReset) { current = ""; shouldReset = false; }
      current += value;
      updateDisplay(current);
    });
  });
}

// Task 8: To-Do app. Tasks are kept in an array only (no database/localStorage).
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoEmpty = document.querySelector("#todoEmpty");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const clearCompleted = document.querySelector("#clearCompleted");
if (todoForm && todoInput && todoList) {
  let tasks = [];
  let nextTaskId = 1;

  function renderTasks() {
    todoList.innerHTML = "";
    if (todoEmpty) todoEmpty.classList.toggle("hidden", tasks.length > 0);
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `todo-item${task.completed ? " completed" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        renderTasks();
      });

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = task.text;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "btn danger small";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== task.id);
        renderTasks();
      });

      li.append(checkbox, span, deleteButton);
      todoList.appendChild(li);
    });
    if (totalTasks) totalTasks.textContent = tasks.length;
    if (completedTasks) completedTasks.textContent = tasks.filter(task => task.completed).length;
  }

  todoForm.addEventListener("submit", event => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (!text) {
      todoInput.focus();
      return;
    }
    tasks.push({ id: nextTaskId++, text, completed: false });
    todoInput.value = "";
    todoInput.focus();
    renderTasks();
  });

  if (clearCompleted) {
    clearCompleted.addEventListener("click", () => {
      tasks = tasks.filter(task => !task.completed);
      renderTasks();
    });
  }
  renderTasks();
}
