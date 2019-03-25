const CONFIG = { API_URL: "http://localhost:8000" };
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
      alert("Invalid registration!");
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
