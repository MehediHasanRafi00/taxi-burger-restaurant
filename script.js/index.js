const loadCategory = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadFoods = (id) => {
  document.getElementById("food-container").classList.add("hidden");
  document.getElementById("loding-spinner").classList.remove("hidden");

  const url = id
    ? `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
    : "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";

  const catBtns = document.querySelectorAll(".btn-category");

  catBtns.forEach((btn) => btn.classList.remove("active"));

  const currentBtn = document.getElementById(`cat-btn-${id}`);
  currentBtn.classList.add("active");

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
};

const loadFoodDetails = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data.details));
};

const loadRandomData = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  for (let category of categories) {
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
        <button id="cat-btn-${category.id}" onclick="loadFoods(${category.id})" class="btn justify-start btn-block shadow btn-category">
            <img
              src="${category.categoryImg}"
              alt=""
              class="w-10"
            />${category.categoryName}
          </button>
        `;
    categoryContainer.append(categoryCard);
  }
};

const displayFoods = (foods) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";

  foods.forEach((food) => {
    const foodCard = document.createElement("div");
    foodCard.innerHTML = `
    <div onclick="loadFoodDetails(${food.id})" class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${food.price}</span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
    `;
    foodContainer.append(foodCard);
  });

  document.getElementById("food-container").classList.remove("hidden");
  document.getElementById("loding-spinner").classList.add("hidden");
};

// "id": 52794,
// "title": "Vegan Chocolate Cake",
// "catId": 11,
// "foodImg": "https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg",
// "price": 695,
// "video": "https://www.youtube.com/watch?v=C3pAgB7pync",
// "category": "Vegan",
// "area": "American"

const displayModal = (food) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
          
        <div>
            <h2 class="text-3xl font-bold">${food.title}</h2>
        </div>
        <div>
            <img src="${food.foodImg}" alt="">
        </div>
        <div class="badge badge-primary">
            ${food.area}
        </div>
        <a href="${food.video}" target="_black" class="btn btn-warning">Watch Video</a>
  `;
  document.getElementById("my_modal_3").showModal();
};

loadCategory();
loadRandomData();
