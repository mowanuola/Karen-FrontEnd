const CONFIG = { API_URL: "http://localhost:8000" };

const userNameElement = document.querySelector("#user-name");
const bloodTypeElement = document.querySelector("#blood-type");
const sexElement = document.querySelector("#sex");
const weightElement = document.querySelector("#weight");
const heightElement = document.querySelector("#height");
const emailElement = document.querySelector("#email");

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.alert("You need to login");
    window.location = "login.html";
  }
}
function displayData(data) {
  userNameElement.innerHTML = `${data.first_name} ${data.last_name}`;
  bloodTypeElement.innerHTML = data.bloodtype.toUpperCase();
  sexElement.innerHTML = data.sex;
  weightElement.innerHTML = data.weight || "N/A";
  heightElement.innerHTML = data.height || "N/A";
  emailElement.innerHTML = data.email;
}
async function getData(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${CONFIG.API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const json = await response.json();
      displayData(json);
      console.log(json);
    } else {
      //alert("Invalid registration!");
      return;
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    return;
  }
}
isAuthenticated();
getData();
