import superrequest from '../utils/superrequest';
import GlobalState from '../utils/GlobalState';

const CategoriesStateName = 'CategoriesType';

export default class {
  static get categories() {
    return this._categories || {};
  }

  static get categoryArray() {
    return Object.entries(this._categories).map(entry => ({
      label: entry[1].name,
      value: entry[0]
    }));
  }

  static getCategoriesAsOptions(categoryKeys = []) {
    return categoryKeys.map(key => (
      this.categories[key]
        ? {
          label: this.categories[key].name,
          value: key
        }
        : null))
      .filter(categoryOption => categoryOption);
  }

  static getLeafCategoriesAsOptions(rootCategory) {
    const parent = this.categories[rootCategory];
    if (!parent) return [];
    const children = parent.children.map(child => child.type);
    return this.getCategoriesAsOptions(children);
  }

  static async fetchCategories() {
    return superrequest.get('/api/v1/blog/categories')
      .then((response) => {
        if (response && response.ok) {
          this._categories = {};
          response.data.forEach((category) => {
            this._categories[category.type] = category;
          });
          GlobalState.setState(CategoriesStateName, this.categories);
        }
      });
  }

  static useCategoriesState(component) {
    GlobalState.useState(CategoriesStateName, null, component);
    if (!this._categories) {
      this.fetchCategories();
    }
  }

  static isBelongsToCategory(post, categoryName) {
    if (!post || !categoryName) return false;
    const targetCategory = this._categories[categoryName];
    return post.categories.some(
      postCategory => (
        postCategory.type === targetCategory.type
        || targetCategory.children.some(childCategory => childCategory.type === postCategory.type)
      )
    );
  }
}
