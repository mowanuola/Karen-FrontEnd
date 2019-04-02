const CONFIG = { API_URL: "http://localhost:8000" };

const userNameElement = document.querySelector("#user-name");
const bloodTypeElement = document.querySelector("#blood-type");
const sexElement = document.querySelector("#sex");
const weightElement = document.querySelector("#weight");
const heightElement = document.querySelector("#height");
const emailElement = document.querySelector("#email");
const bmiElement = document.querySelector("#bmi");
const dciElement = document.querySelector("#dci");

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.alert("You need to login");
    window.location = "login.html";
  }
}
function displayData(data) {
  userNameElement.innerHTML = `${data.first_name} ${data.last_name}`;
  bloodTypeElement.innerHTML = data.bloodtype.toUpperCase() || "N/A";
  sexElement.innerHTML = data.sex;
  weightElement.innerHTML = `${data.weight} kg` || "N/A";
  heightElement.innerHTML = `${data.height} cm` || "N/A";
  emailElement.innerHTML = data.email;
  bmiElement.innerHTML = `${data.bmi || "N/A"} (${bmi(data.bmi)})`;
  dciElement.innerHTML = `${data.dci} calories`;
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
function bmi(bmiValue) {
  if (Number(bmiValue)) {
    bmiValue = Number(bmiValue);
    if (bmiValue < 18.5) {
      return "Underweight";
    } else if ((bmiValue > 18.5) & (bmiValue <= 24.9)) {
      return "Normal Weight";
    } else if ((bmiValue > 25) & (bmiValue <= 29.9)) {
      return "Overweight";
    } else if ((bmiValue > 30) & (bmiValue <= 34.9)) {
      return "Obese Class I";
    } else if ((bmiValue > 35) & (bmiValue <= 39.9)) {
      return "Obese Class II";
    } else {
      return "Obese Class III";
    }
  } else {
    return "N/A";
  }
}
isAuthenticated();
getData();
