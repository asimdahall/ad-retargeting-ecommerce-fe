function setCartItem() {
  let badge = document.querySelector(".badge");
  let cartItems = localStorage.getItem("cartItems");
  badge.innerHTML = cartItems.length;
}
