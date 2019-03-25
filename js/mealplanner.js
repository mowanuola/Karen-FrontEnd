const CONFIG = { API_URL: "http://localhost:8000" };

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.alert("You need to login");
    window.location = "login.html";
  }
}

function getFoodCard(food) {
  return `
    <div id="card">
        <div id="hero-container">
        <span class="material-icons" id="bookmark">bookmark_border</span>
        <img
            src="${food.img ||
              "http://adamletch.com/wp-content/uploads/2018/02/Porti-food-013.jpg"}"
            id="hero"
            alt="Photo of ${food.name || "N/A"}"
        />
        </div>
        <div id="card-content">
        <h4 id="title">${food.name.toUpperCase()}</h4>
        <button id="main-button" class="ripple">${food.calories ||
          "N/A"} Calories</button>
        </div>
    </div>

    `;
}

function displayData(foods) {
  const foodList = document.querySelector("#food-list");
  if (foods.length < 1) {
    foodList.innerHTML = "No foods available";
  } else {
    for (let food of foods) {
      foodList.innerHTML = `
          ${foodList.innerHTML}
          ${getFoodCard(food)}
          `;
    }
  }
}

async function getSuggestedFoods() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${CONFIG.API_URL}/suggested-foods`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const jsonData = await response.json();
    displayData(jsonData.foods);
  } catch (error) {
    console.log(error);
    alert("An error occurred");
  }
}
isAuthenticated();
getSuggestedFoods();
