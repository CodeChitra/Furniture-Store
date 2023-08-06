import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if (action.type === ADD_TO_CART) {
    const { amount, color, product } = action.payload;
    const tempItem = state.cart.find(item => item.id === product.id + color);
    if (tempItem) {

      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === product.id + color) {
          let newAmount = cartItem.amount + amount;

          if (newAmount > cartItem.stock) {
            newAmount = cartItem.stock;
          }

          return { ...cartItem, amount: newAmount };
        }
        else {
          return cartItem;
        }
      })

      return { ...state, cart: tempCart }
    }
    else {

      const item = {
        id: product.id + color,
        name: product.name,
        image: product.images[0].url,
        amount,
        color,
        stock: product.stock,
        price: product.price,
      }

      return { ...state, cart: [...state.cart, item] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(item => item.id !== action.payload);
    return { ...state, cart: tempCart }
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {

    const { id, value } = action.payload;

    const tempCart = state.cart.map(item => {
      if (item.id === id) {

        if (value === "inc") {
          let newAmount = item.amount + 1;

          if (newAmount > item.stock) {
            newAmount = item.stock;
          }
          return { ...item, amount: newAmount }
        }
        else {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount }
        }
      }

      else {
        return item;
      }
    })

    return { ...state, cart: tempCart }
  }

  if (action.type === COUNT_CART_TOTALS) {

    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {

      total.total_items += cartItem.amount;
      total.total_amount += cartItem.price * cartItem.amount;

      return total;
    }, {
      total_items: 0,
      total_amount: 0
    })

    return { ...state, total_amount, total_items };
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
