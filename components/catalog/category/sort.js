function toggleSortVisible() {
    const catList = document.querySelector('.catalog__navigation-category-select-list');
    const sortList = document.querySelector('.catalog__navigation-sort-list');
    sortList.classList.toggle('hidden');
    catList.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const sortTypes = document.querySelectorAll('[data-sort]');
    const sortListTitle = document.querySelector('.catalog__navigation-sort-type');
    for (const sortType of sortTypes) {
        sortType.addEventListener('click', function(e) {
            let sortBy = this.getAttribute('data-sort');
            let oldActiveItem = document.querySelector('.catalog__navigation-sort-list-item.active');
            oldActiveItem.classList.remove('active');
            e.target.classList.add('active');
            sortListTitle.innerHTML = e.target.textContent;
            toggleSortVisible();
            getCategories(sortBy);
        });
    }
});