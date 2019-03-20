const CONFIG = { API_URL: "http://localhost:8000" };

const ageElement = document.querySelector("#age");
const weightElement = document.querySelector("#weight");
const heightElement = document.querySelector("#height");

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.alert("You need to login");
    window.location = "login.html";
  }
}
function displayData(data) {
  ageElement.innerHTML = `${data.age} years`;
  weightElement.innerHTML = `${data.weight} kg` || "N/A";
  heightElement.innerHTML = `${data.height} cm` || "N/A";
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

async function calculateDCI(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${CONFIG.API_URL}/calculate-dci`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const json = await response.json();
      alert(`Your Daily Calorie Intake is ${json.user.dci} calories`);
      window.location = "profile.html";
    } else {
      alert("Error calculating DCI");
      submitButton.setAttribute("disabled", false);
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    submitButton.setAttribute("disabled", false);
  }
}

const dciCalcForm = document.querySelector("#dci-calc-form");
const submitButton = document.querySelector("#submit-button");

dciCalcForm.addEventListener("submit", async event => {
  event.preventDefault();
  submitButton.setAttribute("disabled", true);
  const data = {
    useractivity: dciCalcForm.useractivity.value
  };
  await calculateDCI(data);
});

isAuthenticated();
getData();
