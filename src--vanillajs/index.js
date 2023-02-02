//import "./styles.css";
let taskChecks = document.getElementsByName("taskCheck");

//作成黒板のすることの入力枠増減
const taskInputs = document.getElementById("taskInputs");
const addTask = document.getElementById("js-addTask");
addTask.addEventListener("click", () => {
  const addInput = document.createElement("input");
  addInput.type = "text";
  addInput.name = "task";
  const addBr = document.createElement("br");

  taskInputs.appendChild(addInput);
  taskInputs.appendChild(addBr);
});

const delTask = document.getElementById("js-delTask");
delTask.addEventListener("click", () => {
  const taskLength = document.getElementsByName("task").length;
  if (taskLength > 1) {
    for (let i = 0; i < 2; i++) {
      const lastInput = taskInputs.lastElementChild;
      lastInput.remove();
    }
  }
});

//進行中
let activeBoardsJson = [];
const activeJson = JSON.parse(localStorage.getItem("active"));
if (activeJson !== null) {
  activeBoardsJson = activeJson;
}

if (activeBoardsJson.length) {
  const actives = document.getElementById("js-actives");
  let count = 0;

  for (let activeObj of activeJson) {
    count++;
    const activeBoard = document.createElement("div");
    activeBoard.className = "c-board c-varColor--yellow p-activeBoard";
    actives.appendChild(activeBoard);

    const checkLists = document.createElement("form");
    checkLists.action = "";
    checkLists.method = "GET";
    checkLists.id = `checkList${count}`;
    checkLists.className = "c-checkList";
    activeBoard.appendChild(checkLists);

    const addDiv = document.createElement("div");
    addDiv.innerHTML = `<h3 class="c-color--yellow">${activeObj.title}</h3>`;
    checkLists.appendChild(addDiv);

    const inputTitle = document.createElement("input");
    inputTitle.type = "hidden";
    inputTitle.id = `activeTitle${count}`;
    inputTitle.value = activeObj.title;
    addDiv.appendChild(inputTitle);

    let taskCount = 0;
    for (let task of activeObj.tasks) {
      const checkList = document.createElement("input");
      checkList.type = "checkbox";
      checkList.name = "taskCheck";
      checkList.value = task;

      const checkListText = document.createElement("span");
      checkListText.innerHTML = task;
      const addBr = document.createElement("br");

      if (activeObj.isChecked[taskCount] === true) {
        checkList.checked = true;
        checkListText.classList.add("is-checked");
      }

      addDiv.appendChild(checkList);
      addDiv.appendChild(checkListText);
      addDiv.appendChild(addBr);
      taskCount++;
    }
    const addDivRight = document.createElement("div");
    addDivRight.className = "c-btnArea__right";
    checkLists.appendChild(addDivRight);

    const compTask = document.createElement("input");
    compTask.type = "submit";
    compTask.id = `compTask${count}`;
    compTask.className = "c-btn__board p-btn__btnArea p-btn__board--comp";
    if (!activeObj.isChecked.some((i) => i === false)) {
      compTask.classList.add("is-comped");
    }
    compTask.value = "完了";
    addDivRight.appendChild(compTask);

    const delBoard = document.createElement("input");
    delBoard.type = "button";
    delBoard.id = `delBoard${count}`;
    delBoard.className =
      "c-btn__board p-btn__btnArea p-btn__board--del js-delActiveBoard";
    delBoard.value = "削除";
    addDivRight.appendChild(delBoard);
  }
} else {
  const activeSection = document.getElementById("l-active");
  activeSection.remove();
}

//完了済
let compBoardsJson = [];
const compJson = JSON.parse(localStorage.getItem("completed"));
if (compJson !== null) {
  compBoardsJson = compJson;
}

if (compBoardsJson.length) {
  const comps = document.getElementById("js-completed");
  let count = 0;

  for (let compObj of compJson) {
    count++;
    const compBoard = document.createElement("div");
    compBoard.className = "c-board c-varColor--pink p-compBoard";
    comps.appendChild(compBoard);

    const checkLists = document.createElement("div");
    checkLists.id = `checkList${count}`;
    checkLists.className = "c-checkList";
    compBoard.appendChild(checkLists);

    const addDiv = document.createElement("div");
    addDiv.innerHTML = `<h3><input type="checkbox" name="delCompCheckbox"><span class="p-title">${compObj.title}</span></h3>`;
    checkLists.appendChild(addDiv);

    const addUl = document.createElement("ul");
    addDiv.appendChild(addUl);

    for (let task of compObj.tasks) {
      const taskList = document.createElement("li");
      taskList.className = "c-color--red";
      taskList.innerHTML = task;
      addUl.appendChild(taskList);
    }
    const addDivRight = document.createElement("div");
    addDivRight.className = "c-btnArea__right";
    checkLists.appendChild(addDivRight);

    const delBoard = document.createElement("input");
    delBoard.type = "button";
    delBoard.id = `delCompBoard${count}`;
    delBoard.className =
      "c-btn__board p-btn__btnArea p-btn__board--del js-delCompBoard";
    delBoard.value = "削除";
    addDivRight.appendChild(delBoard);
  }
} else {
  const completedSection = document.getElementById("l-completed");
  completedSection.remove();
}

