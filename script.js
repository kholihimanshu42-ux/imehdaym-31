document
.getElementById("loginBtn")
.addEventListener("click", login);

// ADD STUDENT

document
.getElementById("addBtn")
.addEventListener("click", addStudent);

// SEARCH

document
.getElementById("search")
.addEventListener("keyup", showStudents);

// LOGOUT

document
.getElementById("logoutBtn")
.addEventListener("click", logout);

// STUDENTS ARRAY

let students =
JSON.parse(localStorage.getItem("students"))
|| [];

// LOGIN FUNCTION

function login(){

  let username =
  document
  .getElementById("username")
  .value;

  let password =
  document
  .getElementById("password")
  .value;

  if(username === "admin"
  && password === "1234"){

    document
    .getElementById("loginPage")
    .classList.add("hidden");

    document
    .getElementById("dashboard")
    .classList.remove("hidden");

    showStudents();

  }else{

    document
    .getElementById("error")
    .innerText =
    "Wrong Username or Password";

  }

}

// LOGOUT

function logout(){

  location.reload();

}

// SAVE DATA

function saveData(){

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );

}

// ADD STUDENT

function addStudent(){

  let studentName =
  document
  .getElementById("studentName")
  .value;

  if(studentName === ""){

    alert("Enter Student Name");

    return;
  }

  students.push({

    name:studentName,

    present:0,

    total:0

  });

  saveData();

  document
  .getElementById("studentName")
  .value = "";

  showStudents();

}

// MARK ATTENDANCE

function markAttendance(index,status){

  students[index].total++;

  if(status === "present"){

    students[index].present++;

  }

  saveData();

  showStudents();

}

// DELETE STUDENT

function deleteStudent(index){

  students.splice(index,1);

  saveData();

  showStudents();

}

// SHOW STUDENTS

function showStudents(){

  let studentList =
  document
  .getElementById("studentList");

  let search =
  document
  .getElementById("search")
  .value
  .toLowerCase();

  studentList.innerHTML = "";

  students.forEach((student,index)=>{

    if(student.name
    .toLowerCase()
    .includes(search)){

      let percentage = 0;

      if(student.total > 0){

        percentage = (

          (student.present /
          student.total) * 100

        ).toFixed(1);

      }

      studentList.innerHTML += `

      <tr>

        <td>${student.name}</td>

        <td>${student.present}</td>

        <td>${student.total}</td>

        <td>${percentage}%</td>

        <td>

          <button
          class="present"
          onclick="markAttendance(${index},
          'present')">

          Present

          </button>

          <button
          class="absent"
          onclick="markAttendance(${index},
          'absent')">

          Absent

          </button>

          <button
          class="delete"
          onclick="deleteStudent(${index})">

          Delete

          </button>

        </td>

      </tr>

      `;
    }

  });

  updateDashboard();

}

// UPDATE DASHBOARD

function updateDashboard(){

  document
  .getElementById("totalStudents")
  .innerText = students.length;

  let totalPercent = 0;

  students.forEach(student=>{

    if(student.total > 0){

      totalPercent +=
      (student.present /
      student.total) * 100;

    }

  });

  let avg = 0;

  if(students.length > 0){

    avg =
    (totalPercent /
    students.length)
    .toFixed(1);

  }

  document
  .getElementById("avgAttendance")
  .innerText =
  avg + "%";

}