const CONFIG = { API_URL: "http://localhost:8000" };

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location = "profile.html";
  }
}
async function login(data) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem("token", json.token);
      window.location = "profile.html";
    } else {
      alert("Invalid login!");
      return;
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    return;
  }
}

const loginForm = document.querySelector("#login-form");
console.log(loginForm);
const loginButton = document.querySelector("#login-button");
// loginForm.onsumbit = async e => {

// };
loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  loginButton.setAttribute("disabled", true);
  const data = {
    username: loginForm.username.value,
    password: loginForm.password.value
  };
  await login(data);
  loginButton.setAttribute("disabled", false);
});
isAuthenticated();