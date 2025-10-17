let cost = 0;
let soupsValue = 0;
let mainValue = 0;
let drinkValue = 0;
let saladValue = 0;
let dessertValue = 0;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.dish')) {
            updateOrder(e.target.closest('.dish'));
        }
    });
});

function updateOrder(block) {
    const id = block.getAttribute('data-dish');
    const soupID = document.getElementById('OrderSoup');
    const mainID = document.getElementById('OrderMain');
    const drinkID = document.getElementById('OrderDrink');
    const saladID = document.getElementById('OrderSalad');
    const dessertID = document.getElementById('OrderDessert');
    const costID = document.getElementById('OrderCost');
    const nan = document.getElementById('nan');
    
    nan.style.display = 'none';
    costID.style.display = 'block';
    
    dishes.forEach(dish => {
        if(dish.keyword === id){
            if(dish.category === 'soup'){
                soupsValue = dish.price;
                let parg = document.getElementById('soup');
                parg.innerHTML =`${dish.name} ${dish.price} р`;
                let soup = document.getElementById('BuySoup');
                soup.value = `${dish.keyword}`;
                soupID.style.display = 'block';
                
            } else if (dish.category === 'main'){
                mainValue = dish.price;
                let parg = document.getElementById('bludo');
                parg.innerHTML =`${dish.name} ${dish.price} р`;	
                let main = document.getElementById('BuyMain');
                main.value = `${dish.keyword}`;
                mainID.style.display = 'block';
                
            } else if (dish.category === 'drink'){
                drinkValue = dish.price;
                let parg = document.getElementById('drink');
                parg.innerHTML =`${dish.name} ${dish.price} р`;
                let drink = document.getElementById('BuyDrink');
                drink.value = `${dish.keyword}`;
                drinkID.style.display = 'block';
                
            } else if (dish.category === 'salad'){
                saladValue = dish.price;
                let parg = document.getElementById('salad');
                parg.innerHTML =`${dish.name} ${dish.price} р`;
                let salad = document.getElementById('BuySalad');
                salad.value = `${dish.keyword}`;
                saladID.style.display = 'block';
                
            } else if (dish.category === 'dessert'){
                dessertValue = dish.price;
                let parg = document.getElementById('dessert');
                parg.innerHTML =`${dish.name} ${dish.price} р`;
                let dessert = document.getElementById('BuyDessert');
                dessert.value = `${dish.keyword}`;
                dessertID.style.display = 'block';
            }
        } 
    });
    
    const costs = document.getElementById('cost');
    cost = soupsValue + mainValue + drinkValue + saladValue + dessertValue;
    costs.textContent = `${cost} р`;
    
    let costItog = document.getElementById('BuyCost');
    costItog.value = `${cost}`;
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('reset', function() {
        cost = 0;
        soupsValue = 0;
        mainValue = 0;
        drinkValue = 0;
        saladValue = 0;
        dessertValue = 0;
        
        document.getElementById('OrderSoup').style.display = 'none';
        document.getElementById('OrderMain').style.display = 'none';
        document.getElementById('OrderDrink').style.display = 'none';
        document.getElementById('OrderSalad').style.display = 'none';
        document.getElementById('OrderDessert').style.display = 'none';
        document.getElementById('OrderCost').style.display = 'none';
        document.getElementById('nan').style.display = 'block';
        
        document.getElementById('BuySoup').value = 'none';
        document.getElementById('BuyMain').value = 'none';
        document.getElementById('BuyDrink').value = 'none';
        document.getElementById('BuySalad').value = 'none';
        document.getElementById('BuyDessert').value = 'none';
        document.getElementById('BuyCost').value = 'none';
        
        document.getElementById('soup').textContent = 'Блюдо не выбрано';
        document.getElementById('bludo').textContent = 'Блюдо не выбрано';
        document.getElementById('drink').textContent = 'Напиток не выбран';
        document.getElementById('salad').textContent = 'Блюдо не выбрано';
        document.getElementById('dessert').textContent = 'Блюдо не выбрано';
        document.getElementById('cost').textContent = '0 р';
    });
});