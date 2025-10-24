const API_KEY = '748894c8-1339-448c-ae03-a10b44e2f846';
const API_BASE = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
let allOrders = [];
let allDishes = [];
let currentDeleteOrderId = null;

// Загрузка страницы
document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
});

// Загрузка списка заказов
async function loadOrders() {
    try {
        showLoading(true);
        
        // Загружаем заказы и блюда параллельно
        const [ordersResponse, dishesResponse] = await Promise.all([
            fetch(`${API_BASE}/orders?api_key=${API_KEY}`),
            fetch(`${API_BASE}/dishes?api_key=${API_KEY}`)
        ]);
        
        if (!ordersResponse.ok) throw new Error('Ошибка загрузки заказов');
        if (!dishesResponse.ok) throw new Error('Ошибка загрузки блюд');
        
        allOrders = await ordersResponse.json();
        allDishes = await dishesResponse.json();
        
        // Сортируем заказы по дате (новые сначала)
        allOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        displayOrders();
        showLoading(false);
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        showError('Не удалось загрузить заказы');
        showLoading(false);
    }
}

// Отображение списка заказов
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (allOrders.length === 0) {
        ordersList.innerHTML = '<div class="loading"><p>У вас пока нет заказов</p></div>';
        return;
    }
    
    ordersList.innerHTML = allOrders.map((order, index) => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-number">Заказ #${index + 1}</div>
                    <div class="order-date">${formatDate(order.created_at)}</div>
                </div>
            </div>
            
            <div class="order-content">
                <div class="order-dishes">
                    <strong>Состав:</strong> ${getOrderDishesText(order)}
                </div>
                <div class="order-cost">
                    ${order.total_cost || calculateOrderCost(order)} ₽
                </div>
                <div class="order-delivery-time">
                    <strong>Доставка:</strong><br>
                    ${getDeliveryTimeText(order)}
                </div>
            </div>
            
            <div class="order-actions">
                <button class="action-btn view-btn" onclick="viewOrder(${order.id})" title="Подробнее">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editOrder(${order.id})" title="Редактировать">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="action-btn delete-btn" onclick="confirmDeleteOrder(${order.id})" title="Удалить">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Получение текста состава заказа
function getOrderDishesText(order) {
    const dishes = [];
    
    if (order.soup_id) {
        const dish = allDishes.find(d => d.id === order.soup_id);
        if (dish) dishes.push(dish.name);
    }
    
    if (order.main_course_id) {
        const dish = allDishes.find(d => d.id === order.main_course_id);
        if (dish) dishes.push(dish.name);
    }
    
    if (order.salad_id) {
        const dish = allDishes.find(d => d.id === order.salad_id);
        if (dish) dishes.push(dish.name);
    }
    
    if (order.drink_id) {
        const dish = allDishes.find(d => d.id === order.drink_id);
        if (dish) dishes.push(dish.name);
    }
    
    if (order.dessert_id) {
        const dish = allDishes.find(d => d.id === order.dessert_id);
        if (dish) dishes.push(dish.name);
    }
    
    return dishes.join(', ');
}

// Расчет стоимости заказа
function calculateOrderCost(order) {
    let cost = 0;
    
    if (order.soup_id) {
        const dish = allDishes.find(d => d.id === order.soup_id);
        if (dish) cost += dish.price;
    }
    
    if (order.main_course_id) {
        const dish = allDishes.find(d => d.id === order.main_course_id);
        if (dish) cost += dish.price;
    }
    
    if (order.salad_id) {
        const dish = allDishes.find(d => d.id === order.salad_id);
        if (dish) cost += dish.price;
    }
    
    if (order.drink_id) {
        const dish = allDishes.find(d => d.id === order.drink_id);
        if (dish) cost += dish.price;
    }
    
    if (order.dessert_id) {
        const dish = allDishes.find(d => d.id === order.dessert_id);
        if (dish) cost += dish.price;
    }
    
    return cost;
}

// Получение текста времени доставки
function getDeliveryTimeText(order) {
    if (order.delivery_type === 'by_time' && order.delivery_time) {
        return order.delivery_time;
    }
    return 'Как можно скорее<br>(с 7:00 до 23:00)';
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Просмотр заказа
async function viewOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = document.getElementById('viewModalContent');
    modalContent.innerHTML = `
        <div class="modal-field">
            <label>Имя:</label>
            <div>${order.full_name}</div>
        </div>
        <div class="modal-field">
            <label>Email:</label>
            <div>${order.email}</div>
        </div>
        <div class="modal-field">
            <label>Телефон:</label>
            <div>${order.phone}</div>
        </div>
        <div class="modal-field">
            <label>Адрес доставки:</label>
            <div>${order.delivery_address}</div>
        </div>
        <div class="modal-field">
            <label>Время доставки:</label>
            <div>${getDeliveryTimeText(order)}</div>
        </div>
        <div class="modal-field">
            <label>Состав заказа:</label>
            <div class="dishes-list">
                ${getOrderDishesList(order)}
            </div>
        </div>
        <div class="modal-field">
            <label>Стоимость:</label>
            <div>${calculateOrderCost(order)} ₽</div>
        </div>
        ${order.comment ? `
        <div class="modal-field">
            <label>Комментарий:</label>
            <div>${order.comment}</div>
        </div>
        ` : ''}
        <div class="modal-field">
            <label>Дата оформления:</label>
            <div>${formatDate(order.created_at)}</div>
        </div>
    `;
    
    openModal('viewModal');
}

// Получение списка блюд для модального окна
function getOrderDishesList(order) {
    const dishes = [];
    
    const addDish = (dishId, category) => {
        if (dishId) {
            const dish = allDishes.find(d => d.id === dishId);
            if (dish) {
                dishes.push(`<div class="dish-item"><strong>${category}:</strong> ${dish.name} - ${dish.price} ₽</div>`);
            }
        }
    };
    
    addDish(order.soup_id, 'Суп');
    addDish(order.main_course_id, 'Главное блюдо');
    addDish(order.salad_id, 'Салат');
    addDish(order.drink_id, 'Напиток');
    addDish(order.dessert_id, 'Десерт');
    
    return dishes.join('');
}

// Редактирование заказа
async function editOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = document.getElementById('editModalContent');
    modalContent.innerHTML = `
        <div class="modal-field">
            <label for="editFullName">Имя *</label>
            <input type="text" id="editFullName" name="full_name" value="${order.full_name}" required>
        </div>
        <div class="modal-field">
            <label for="editEmail">Email *</label>
            <input type="email" id="editEmail" name="email" value="${order.email}" required>
        </div>
        <div class="modal-field">
            <label for="editPhone">Телефон *</label>
            <input type="tel" id="editPhone" name="phone" value="${order.phone}" required>
        </div>
        <div class="modal-field">
            <label for="editAddress">Адрес доставки *</label>
            <input type="text" id="editAddress" name="delivery_address" value="${order.delivery_address}" required>
        </div>
        <div class="modal-field">
            <label>Тип доставки *</label>
            <div>
                <label>
                    <input type="radio" name="delivery_type" value="now" ${order.delivery_type === 'now' ? 'checked' : ''}>
                    Как можно скорее
                </label>
                <label style="display: block; margin-top: 5px;">
                    <input type="radio" name="delivery_type" value="by_time" ${order.delivery_type === 'by_time' ? 'checked' : ''}>
                    Ко времени
                </label>
            </div>
        </div>
        <div class="modal-field" id="editTimeField" style="${order.delivery_type === 'by_time' ? '' : 'display: none;'}">
            <label for="editDeliveryTime">Время доставки</label>
            <input type="time" id="editDeliveryTime" name="delivery_time" value="${order.delivery_time || ''}" min="07:00" max="23:00" step="300">
        </div>
        <div class="modal-field">
            <label for="editComment">Комментарий</label>
            <textarea id="editComment" name="comment">${order.comment || ''}</textarea>
        </div>
        <input type="hidden" id="editOrderId" value="${order.id}">
    `;
    
    // Обработчик изменения типа доставки
    document.querySelectorAll('input[name="delivery_type"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('editTimeField').style.display = 
                this.value === 'by_time' ? 'block' : 'none';
        });
    });
    
    openModal('editModal');
}

