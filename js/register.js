var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("dob").setAttribute("max", today);

const CONFIG = { API_URL: "http://localhost:8000" };

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location = "profile.html";
  }
}
async function register(data) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 201) {
      const json = await response.json();
      localStorage.setItem("token", json.token);
      window.location = "profile.html";
    } else {
      alert("Enter Valid details! ");
      return;
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    return;
  }
}

const registerForm = document.querySelector("#register-form");
console.log(registerForm);
const registerButton = document.querySelector("#register-button");
// registerForm.onsumbit = async e => {

// };
registerForm.addEventListener("submit", async event => {
  event.preventDefault();
  registerButton.setAttribute("disabled", true);
  const data = {
    username: registerForm.username.value,
    password: registerForm.password.value,
    first_name: registerForm.firstname.value,
    last_name: registerForm.lastname.value,
    birth_date: registerForm.dob.value,
    email: registerForm.email.value,
    sex: registerForm.sex.value,
    bloodtype: registerForm.bloodtype.value
  };
  await register(data);
  registerButton.setAttribute("disabled", false);
});
isAuthenticated();
