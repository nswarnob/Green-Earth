// all container
const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container")



// category btn form the api and display in dom 
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            const categories = data.categories;
            displayCategory(categories)
        })

};

const displayCategory = (categories) => {
    categories.forEach(cat => {
        categoriesContainer.innerHTML += `<button id="${cat.id}" class="category-btn cursor-pointer block mt-3 font-semibold text-[15px] ">${cat.category_name}</button>`
    });


    // active button feature 
    categoriesContainer.addEventListener("click", (e) => {
        const allBtn = document.querySelectorAll(".category-btn")
        allBtn.forEach(btn => {
            btn.classList.remove("bg-[#15803D]", "text-white", "px-3", "py-1", "rounded-xl")
        })


        if (e.target.localName === 'button') {
            e.target.classList.add("bg-[#15803D]", "text-white", "px-3", "py-1", "rounded-xl")

            if (e.target.id === "all-plants") {
                displayPlanByAll(e.target.id)
            }
            else {
                loadPlanByCategory(e.target.id);
            }
        }
    })
};

// showing plants by clicking category 
const loadPlanByCategory = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            displayPlanByCategory(data.plants);
        })
}

const displayPlanByCategory = (categorisedPlants) => {
    cardContainer.innerHTML = ' ';
    categorisedPlants.forEach(plant => {
        cardContainer.innerHTML += `
         <div class="details max-w-xs bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <!-- Content -->
                    <div class="p-4 space-y-3">
                        <!-- Image Placeholder -->
                        <div class="bg-gray-200 rounded-md">
                        <img src="${plant.image}" class="h-[200px] w-[300px] rounded-sm object-cover">
                        </div>
                        <!-- Title -->
                        <h2 class="text-sm font-semibold text-gray-800 plant-title">${plant.name}</h2>

                        <!-- Description -->
                        <p class="text-gray-500 text-xs">
                            ${plant.description}
                        </p>

                        <!-- Tag + Price -->
                        <div class="flex items-center justify-between">
                            <span class="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                               ${plant.category}
                            </span>
                            <span class="text-gray-800 font-semibold plant-price">${plant.price}</span>
                        </div>

                        <!-- Button -->
                        <button 
                            class="cart-btn w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-full mt-3">
                            Add to Cart
                        </button>
                    </div>
                </div>
        `
    })


}

// All buttons feature and by default 
const displayPlanByAll = () => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
        .then(res => res.json())
        .then(data => {
            const allPlants = data.plants
            displayPlanByCategory(allPlants)
        })



}

// add to the cart
cardContainer.addEventListener("click", (plant) => {
    if (plant.target.classList.contains("cart-btn")) {

        const card = plant.target.closest(".details");
        const plantTitle = card.querySelector(".plant-title").innerText;
        const plantPrice = card.querySelector(".plant-price").innerText;

        cartContainer.innerHTML += `
         <div  class="cart-box flex items-center justify-between p-3 rounded-lg bg-[#F0FDF4]">
                    <div>
                        <h2 class="font-semibold">${plantTitle}</h2>
                        <p class="text-gray-400" data-price="${plantPrice}">${plantPrice}x 1</p>
                    </div>
                    <div id="cross" class="cut-btn text-gray-400 font-medium bg-white h-6 w-6 text-center rounded-full hover:bg-gray-400 hover:text-white hover:transition-transform">X</div>
                </div>
                
        `
    }
    updateTotal();
});

// remove cart & substract
cartContainer.addEventListener("click", (plant) => {
    if (plant.target.classList.contains("cut-btn")) {
        plant.target.closest(".cart-box").remove(); 
        updateTotal(); 
    }
});

// total 
const updateTotal =()=> {
    const totalPriceEl = document.getElementById("total");
    const cartBoxes = cartContainer.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(box => {
        const price = box.querySelector("p");
        total += Number(price.dataset.price);
    });

    totalPriceEl.innerText = total;
}


// function calling here 
loadCategory();
displayPlanByAll();