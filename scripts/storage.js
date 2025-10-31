// Функции для работы с localStorage - глобальные функции

window.getCurrentOrder = function() {
    try {
        const orderJSON = localStorage.getItem('foodConstructOrder');
        if (!orderJSON) return [];
        
        const order = JSON.parse(orderJSON);
        // Убеждаемся, что это массив
        return Array.isArray(order) ? order : [];
    } catch (error) {
        console.error('Ошибка при чтении заказа из localStorage:', error);
        return [];
    }
}

window.saveOrderToStorage = function(order) {
    try {
        // Убеждаемся, что сохраняем массив
        if (Array.isArray(order)) {
            localStorage.setItem('foodConstructOrder', JSON.stringify(order));
        } else {
            console.error('Попытка сохранить не массив в заказ:', order);
            localStorage.setItem('foodConstructOrder', JSON.stringify([]));
        }
    } catch (error) {
        console.error('Ошибка при сохранении заказа в localStorage:', error);
    }
}

window.clearOrderStorage = function() {
    try {
        localStorage.removeItem('foodConstructOrder');
        console.log('Заказ очищен из localStorage');
        
        // Принудительно обновляем интерфейс
        if (typeof updateOrderPanel === 'function') {
            updateOrderPanel();
        }
        if (typeof displayOrderItems === 'function') {
            displayOrderItems();
        }
    } catch (error) {
        console.error('Ошибка при очистке заказа:', error);
    }
}

window.loadOrderFromStorage = function() {
    const currentOrder = getCurrentOrder();
    if (typeof updateOrderPanel === 'function') {
        updateOrderPanel();
    }
    if (typeof highlightSelectedDishes === 'function') {
        highlightSelectedDishes();
    }
    return currentOrder;
}

window.updateOrderPanel = function() {
    const orderPanel = document.getElementById('orderPanel');
    const panelCost = document.getElementById('panelCost');
    const orderButton = document.getElementById('orderButton');
    
    if (!orderPanel || !panelCost || !orderButton) return;
    
    const currentOrder = getCurrentOrder();
    const totalCost = Array.isArray(currentOrder) ? currentOrder.reduce((sum, item) => sum + (item.price || 0), 0) : 0;
    
    // Обновляем стоимость
    panelCost.textContent = totalCost;
    
    // Показываем/скрываем панель
    if (Array.isArray(currentOrder) && currentOrder.length > 0) {
        orderPanel.style.display = 'block';
        
        // Проверяем валидность комбо
        const isValidCombo = checkComboValidity(currentOrder);
        if (isValidCombo) {
            orderButton.classList.remove('disabled');
            orderButton.style.pointerEvents = 'auto';
            orderButton.style.opacity = '1';
        } else {
            orderButton.classList.add('disabled');
            orderButton.style.pointerEvents = 'none';
            orderButton.style.opacity = '0.6';
        }
    } else {
        orderPanel.style.display = 'none';
    }
}

function checkComboValidity(order) {
    if (!Array.isArray(order)) return false;
    
    const selected = {
        soup: order.some(item => item.category === 'soup'),
        main: order.some(item => item.category === 'main-course'),
        salad: order.some(item => item.category === 'salad'),
        drink: order.some(item => item.category === 'drink'),
        dessert: order.some(item => item.category === 'dessert')
    };
    
    return typeof checkCombo === 'function' ? checkCombo(selected) : false;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof loadOrderFromStorage === 'function') {
            loadOrderFromStorage();
        }
    }, 500);
});