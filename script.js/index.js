let cart = [];
let total = 0;

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
    <div onclick="loadFoodDetails(${food.id})"  class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                
                class="w-[160px] rounded-xl h-[160px] object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="food-price">${food.price}</span> BDT
                </h2>
              </div>

              <button id="add-btn-${food.id}" onclick="addToCart(this)" class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
    `;
    foodContainer.append(foodCard);
    document.getElementById(`add-btn-${food.id}`).addEventListener('click',(e)=> {
        e.stopPropagation();
    })
  });

  document.getElementById("food-container").classList.remove("hidden");
  document.getElementById("loding-spinner").classList.add("hidden");
};

const displayModal = (food) => {
  const detailsContainer = document.getElementById("details-container");
  const ecode = food.video.split("=")[1]
  console.log();
  detailsContainer.innerHTML = `
        <iframe width="985" height="555" src="https://www.youtube.com/embed/${ecode}?si=HqTF1mzxyrMmmnLl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
    
  `;
  document.getElementById("my_modal_3").showModal();
};

loadCategory();
loadRandomData();

// document.getElementById("food-container").addEventListener("click",(e)=>{
//     console.log(e.target);

// })

const addToCart = (btn) => {
  // event.stopImmediatePropagation()
  const card = btn.parentNode.parentNode;
  const foodTitle = card.querySelector(".food-title").innerText;
  const foodImg = card.querySelector(".food-img").src;
  const foodPrice = card.querySelector(".food-price").innerText;
  const foodPriceNum = Number(foodPrice);

  const selectedItem = {
    id: cart.length + 1,
    foodTitle: foodTitle,
    foodImg: foodImg,
    foodPrice: foodPriceNum,
  };
  cart.push(selectedItem);
  total = total + foodPriceNum;
  displayCart(cart);
  displayTotal(total);
};
const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val;
};
const displayCart = (cart) => {
  const cartContainer = document.getElementById("cart-container");

  cartContainer.innerHTML = "";

  for (let i of cart) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
              <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
                <span class="hidden cart-id" >${i.id}</span>
              <img
                src="${i.foodImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1  class="text-xs font-bold food-title">
                ${i.foodTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="item-price">${i.foodPrice}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
    
    `;
    cartContainer.append(newItem);
  }
};

const removeCart = (btn) => {
  const item = btn.parentNode;
  //   const foodTitle = item.querySelector(".food-title").innerText;
  const id = Number(item.querySelector(".cart-id").innerText);
  const foodPrice = Number(item.querySelector(".item-price").innerText);
  cart = cart.filter((item) => item.id !== id);
  total = 0;
  cart.forEach((item) => (total += item.foodPrice));
  displayCart(cart);
  displayTotal(total);
};