// Подтверждение удаления заказа
function confirmDeleteOrder(orderId) {
    currentDeleteOrderId = orderId;
    openModal('deleteModal');
}

// Удаление заказа
async function deleteOrder() {
    if (!currentDeleteOrderId) return;
    
    try {
        const response = await fetch(`${API_BASE}/orders/${currentDeleteOrderId}?api_key=${API_KEY}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Ошибка удаления заказа');
        
        // Удаляем заказ из списка
        allOrders = allOrders.filter(order => order.id !== currentDeleteOrderId);
        
        // Обновляем отображение
        displayOrders();
        
        // Закрываем модальное окно
        closeModal('deleteModal');
        
        // Показываем сообщение об успехе
        showSuccess('Заказ успешно удален');
        
        currentDeleteOrderId = null;
        
    } catch (error) {
        console.error('Ошибка удаления:', error);
        showError('Не удалось удалить заказ');
    }
}

// Сохранение изменений заказа
async function saveOrderChanges(formData) {
    const orderId = document.getElementById('editOrderId').value;
    
    try {
        const response = await fetch(`${API_BASE}/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Ошибка сохранения заказа');
        
        const updatedOrder = await response.json();
        
        // Обновляем заказ в списке
        const index = allOrders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            allOrders[index] = { ...allOrders[index], ...updatedOrder };
        }
        
        // Обновляем отображение
        displayOrders();
        
        // Закрываем модальное окно
        closeModal('editModal');
        
        // Показываем сообщение об успехе
        showSuccess('Заказ успешно обновлен');
        
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        showError('Не удалось сохранить изменения');
    }
}

// Управление модальными окнами
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Утилиты
function showLoading(show) {
    document.getElementById('loadingMessage').style.display = show ? 'block' : 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.orders-container').insertBefore(successDiv, document.getElementById('ordersList'));
    setTimeout(() => successDiv.remove(), 5000);
}

// Обработчики событий
document.getElementById('editOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        full_name: document.getElementById('editFullName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        delivery_address: document.getElementById('editAddress').value,
        delivery_type: document.querySelector('input[name="delivery_type"]:checked').value,
        comment: document.getElementById('editComment').value
    };
    
    if (formData.delivery_type === 'by_time') {
        const deliveryTime = document.getElementById('editDeliveryTime').value;
        if (!deliveryTime) {
            showError('Пожалуйста, укажите время доставки');
            return;
        }
        formData.delivery_time = deliveryTime;
    }
    
    saveOrderChanges(formData);
});

document.getElementById('confirmDeleteBtn').addEventListener('click', deleteOrder);

// Закрытие модальных окон при клике вне контента
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(this.id);
        }
    });
});