const CONFIG = { API_URL: "http://localhost:8000" };

const firstNameInput = document.querySelector("#firstname");
const lastNameInput = document.querySelector("#lastname");
const bloodTypeInput = document.querySelector("#bloodtype");
const sexInput = document.querySelector("#sex");

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.alert("You need to login");
    window.location = "login.html";
  }
}

async function updateProfile(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${CONFIG.API_URL}/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      alert("Profile Updated!");
      window.location = "profile.html";
    } else {
      alert("Error Occured!");
      return;
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    return;
  }
}

const editprofileForm = document.querySelector("#editprofile-form");
const editprofileButton = document.querySelector("#editprofile-button");

editprofileForm.addEventListener("submit", async event => {
  event.preventDefault();
  editprofileButton.setAttribute("disabled", true);
  const data = {
    first_name: editprofileForm.firstname.value,
    last_name: editprofileForm.lastname.value,
    sex: editprofileForm.sex.value,
    bloodtype: editprofileForm.bloodtype.value
  };
  await updateProfile(data);
  editprofileButton.setAttribute("disabled", false);
});

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
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred");
    return;
  }
}
function displayData(data) {
  sexInput.value = data.sex;
  firstNameInput.value = data.firstname || "";
  lastNameInput.value = data.lastname || "";
  sexInput.value = data.sex;
  bloodTypeInput.value = data.bloodtype;
}

getData();
