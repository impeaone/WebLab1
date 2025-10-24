function displayDishes() {
    const sortedDishes = dishes;
    const soupSection = document.querySelector('.soups');
    const mainsSection = document.querySelector('.mains');
    const drinksSection = document.querySelector('.drinks');
    const saladsSection = document.querySelector('.salads');
    const dessertsSection = document.querySelector('.desserts');
    
    // Очищаем контейнеры перед добавлением
    [soupSection, mainsSection, drinksSection, saladsSection, dessertsSection].forEach(section => {
        const existingContainer = section.querySelector('.dishes-container');
        if (existingContainer) {
            existingContainer.remove();
        }
    });
    
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
    
    // Добавляем фильтры
    addFilters(soupSection, 'soup', ['fish', 'meat', 'veg'], ['рыбный', 'мясной', 'вегетарианский']);
    addFilters(mainsSection, 'main', ['fish', 'meat', 'veg'], ['рыбное', 'мясное', 'вегетарианское']);
    addFilters(saladsSection, 'salad', ['fish', 'meat', 'veg'], ['рыбный', 'мясной', 'вегетарианский']);
    addFilters(drinksSection, 'drink', ['cold', 'hot'], ['холодный', 'горячий']);
    addFilters(dessertsSection, 'dessert', ['small', 'medium', 'large'], ['маленькая порция', 'средняя порция', 'большая порция']);
    
    // Отображаем блюда
    displayAllDishes(sortedDishes, soupCont, mainsCont, drinksCont, saladsCont, dessertsCont);
    
    soupSection.appendChild(soupCont);
    mainsSection.appendChild(mainsCont);
    drinksSection.appendChild(drinksCont);
    saladsSection.appendChild(saladsCont);
    dessertsSection.appendChild(dessertsCont);
    
    // Подсвечиваем выбранные блюда после загрузки
    setTimeout(function() {
        if (typeof highlightSelectedDishes === 'function') {
            highlightSelectedDishes();
        }
    }, 100);
}

function addFilters(section, category, kinds, labels) {
    // Удаляем существующие фильтры
    const existingFilters = section.querySelector('.filters');
    if (existingFilters) {
        existingFilters.remove();
    }
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters';
    
    // Добавляем кнопку "Все"
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.setAttribute('data-kind', 'all');
    allBtn.setAttribute('data-category', category);
    allBtn.textContent = 'Все';
    filtersContainer.appendChild(allBtn);
    
    kinds.forEach((kind, index) => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.setAttribute('data-kind', kind);
        filterBtn.setAttribute('data-category', category);
        filterBtn.textContent = labels[index];
        filtersContainer.appendChild(filterBtn);
    });
    
    section.insertBefore(filtersContainer, section.querySelector('h2').nextSibling);
}

