
function displayDishes() {
	const sortedDishes = dishes.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
	const soupSection = document.querySelector('.soups');
	const mainsSection = document.querySelector('.mains');
	const drinksSection = document.querySelector('.drinks');
	
	const soupCont = document.createElement('div');
	const mainsCont = document.createElement('div');
	const drinksCont = document.createElement('div');
	soupCont.className = 'dishes-container';
	mainsCont.className = 'dishes-container';
	drinksCont.className = 'dishes-container';
	
	sortedDishes.forEach(dish => {
		const dishElem = document.createElement('div');
		
		dishElem.className = 'dish';
		dishElem.setAttribute('data-dish', dish.keyword);
		
		
		dishElem.innerHTML = `
			<img src="${dish.image}" alt="${dish.name}">
			<p class="price">${dish.price}</p>
			<p class="name">${dish.name}</p>
			<p class="weight">${dish.count}</p>
		`;
		if(dish.category === 'soup'){
			soupCont.appendChild(dishElem);
		} else if (dish.category === 'main'){
			mainsCont.appendChild(dishElem);
		} else if (dish.category === 'drink'){
			drinksCont.appendChild(dishElem);
		}	
	});
	
	soupSection.appendChild(soupCont);
	mainsSection.appendChild(mainsCont);
	drinksSection.appendChild(drinksCont);
	
}

document.addEventListener('DOMContentLoaded', displayDishes);