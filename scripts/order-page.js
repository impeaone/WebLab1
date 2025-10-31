let allDishes = [];

if (typeof getCurrentOrder === 'undefined') {
    window.getCurrentOrder = function() {
        try {
            const orderJSON = localStorage.getItem('foodConstructOrder');
            return orderJSON ? JSON.parse(orderJSON) : [];
        } catch (error) {
            console.error('Ошибка при чтении заказа:', error);
            return [];
        }
    };
}

if (typeof saveOrderToStorage === 'undefined') {
    window.saveOrderToStorage = function(order) {
        try {
            localStorage.setItem('foodConstructOrder', JSON.stringify(order));
        } catch (error) {
            console.error('Ошибка при сохранении заказа:', error);
        }
    };
}

if (typeof clearOrderStorage === 'undefined') {
    window.clearOrderStorage = function() {
        localStorage.removeItem('foodConstructOrder');
    };
}

async function loadOrderPage() {
    try {
        // Загружаем все блюда
        const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=748894c8-1339-448c-ae03-a10b44e2f846`);
        allDishes = await response.json();
        
        displayOrderItems();
        setupFormHandlers();
        initDeliveryTime();
    } catch (error) {
        console.error('Ошибка загрузки страницы заказа:', error);
    }
}

function createOrderItemElement(item) {
    const dishElement = document.createElement('div');
    dishElement.className = 'dish'; // Используем тот же класс что и на странице собрать ланч
    dishElement.setAttribute('data-dish-id', item.id);
    
    dishElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='./assets/placeholder.jpg'">
        <p class="price">${item.price} р</p>
        <p class="name">${item.name}</p>
        <p class="weight">${item.count}</p>
        <button class="remove-button">Удалить</button>
    `;
    
    const removeButton = dishElement.querySelector('.remove-button');
    removeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        removeFromOrder(item.id);
    });
    
    return dishElement;
}

function displayOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    const emptyOrderContainer = document.getElementById('emptyOrder');
    const currentOrder = getCurrentOrder();
    
    if (!Array.isArray(currentOrder) || currentOrder.length === 0) {
        if (orderItemsContainer) orderItemsContainer.style.display = 'none';
        if (emptyOrderContainer) emptyOrderContainer.style.display = 'block';
        updateOrderSummary();
        return;
    }
    
    if (emptyOrderContainer) emptyOrderContainer.style.display = 'none';
    if (orderItemsContainer) {
        orderItemsContainer.style.display = 'grid';
        orderItemsContainer.className = 'dishes-container'; // Используем тот же класс
        orderItemsContainer.innerHTML = '';
        
        currentOrder.forEach(item => {
            const dishElement = createOrderItemElement(item);
            orderItemsContainer.appendChild(dishElement);
        });
    }
    
    updateOrderSummary();
}

function removeFromOrder(dishId) {
    let currentOrder = getCurrentOrder();
    if (!Array.isArray(currentOrder)) {
        currentOrder = [];
    }
    currentOrder = currentOrder.filter(item => item && item.id !== dishId);
    saveOrderToStorage(currentOrder);
    displayOrderItems();
}

function updateOrderSummary() {
    const currentOrder = getCurrentOrder();
    if (!Array.isArray(currentOrder)) {
        return;
    }
    
    const totalCost = currentOrder.reduce((sum, item) => sum + (item.price || 0), 0);
    
    // Обновляем скрытые поля формы
    const categories = [
        { storage: 'soup', field: 'soup_id', display: 'soup', label: 'Суп' },
        { storage: 'main-course', field: 'main_course_id', display: 'bludo', label: 'Главное блюдо' },
        { storage: 'drink', field: 'drink_id', display: 'drink', label: 'Напиток' },
        { storage: 'salad', field: 'salad_id', display: 'salad', label: 'Салат' },
        { storage: 'dessert', field: 'dessert_id', display: 'dessert', label: 'Десерт' }
    ];
    
    categories.forEach(({ storage, field, display, label }) => {
        const fieldElement = document.getElementById(`Buy${display.charAt(0).toUpperCase() + display.slice(1)}`);
        const displayElement = document.getElementById(display);
        const containerElement = document.getElementById(`Order${display.charAt(0).toUpperCase() + display.slice(1)}`);
        
        if (fieldElement && displayElement && containerElement) {
            const dish = currentOrder.find(item => item.category === storage);
            if (dish) {
                fieldElement.value = dish.id;
                displayElement.textContent = `${dish.name} - ${dish.price} р`;
                containerElement.style.display = 'block';
            } else {
                fieldElement.value = '';
                displayElement.textContent = label === 'Главное блюдо' ? 'Не выбрано' : 'Не выбран';
                containerElement.style.display = 'block';
            }
        }
    });
    
    // Обновляем итоговую стоимость
    const costDisplay = document.getElementById('cost');
    if (costDisplay) {
        costDisplay.textContent = `${totalCost} р`;
    }
}

