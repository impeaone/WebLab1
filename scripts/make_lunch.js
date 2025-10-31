// Инициализация времени доставки (для страницы оформления заказа)
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

// Инициализация панели заказа
function initOrderPanel() {
    const orderPanel = document.createElement('div');
    orderPanel.className = 'order-panel';
    orderPanel.id = 'orderPanel';
    orderPanel.style.display = 'none';
    
    orderPanel.innerHTML = `
        <div class="order-panel-content">
            <div class="order-summary">
                <h3>Ваш заказ</h3>
                <p class="total-cost">Итого: <span id="panelCost">0</span> р</p>
            </div>
            <a href="order.html" class="order-button" id="orderButton">Перейти к оформлению</a>
        </div>
    `;
    
    document.body.appendChild(orderPanel);
}

document.addEventListener('DOMContentLoaded', function() {
    initDeliveryTime();
    initOrderPanel();
    updateOrderPanel();
});