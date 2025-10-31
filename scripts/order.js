let cost = 0;
let soupsValue = 0;
let mainValue = 0;
let drinkValue = 0;
let saladValue = 0;
let dessertValue = 0;

// Ждем загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOrder);
} else {
    initOrder();
}

function initOrder() {
    // Добавляем обработчики только если есть элементы
    const dishesContainer = document.querySelector('.dishes-container');
    if (dishesContainer) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('.dish')) {
                updateOrder(e.target.closest('.dish'));
            }
        });
    }

    // Инициализация сброса формы
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('reset', function() {
            resetOrder();
        });
    }
}

function updateOrder(block) {
    if (!block) return;
    
    const id = block.getAttribute('data-dish');
    const soupID = document.getElementById('OrderSoup');
    const mainID = document.getElementById('OrderMain');
    const drinkID = document.getElementById('OrderDrink');
    const saladID = document.getElementById('OrderSalad');
    const dessertID = document.getElementById('OrderDessert');
    const costID = document.getElementById('OrderCost');
    const nan = document.getElementById('nan');
    
    // Проверяем существование элементов
    if (!soupID || !mainID || !drinkID || !saladID || !dessertID || !costID || !nan) return;
    
    if (nan) nan.style.display = 'none';
    if (costID) costID.style.display = 'block';
    
    // Находим блюдо
    let foundDish = null;
    if (typeof dishes !== 'undefined' && Array.isArray(dishes)) {
        foundDish = dishes.find(dish => dish.keyword === id);
    }
    
    if (!foundDish) return;
    
    const dish = foundDish;
    
    if(dish.category === 'soup'){
        soupsValue = dish.price;
        let parg = document.getElementById('soup');
        if (parg) parg.innerHTML =`${dish.name} ${dish.price} р`;
        let soup = document.getElementById('BuySoup');
        if (soup) soup.value = `${dish.keyword}`;
        if (soupID) soupID.style.display = 'block';
        
    } else if (dish.category === 'main-course'){
        mainValue = dish.price;
        let parg = document.getElementById('bludo');
        if (parg) parg.innerHTML =`${dish.name} ${dish.price} р`;	
        let main = document.getElementById('BuyMain');
        if (main) main.value = `${dish.keyword}`;
        if (mainID) mainID.style.display = 'block';
        
    } else if (dish.category === 'drink'){
        drinkValue = dish.price;
        let parg = document.getElementById('drink');
        if (parg) parg.innerHTML =`${dish.name} ${dish.price} р`;
        let drink = document.getElementById('BuyDrink');
        if (drink) drink.value = `${dish.keyword}`;
        if (drinkID) drinkID.style.display = 'block';
        
    } else if (dish.category === 'salad'){
        saladValue = dish.price;
        let parg = document.getElementById('salad');
        if (parg) parg.innerHTML =`${dish.name} ${dish.price} р`;
        let salad = document.getElementById('BuySalad');
        if (salad) salad.value = `${dish.keyword}`;
        if (saladID) saladID.style.display = 'block';
        
    } else if (dish.category === 'dessert'){
        dessertValue = dish.price;
        let parg = document.getElementById('dessert');
        if (parg) parg.innerHTML =`${dish.name} ${dish.price} р`;
        let dessert = document.getElementById('BuyDessert');
        if (dessert) dessert.value = `${dish.keyword}`;
        if (dessertID) dessertID.style.display = 'block';
    }
    
    const costs = document.getElementById('cost');
    cost = soupsValue + mainValue + drinkValue + saladValue + dessertValue;
    if (costs) costs.textContent = `${cost} р`;
    
    let costItog = document.getElementById('BuyCost');
    if (costItog) costItog.value = `${cost}`;
}

function resetOrder() {
    cost = 0;
    soupsValue = 0;
    mainValue = 0;
    drinkValue = 0;
    saladValue = 0;
    dessertValue = 0;
    
    const elements = [
        'OrderSoup', 'OrderMain', 'OrderDrink', 'OrderSalad', 'OrderDessert', 'OrderCost'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });
    
    const nan = document.getElementById('nan');
    if (nan) nan.style.display = 'block';
    
    const buyElements = [
        'BuySoup', 'BuyMain', 'BuyDrink', 'BuySalad', 'BuyDessert', 'BuyCost'
    ];
    
    buyElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = 'none';
    });
    
    const displayElements = {
        'soup': 'Блюдо не выбрано',
        'bludo': 'Блюдо не выбрано',
        'drink': 'Напиток не выбран',
        'salad': 'Блюдо не выбрано',
        'dessert': 'Блюдо не выбрано',
        'cost': '0 р'
    };
    
    Object.keys(displayElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = displayElements[id];
    });
}