function setupFormHandlers() {
    const form = document.getElementById('form');
    const resetButton = document.getElementById('resetOrder');
    const submitButton = document.getElementById('submitOrderBtn');
    
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите очистить заказ?')) {
                clearOrderStorage();
                displayOrderItems();
            }
        });
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }
    
    // Полностью предотвращаем стандартную отправку формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            return false;
        });
    }
}

function initDeliveryTime() {
    const radio1 = document.getElementById("time-asap");
    const radio2 = document.getElementById("time-specified");
    const timeContainer = document.getElementById("delivery-time-container");
    
    if (!radio1 || !radio2 || !timeContainer) return;
    
    timeContainer.style.display = "none";
    
    radio1.addEventListener('change', function () {
        if (this.checked) {
            timeContainer.style.display = "none";
        }
    });
    
    radio2.addEventListener('change', function () {
        if (this.checked) {
            timeContainer.style.display = "block";
        }
    });
}

async function submitOrder() {
    const currentOrder = getCurrentOrder();
    
    if (!Array.isArray(currentOrder) || currentOrder.length === 0) {
        alert('Заказ пуст. Добавьте блюда перед оформлением.');
        return;
    }
    
    // Проверяем валидность комбо
    const selected = {
        soup: currentOrder.some(item => item.category === 'soup'),
        main: currentOrder.some(item => item.category === 'main-course'),
        salad: currentOrder.some(item => item.category === 'salad'),
        drink: currentOrder.some(item => item.category === 'drink'),
        dessert: currentOrder.some(item => item.category === 'dessert')
    };
    
    if (typeof checkCombo === 'function' && !checkCombo(selected)) {
        if (typeof showNotification === 'function') {
            showNotification(selected);
        } else {
            alert('Выбранные блюда не соответствуют ни одному из доступных комбо.');
        }
        return;
    }
    
    // Проверяем наличие напитка
    if (!selected.drink) {
        alert('Для оформления заказа необходимо выбрать напиток');
        return;
    }
    
    // Получаем данные формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subscribe = document.getElementById('subscribe').checked ? 1 : 0;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
    const comment = document.getElementById('comment').value;
    
    // Подготавливаем данные для отправки
    const orderData = {
        full_name: name,
        email: email,
        subscribe: subscribe,
        phone: phone,
        delivery_address: address,
        delivery_type: deliveryType,
        comment: comment
    };
    
    // Добавляем время доставки если нужно
    if (deliveryType === 'by_time') {
        const deliveryTime = document.getElementById('delivery-time').value;
        if (!deliveryTime) {
            alert('Пожалуйста, укажите время доставки');
            return;
        }
        orderData.delivery_time = deliveryTime;
    }
    
    // Добавляем ID блюд
    currentOrder.forEach(item => {
        const fieldName = getFieldNameByCategory(item.category);
        if (fieldName) {
            orderData[fieldName] = item.id;
        }
    });
    
    try {
        // Показываем сообщение о начале отправки
        const submitBtn = document.getElementById('submitOrderBtn');
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=748894c8-1339-448c-ae03-a10b44e2f846', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка сервера: ' + response.status);
        }
        
        const result = await response.json();
        console.log('Заказ успешно отправлен:', result);
        
        // Очищаем заказ после успешной отправки
        clearOrderStorage();
        
        // Показываем сообщение об успехе
        alert('Заказ успешно оформлен!');
        
        // Перенаправляем на страницу собрать ланч
        window.location.href = 'make_lunch.html';
        
    } catch (error) {
        console.error('Ошибка оформления заказа:', error);
        alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
        
        // Возвращаем кнопку в исходное состояние
        const submitBtn = document.getElementById('submitOrderBtn');
        submitBtn.textContent = 'Отправить заказ';
        submitBtn.disabled = false;
    }
}

function getFieldNameByCategory(category) {
    const fieldMap = {
        'soup': 'soup_id',
        'main-course': 'main_course_id',
        'drink': 'drink_id',
        'salad': 'salad_id',
        'dessert': 'dessert_id'
    };
    return fieldMap[category];
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', loadOrderPage);