import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if (action.type === LOAD_PRODUCTS) {

    let maxPrice = action.payload.map(product => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: {
        ...state.filters, max_price: maxPrice, price: maxPrice
      }
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    const tempProducts = [...filtered_products];
    switch (sort) {
      case "price-lowest":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z":
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false
      }
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;

    const { text, company, category, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];

    if (text) {
      tempProducts = tempProducts.filter(product => product.name.toLowerCase().startsWith(text));
    }

    if (company !== "all") {
      tempProducts = tempProducts.filter(product => product.company === company);
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter(product => product.category === category);
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter(product => product.colors.find(c => c === color));
    }

    tempProducts = tempProducts.filter(product => product.price <= price);

    if (shipping) {
      tempProducts = tempProducts.filter(product => product.shipping)
    }
    return { ...state, filtered_products: tempProducts }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
