document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const filterBtn = e.target;
            const category = filterBtn.getAttribute('data-category');
            const kind = filterBtn.getAttribute('data-kind');
            
            const isActive = filterBtn.classList.contains('active');
            
            const allFilters = document.querySelectorAll(`.filters .filter-btn[data-category="${category}"]`);
            allFilters.forEach(btn => btn.classList.remove('active'));
            
            if (!isActive) {
                filterBtn.classList.add('active');
                filterDishes(category, kind);
            } else {
                showAllDishes(category);
            }
        }
    });
});

function filterDishes(category, kind) {
    const dishesContainers = document.querySelectorAll('.dishes-container');
    
    dishesContainers.forEach(container => {
        const dishes = container.querySelectorAll('.dish');
        
        dishes.forEach(dish => {
            const dishCategory = getDishCategory(dish);
            const dishKind = dish.getAttribute('data-kind');
            
            if (dishCategory === category && dishKind === kind) {
                dish.style.display = 'flex';
            } else if (dishCategory === category) {
                dish.style.display = 'none';
            }
        });
    });
}

function showAllDishes(category) {
    const dishesContainers = document.querySelectorAll('.dishes-container');
    
    dishesContainers.forEach(container => {
        const dishes = container.querySelectorAll('.dish');
        
        dishes.forEach(dish => {
            const dishCategory = getDishCategory(dish);
            if (dishCategory === category) {
                dish.style.display = 'flex';
            }
        });
    });
}

function getDishCategory(dishElement) {
    const container = dishElement.closest('.dishes-container');
    const section = container.closest('section');
    
    if (section.classList.contains('soups')) return 'soup';
    if (section.classList.contains('mains')) return 'main';
    if (section.classList.contains('drinks')) return 'drink';
    if (section.classList.contains('salads')) return 'salad';
    if (section.classList.contains('desserts')) return 'dessert';
    
    return '';
}