//作成ボタン
const createActiveBoard = document.getElementById("js-submit__new");
createActiveBoard.addEventListener("click", () => {
  const taskInput0Value = document.getElementById("taskInput0").value;
  if (taskInput0Value) {
    const newTitle = document.getElementById("newTitle").value;
    const newTasks = document.getElementsByName("task");
    const newTaskValues = [];
    const newChecked = [];
    for (let newTask of newTasks) {
      if (newTask.value) {
        newTaskValues.push(newTask.value);
        newChecked.push(false);
      }
    }
    const newActiveBoard = {
      title: newTitle,
      tasks: newTaskValues,
      isChecked: newChecked
    };
    activeBoardsJson.push(newActiveBoard);
    const activeBoardsJsonStr = JSON.stringify(activeBoardsJson);
    localStorage.setItem("active", activeBoardsJsonStr);
  }
});

//タスクチェック
taskChecks = document.getElementsByName("taskCheck");
for (let taskCheck of taskChecks) {
  taskCheck.addEventListener("change", () => {
    let checkCount = 0;
    const thisFormID = taskCheck.parentElement.parentElement.id;
    const thisForm = document.getElementById(thisFormID);
    const thisFormTasks = thisForm.querySelectorAll(
      'div input[name="taskCheck"]'
    );
    const activeBoards = Array.from(
      document.querySelectorAll(".p-activeBoard")
    );
    const thisActiveBoard = thisForm.closest(".p-activeBoard");
    const jsonIndex = activeBoards.findIndex(
      (thisBoard) => thisBoard === thisActiveBoard
    );
    for (let i of thisFormTasks) {
      const checkText = i.nextSibling;
      if (i.checked) {
        activeJson[jsonIndex].isChecked[checkCount] = true;
        checkText.classList.add("is-checked");
      } else {
        activeJson[jsonIndex].isChecked[checkCount] = false;
        checkText.classList.remove("is-checked");
      }
      checkCount++;
    }
    const activeBoardsJsonStr = JSON.stringify(activeJson);
    localStorage.setItem("active", activeBoardsJsonStr);
    const btnComp = thisForm.getElementsByClassName("p-btn__board--comp")[0];
    if (!activeJson[jsonIndex].isChecked.some((i) => i === false)) {
      btnComp.classList.add("is-comped");
    } else {
      btnComp.classList.remove("is-comped");
    }
  });
}

function delActveJson(index) {
  delete activeJson[index];
  const fixedActiveJson = activeJson.filter(Boolean);
  const activeBoardsJsonStr = JSON.stringify(fixedActiveJson);
  localStorage.setItem("active", activeBoardsJsonStr);
  activeBoardsJson = JSON.parse(localStorage.getItem("active"));
}
//進行中を削除
const btnBoardDels = document.getElementsByClassName("js-delActiveBoard");
for (let btnBoardDel of btnBoardDels) {
  btnBoardDel.addEventListener("click", () => {
    let result = confirm("削除しますか?");
    if (result) {
      const activeBoards = Array.from(
        document.querySelectorAll(".p-activeBoard")
      );
      const thisActiveBoard = btnBoardDel.closest(".p-activeBoard");
      const index = activeBoards.findIndex(
        (thisBoard) => thisBoard === thisActiveBoard
      );
      delActveJson(index);
      location.reload();
    }
  });
}

//タスク完了
const btnCompletes = document.getElementsByClassName("p-btn__board--comp");
for (let btnComplete of btnCompletes) {
  btnComplete.addEventListener("click", () => {
    const activeBoards = Array.from(
      document.querySelectorAll(".p-activeBoard")
    );
    const thisActiveBoard = btnComplete.closest(".p-activeBoard");
    const index = activeBoards.findIndex(
      (thisBoard) => thisBoard === thisActiveBoard
    );
    compBoardsJson.push(activeJson[index]);
    const compJsonStr = JSON.stringify(compBoardsJson);
    localStorage.setItem("completed", compJsonStr);
    delActveJson(index, thisActiveBoard);
  });
}

//完了済を削除
function delCompJson() {
  const fixedCompJson = compJson.filter(Boolean);
  const compBoardsJsonStr = JSON.stringify(fixedCompJson);
  localStorage.setItem("completed", compBoardsJsonStr);
  compBoardsJson = JSON.parse(localStorage.getItem("completed"));
  location.reload();
}

const btnCompBoardDels = document.getElementsByClassName("js-delCompBoard");

for (let btnCompBoardDel of btnCompBoardDels) {
  btnCompBoardDel.addEventListener("click", () => {
    let result = confirm("削除しますか?");
    if (result) {
      const compBoards = Array.from(document.querySelectorAll(".p-compBoard"));
      const thisCompBoard = btnCompBoardDel.closest(".p-compBoard");
      const index = compBoards.findIndex(
        (thisBoard) => thisBoard === thisCompBoard
      );
      delete compJson[index];
      delCompJson();
    }
  });
}

//完了済をまとめて削除
const btnDelComps = document.getElementById("js-delComps");
if (btnDelComps) {
  btnDelComps.addEventListener("click", () => {
    let result = confirm("まとめて削除しますか?");
    if (result) {
      const delCompCheckboxes = document.getElementsByName("delCompCheckbox");
      for (let delCompCheckbox of delCompCheckboxes) {
        if (delCompCheckbox.checked) {
          const compBoards = Array.from(
            document.querySelectorAll(".p-compBoard")
          );
          const thisCompBoard = delCompCheckbox.closest(".p-compBoard");
          const index = compBoards.findIndex(
            (thisBoard) => thisBoard === thisCompBoard
          );
          delete compJson[index];
        }
      }
      delCompJson();
    }
  });
}