function displayAllDishes(dishesArray, soupCont, mainsCont, drinksCont, saladsCont, dessertsCont) {
    dishesArray.forEach(dish => {
        const dishElem = createDishElement(dish);
        
        if(dish.category === 'soup'){
            soupCont.appendChild(dishElem);
        } else if (dish.category === 'main-course'){
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
    dishElem.setAttribute('data-dish-id', dish.id);
    dishElem.setAttribute('data-dish-keyword', dish.keyword);
    dishElem.setAttribute('data-kind', dish.kind);
    dishElem.setAttribute('data-category', dish.category);
    
    dishElem.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='./assets/placeholder.jpg'">
        <p class="price">${dish.price} р</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
    `;
    
    // Добавляем обработчик клика
    dishElem.addEventListener('click', function() {
        if (typeof toggleDishSelection === 'function') {
            toggleDishSelection(dish, dishElem);
        }
    });
    
    return dishElem;
}

function toggleDishSelection(dish, dishElem) {
    const currentOrder = typeof getCurrentOrder === 'function' ? getCurrentOrder() : [];
    
    if (!Array.isArray(currentOrder)) {
        console.error('currentOrder не является массивом:', currentOrder);
        return;
    }
    
    const dishIndex = currentOrder.findIndex(item => item && item.id === dish.id);
    
    if (dishIndex > -1) {
        // Удаляем блюдо из заказа
        currentOrder.splice(dishIndex, 1);
        dishElem.classList.remove('selected');
    } else {
        // Добавляем блюдо в заказ
        // Проверяем, нет ли уже блюда этой категории
        const categoryType = getCategoryType(dish.category);
        const existingCategoryIndex = currentOrder.findIndex(item => item && getCategoryType(item.category) === categoryType);
        
        if (existingCategoryIndex > -1) {
            // Удаляем предыдущее блюдо этой категории из заказа
            const previousDishId = currentOrder[existingCategoryIndex].id;
            currentOrder.splice(existingCategoryIndex, 1);
            
            // Снимаем выделение с предыдущего блюда этой категории
            const previousDish = document.querySelector(`.dish[data-dish-id="${previousDishId}"]`);
            if (previousDish) {
                previousDish.classList.remove('selected');
            }
        }
        
        currentOrder.push({
            id: dish.id,
            keyword: dish.keyword,
            name: dish.name,
            price: dish.price,
            category: dish.category,
            image: dish.image,
            count: dish.count
        });
        
        dishElem.classList.add('selected');
    }
    
    if (typeof saveOrderToStorage === 'function') {
        saveOrderToStorage(currentOrder);
    }
    if (typeof updateOrderPanel === 'function') {
        updateOrderPanel();
    }
}

function getCategoryType(category) {
    const categoryMap = {
        'soup': 'soup',
        'main-course': 'main',
        'drink': 'drink', 
        'salad': 'salad',
        'dessert': 'dessert'
    };
    return categoryMap[category] || category;
}

function highlightSelectedDishes() {
    const currentOrder = typeof getCurrentOrder === 'function' ? getCurrentOrder() : [];
    
    if (!Array.isArray(currentOrder)) {
        console.error('currentOrder не является массивом в highlightSelectedDishes:', currentOrder);
        return;
    }
    
    const allDishes = document.querySelectorAll('.dish');
    
    allDishes.forEach(dishElem => {
        const dishId = parseInt(dishElem.getAttribute('data-dish-id'));
        const isSelected = currentOrder.some(item => item && item.id === dishId);
        
        if (isSelected) {
            dishElem.classList.add('selected');
        } else {
            dishElem.classList.remove('selected');
        }
    });
}function displayDishes() {
    const sortedDishes = dishes;
    const soupSection = document.querySelector('.soups');
    const mainsSection = document.querySelector('.mains');
    const drinksSection = document.querySelector('.drinks');
    const saladsSection = document.querySelector('.salads');
    const dessertsSection = document.querySelector('.desserts');
    
    // Очищаем контейнеры перед добавлением
    [soupSection, mainsSection, drinksSection, saladsSection, dessertsSection].forEach(section => {
        const existingContainer = section.querySelector('.dishes-container');
        if (existingContainer) {
            existingContainer.remove();
        }
    });
    
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
    
    // Добавляем фильтры
    addFilters(soupSection, 'soup', ['fish', 'meat', 'veg'], ['рыбный', 'мясной', 'вегетарианский']);
    addFilters(mainsSection, 'main', ['fish', 'meat', 'veg'], ['рыбное', 'мясное', 'вегетарианское']);
    addFilters(saladsSection, 'salad', ['fish', 'meat', 'veg'], ['рыбный', 'мясной', 'вегетарианский']);
    addFilters(drinksSection, 'drink', ['cold', 'hot'], ['холодный', 'горячий']);
    addFilters(dessertsSection, 'dessert', ['small', 'medium', 'large'], ['маленькая порция', 'средняя порция', 'большая порция']);
    
    // Отображаем блюда
    displayAllDishes(sortedDishes, soupCont, mainsCont, drinksCont, saladsCont, dessertsCont);
    
    soupSection.appendChild(soupCont);
    mainsSection.appendChild(mainsCont);
    drinksSection.appendChild(drinksCont);
    saladsSection.appendChild(saladsCont);
    dessertsSection.appendChild(dessertsCont);
    
    // Подсвечиваем выбранные блюда после загрузки
    setTimeout(function() {
        if (typeof highlightSelectedDishes === 'function') {
            highlightSelectedDishes();
        }
    }, 100);
}

function addFilters(section, category, kinds, labels) {
    // Удаляем существующие фильтры
    const existingFilters = section.querySelector('.filters');
    if (existingFilters) {
        existingFilters.remove();
    }
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters';
    
    // Добавляем кнопку "Все"
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.setAttribute('data-kind', 'all');
    allBtn.setAttribute('data-category', category);
    allBtn.textContent = 'Все';
    filtersContainer.appendChild(allBtn);
    
    kinds.forEach((kind, index) => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.setAttribute('data-kind', kind);
        filterBtn.setAttribute('data-category', category);
        filterBtn.textContent = labels[index];
        filtersContainer.appendChild(filterBtn);
    });
    
    section.insertBefore(filtersContainer, section.querySelector('h2').nextSibling);
}

function displayAllDishes(dishesArray, soupCont, mainsCont, drinksCont, saladsCont, dessertsCont) {
    dishesArray.forEach(dish => {
        const dishElem = createDishElement(dish);
        
        if(dish.category === 'soup'){
            soupCont.appendChild(dishElem);
        } else if (dish.category === 'main-course'){
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
    dishElem.setAttribute('data-dish-id', dish.id);
    dishElem.setAttribute('data-dish-keyword', dish.keyword);
    dishElem.setAttribute('data-kind', dish.kind);
    dishElem.setAttribute('data-category', dish.category);
    
    dishElem.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='./assets/placeholder.jpg'">
        <p class="price">${dish.price} р</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
    `;
    
    // Добавляем обработчик клика
    dishElem.addEventListener('click', function() {
        if (typeof toggleDishSelection === 'function') {
            toggleDishSelection(dish, dishElem);
        }
    });
    
    return dishElem;
}

function toggleDishSelection(dish, dishElem) {
    let currentOrder = typeof getCurrentOrder === 'function' ? getCurrentOrder() : [];
    
    if (!Array.isArray(currentOrder)) {
        currentOrder = [];
    }
    
    // Проверяем, есть ли уже это блюдо в заказе
    const existingIndex = currentOrder.findIndex(item => item.id === dish.id);
    
    if (existingIndex > -1) {
        // Удаляем блюдо из заказа
        currentOrder.splice(existingIndex, 1);
        dishElem.classList.remove('selected');
    } else {
        // Удаляем все блюда той же категории из заказа
        const categoryToRemove = getCategoryType(dish.category);
        currentOrder = currentOrder.filter(item => getCategoryType(item.category) !== categoryToRemove);
        
        // Снимаем выделение со всех блюд этой категории
        const allDishes = document.querySelectorAll('.dish');
        allDishes.forEach(dishEl => {
            if (getCategoryType(dishEl.getAttribute('data-category')) === categoryToRemove) {
                dishEl.classList.remove('selected');
            }
        });
        
        // Добавляем новое блюдо
        currentOrder.push({
            id: dish.id,
            keyword: dish.keyword,
            name: dish.name,
            price: dish.price,
            category: dish.category,
            image: dish.image,
            count: dish.count
        });
        
        dishElem.classList.add('selected');
    }
    
    if (typeof saveOrderToStorage === 'function') {
        saveOrderToStorage(currentOrder);
    }
    if (typeof updateOrderPanel === 'function') {
        updateOrderPanel();
    }
}

function getCategoryType(category) {
    const categoryMap = {
        'soup': 'soup',
        'main-course': 'main',
        'drink': 'drink', 
        'salad': 'salad',
        'dessert': 'dessert'
    };
    return categoryMap[category] || category;
}

function highlightSelectedDishes() {
    const currentOrder = typeof getCurrentOrder === 'function' ? getCurrentOrder() : [];
    
    if (!Array.isArray(currentOrder)) {
        return;
    }
    
    // Снимаем все выделения
    const allDishes = document.querySelectorAll('.dish');
    allDishes.forEach(dish => {
        dish.classList.remove('selected');
    });
    
    // Выделяем только блюда из заказа
    currentOrder.forEach(item => {
        const dishElement = document.querySelector(`.dish[data-dish-id="${item.id}"]`);
        if (dishElement) {
            dishElement.classList.add('selected');
        }
    });
}