document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = validateOrder();
        
        if (isValid) {
            form.submit();
        }
    });
});

function validateOrder() {
    const selectedDishes = getSelectedDishes();
    
    const isValidCombo = checkCombo(selectedDishes);
    
    if (!isValidCombo) {
        showNotification(selectedDishes);
        return false;
    }
    
    return true;
}

function getSelectedDishes() {
    const selected = {
        soup: document.getElementById('BuySoup').value !== 'none',
        main: document.getElementById('BuyMain').value !== 'none',
        salad: document.getElementById('BuySalad').value !== 'none',
        drink: document.getElementById('BuyDrink').value !== 'none',
        dessert: document.getElementById('BuyDessert').value !== 'none'
    };
    
    return selected;
}

function checkCombo(selected) {
    const validCombos = [
        // Комбо 1: Суп + Главное + Салат + Напиток
        { soup: true, main: true, salad: true, drink: true, dessert: false },
        { soup: true, main: true, salad: true, drink: true, dessert: true },
        
        // Комбо 2: Суп + Главное + Напиток
        { soup: true, main: true, salad: false, drink: true, dessert: false },
        { soup: true, main: true, salad: false, drink: true, dessert: true },
        
        // Комбо 3: Суп + Салат + Напиток
        { soup: true, main: false, salad: true, drink: true, dessert: false },
        { soup: true, main: false, salad: true, drink: true, dessert: true },
        
        // Комбо 4: Главное + Салат + Напиток
        { soup: false, main: true, salad: true, drink: true, dessert: false },
        { soup: false, main: true, salad: true, drink: true, dessert: true },
        
        // Комбо 5: Главное + Напиток
        { soup: false, main: true, salad: false, drink: true, dessert: false },
        { soup: false, main: true, salad: false, drink: true, dessert: true }
    ];
    
    // Проверка на соответствие
    return validCombos.some(combo => 
        combo.soup === selected.soup &&
        combo.main === selected.main &&
        combo.salad === selected.salad &&
        combo.drink === selected.drink
    );
}

function showNotification(selectedDishes) {
    // тип уведомления
    const notificationType = getNotificationType(selectedDishes);
    
	
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let title, message;
    
    switch(notificationType) {
        case 'nothing':
            title = 'Ничего не выбрано';
            message = 'Выберите блюда для заказа';
            break;
            
        case 'drink':
            title = 'Выберите напиток';
            message = 'Для завершения заказа выберите напиток';
            break;
            
        case 'main_salad':
            title = 'Выберите главное блюдо/салат/стартер';
            message = 'К супу нужно добавить главное блюдо или салат';
            break;
            
        case 'soup_main':
            title = 'Выберите суп или главное блюдо';
            message = 'К салату нужно добавить суп или главное блюдо';
            break;
            
        case 'main':
            title = 'Выберите главное блюдо';
            message = 'Для заказа нужно выбрать главное блюдо';
            break;
            
        default:
            title = 'Неверная комбинация';
            message = 'Выберите один из доступных вариантов комбо';
    }
    
    notification.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <button class="notification-button">Окей</button>
    `;
    
    overlay.appendChild(notification);
    document.body.appendChild(overlay);
    
    const button = notification.querySelector('.notification-button');
    button.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

function getNotificationType(selected) {
    const hasSoup = selected.soup;
    const hasMain = selected.main;
    const hasSalad = selected.salad;
    const hasDrink = selected.drink;
    const hasDessert = selected.dessert;
    
    // 1. Ничего не выбрано
    if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
        return 'nothing';
    }
    
    // 2. Выбраны все необходимые блюда, кроме напитка
    if ((hasSoup && hasMain && hasSalad && !hasDrink) ||
        (hasSoup && hasMain && !hasSalad && !hasDrink) ||
        (hasSoup && !hasMain && hasSalad && !hasDrink) ||
        (!hasSoup && hasMain && hasSalad && !hasDrink) ||
        (!hasSoup && hasMain && !hasSalad && !hasDrink)) {
        return 'drink';
    }
    
    // 3. Выбран суп, но не выбраны главное блюдо/салат/стартер
    if (hasSoup && !hasMain && !hasSalad) {
        return 'main_salad';
    }
    
    // 4. Выбран салат/стартер, но не выбраны суп/главное блюдо
    if (hasSalad && !hasSoup && !hasMain) {
        return 'soup_main';
    }
    
    // 5. Выбран напиток/десерт, но не выбрано главное блюдо
    if ((hasDrink || hasDessert) && !hasMain && !hasSoup) {
        return 'main';
    }
    return 'default';
}