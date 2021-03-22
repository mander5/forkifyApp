import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const prevPageMarkup = `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>`;
    const nextPageMarkup = `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    // Page 1 (there are other pages)
    if (this._data.page === 1 && numPages > 1) {
      return nextPageMarkup;
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return prevPageMarkup;
    }
    // Other page
    if (this._data.page < numPages) {
      return nextPageMarkup + prevPageMarkup;
    }
    // Page 1 (no other pages)
    return '';
  }
}

export default new PaginationView();
