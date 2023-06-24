async function editMemo(e) {
  const id = e.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");

  // 서버에 요청
  const res = await fetch(`/memos/${id}`, {
    method: "PUT", // 어떤값 수정시 사용하는 method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(e) {
  const id = e.target.dataset.id;

  // 서버에 요청
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE", // 어떤값 삭제시 사용하는 method
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");

  const editBtn = document.createElement("button");
  li.innerText = `${memo.content}`;
  editBtn.innerHTML = "수정";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.addEventListener("click", deleteMemo);
  deleteBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
}

async function readMemo() {
  const res = await fetch("/memos"); // get요청 필요
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  //jsonRes = [{id:123, content: '~}]
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  }); // post요청 필요
  readMemo();
}

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("#memo-input");

  createMemo(input.value);

  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
