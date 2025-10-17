function displayDishes() {
    const sortedDishes = dishes;
    const soupSection = document.querySelector('.soups');
    const mainsSection = document.querySelector('.mains');
    const drinksSection = document.querySelector('.drinks');
    const saladsSection = document.querySelector('.salads');
    const dessertsSection = document.querySelector('.desserts');
    
    const soupCont = document.createElement('div');
    const mainsCont = document.createElement('div');
    const drinksCont = document.createElement('div');
    const saladsCont = document.createElement('div');
    const dessertsCont = document.createElement('div');
    
    soupCont.className = 'dishes-container';
    mainsCont.className = 'dishes-container';
    drinksCont.className = 'dishes-container';
    saladsCont.className = 'dishes-container';
    dessertsCont.className = 'dishes-container';
    

    addFilters(soupSection, 'soup', ['fish', 'meat', 'veg'], ['рыбный', 'мясной', 'вегетарианский']);
    addFilters(mainsSection, 'main', ['fish', 'meat', 'veg'], ['рыбное', 'мясное', 'вегетарианское']);
    addFilters(saladsSection, 'salad', ['fish', 'meat', 'veg'], ['рыбный', 'мясной', 'вегетарианский']);
    addFilters(drinksSection, 'drink', ['cold', 'hot'], ['холодный', 'горячий']);
    addFilters(dessertsSection, 'dessert', ['small', 'medium', 'large'], ['маленькая порция', 'средняя порция', 'большая порция']);
    

    displayAllDishes(sortedDishes, soupCont, mainsCont, drinksCont, saladsCont, dessertsCont);
    
    soupSection.appendChild(soupCont);
    mainsSection.appendChild(mainsCont);
    drinksSection.appendChild(drinksCont);
    saladsSection.appendChild(saladsCont);
    dessertsSection.appendChild(dessertsCont);
}

function addFilters(section, category, kinds, labels) {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters';
    
    kinds.forEach((kind, index) => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.setAttribute('data-kind', kind);
        filterBtn.setAttribute('data-category', category);
        filterBtn.textContent = labels[index];
        filtersContainer.appendChild(filterBtn);
    });
    
    section.appendChild(filtersContainer);
}

function displayAllDishes(dishesArray, soupCont, mainsCont, drinksCont, saladsCont, dessertsCont) {
    dishesArray.forEach(dish => {
        const dishElem = createDishElement(dish);
        
        if(dish.category === 'soup'){
            soupCont.appendChild(dishElem);
        } else if (dish.category === 'main'){
            mainsCont.appendChild(dishElem);
        } else if (dish.category === 'drink'){
            drinksCont.appendChild(dishElem);
        } else if (dish.category === 'salad'){
            saladsCont.appendChild(dishElem);
        } else if (dish.category === 'dessert'){
            dessertsCont.appendChild(dishElem);
        }
    });
}

function createDishElement(dish) {
    const dishElem = document.createElement('div');
    dishElem.className = 'dish';
    dishElem.setAttribute('data-dish', dish.keyword);
    dishElem.setAttribute('data-kind', dish.kind);
    
    dishElem.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price} р</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
    `;
    
    return dishElem;
}

document.addEventListener('DOMContentLoaded', displayDishes);