let cost = 0;
let soupsValue = 0;
let mainValue = 0;
let drinkValue = 0;
document.addEventListener('DOMContentLoaded', function () {
	const block = document.querySelectorAll('.dish')
	block.forEach(block => {
		block.addEventListener('click', function() {
			updateOrder(block);
		});
	
	});
});


function updateOrder (block) {
	const id = block.getAttribute('data-dish');
	const soupID = document.getElementById('OrderSoup');
	const mainID = document.getElementById('OrderMain');
	const drinkID = document.getElementById('OrderDrink');
	const costID = document.getElementById('OrderCost');
	const nan = document.getElementById('nan');
	nan.style.display = 'none';
	costID.style.display = 'block';
	soupID.style.display = 'block';
	mainID.style.display = 'block';
	drinkID.style.display = 'block';
	dishes.forEach(dish => {
		if(dish.keyword === id){
			if(dish.category === 'soup'){
				soupsValue = dish.price;
				let parg = document.getElementById('soup');
				parg.innerHTML =`${dish.name} ${dish.price} р`;
				let soup = document.getElementById('BuySoup');
				soup.value = `${dish.keyword}`; 
				
				
			} else if (dish.category === 'main'){
				mainValue = dish.price;
				let parg = document.getElementById('bludo');
				parg.innerHTML =`${dish.name} ${dish.price} р`;	
				
				let soup = document.getElementById('BuyMain');
				soup.value = `${dish.keyword}`; 
				
			} else if (dish.category === 'drink'){
				drinkValue = dish.price;
				let parg = document.getElementById('drink');
				parg.innerHTML =`${dish.name} ${dish.price} р`;
				let soup = document.getElementById('BuyDrink');
				soup.value = `${dish.keyword}`; 
			}
		} 
	});
	const costs = document.getElementById('cost');
	cost = soupsValue + mainValue + drinkValue;
	costs.textContent = `${cost} р`;
	
	let costItog = document.getElementById('BuyCost');
	costItog.value = `${cost}`; 
}
