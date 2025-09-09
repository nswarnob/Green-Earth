const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const allPlantsBtn = document.getElementById("all-plants")

// category btn form the api and display in dom 
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            const categories = data.categories;
           displayCategory(categories)
        })
};

const displayCategory = (categories)=>{
     categories.forEach(cat => {
                categoriesContainer.innerHTML += `<button id="${cat.id}" class="category-btn cursor-pointer block mt-3 font-semibold text-[15px] ">${cat.category_name}</button>`
            });


// active button feature 
categoriesContainer.addEventListener("click", (e)=>{

    const allBtn = document.querySelectorAll(".category-btn")
allBtn.forEach(btn =>{
    btn.classList.remove("bg-[#15803D]", "text-white", "px-3", "py-1", "rounded-xl")
})

   if(e.target.localName === 'button'){
       e.target.classList.add("bg-[#15803D]", "text-white", "px-3", "py-1", "rounded-xl")
    loadPlanByCategory(e.target.id);  
    }
    
   
})
};


// showing plants by clicking category 
const loadPlanByCategory = (categoryId)=>{
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data=>{
        displayPlanByCategory(data.plants);
    })
}

const displayPlanByCategory =(plants)=>{

    plants.forEach(plant =>{
        cardContainer.innerHTML += `
         <div class="max-w-xs bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <!-- Content -->
                    <div class="p-4 space-y-3">
                        <!-- Image Placeholder -->
                        <div class="bg-gray-200 rounded-md">
                        <img src="${plant.image}" class="h-[200px] w-[400px] rounded-sm">
                        </div>
                        <!-- Title -->
                        <h2 class="text-sm font-semibold text-gray-800">${plant.name}</h2>

                        <!-- Description -->
                        <p class="text-gray-500 text-xs">
                            ${plant.description}
                        </p>

                        <!-- Tag + Price -->
                        <div class="flex items-center justify-between">
                            <span class="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                               ${plant.category}
                            </span>
                            <span class="text-gray-800 font-semibold">${plant.price}</span>
                        </div>

                        <!-- Button -->
                        <button
                            class="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-full mt-3">
                            Add to Cart
                        </button>
                    </div>
                </div>
        `
    })

}








loadCategory();