const apiKey = '748894c8-1339-448c-ae03-a10b44e2f846';
const API_BASE = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
let dishes = [];

function getDishes() {
    return fetch(`http://lab7-api.std-900.ist.mospolytech.ru/api/dishes`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return res.json();
        })
        .then(data => {
            return data;
        }) 
        .catch(error => {
            console.error("Ошибка: ", error);
            return [];
        });
}

async function initDishes() {
    const dishesData = await getDishes();
    dishes = dishesData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });


    displayDishes();
    

    loadOrderFromStorage();

    
    console.log('Блюда загружены:', dishes);
}

document.addEventListener('DOMContentLoaded', function() {
    initDishes();
});