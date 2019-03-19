const CONFIG = { API_URL: "http://localhost:8000" };

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.alert("You need to login");
    window.location = "login.html";
  }
}

async function calculateBMI(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${CONFIG.API_URL}/calculate-bmi`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const json = await response.json();
      alert(`Your BMI is ${json.user.bmi}`);
      window.location = "profile.html";
    } else {
      alert("Error calculating BMI");
      submitButton.setAttribute("disabled", false);
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    submitButton.setAttribute("disabled", false);
  }
}

const bmiCalcForm = document.querySelector("#bmi-calc-form");
const submitButton = document.querySelector("#submit-button");

bmiCalcForm.addEventListener("submit", async event => {
  event.preventDefault();
  submitButton.setAttribute("disabled", true);
  const data = {
    height: bmiCalcForm.height.value,
    weight: bmiCalcForm.weight.value
  };
  await calculateBMI(data);
});

isAuthenticated();
