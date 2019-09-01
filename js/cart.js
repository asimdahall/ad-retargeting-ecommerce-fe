window.addEventListener("DOMContentLoaded", init);

async function init() {
  $(".id");
  let siteData = [];
  let siteDataClone = [];
  let currentData = [];
  let currentDataIndex = 1;
  let dataToLoad = 12;
  const cardDeck = document.querySelector(".card-container");
  const loadMore = document.querySelector("#load_more");
  const modal = document.querySelector("#myModal");
  const search = document.querySelector("#search");

  //event-listeners
  search.addEventListener("submit", e => {
    e.preventDefault();
    let value = e.target.search.value;
    currentData = [];
    currentDataIndex = 1;
    clearCard();
    siteData = siteDataClone.filter(item => item.title.includes(value));
    loadDataIntoDom();
    search.reset();
  });

  function setCartItem() {
    let badge = document.querySelector(".badge");
    let cartItems = localStorage.getItem("cartItems");
    badge.innerHTML = JSON.parse(cartItems).length;
  }

  function loadDataIntoDom() {
    setCurrentData();
    updateDom();
  }

  function setCurrentData() {
    currentData = siteData;
    console.log({ currentData });
  }

  function loadDesc(e, i) {
    setItem(siteData[i]);
    let url = `/description.html?id=${i}`;

    window.location.href = url;
  }

  //localstorage
  function setItem(data, id = "clickedItems") {
    let clickedItems = getItems();
    if (clickedItems.some(item => item.id === data.id)) {
      return;
    }
    localStorage.setItem(id, JSON.stringify([...getItems(), data]));
  }

  function getItems(id = "clickedItems") {
    return JSON.parse(localStorage.getItem(id)) || [];
  }

  function clearCard() {
    cardDeck.innerHTML = "";
  }

  function updateDom() {
    cardDeck.innerHTML = "";
    currentData.forEach((item, i) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card col0-md-4");
      card.addEventListener("click", e => loadDesc(e, item.id));
      let b = document.createElement("button");
      b.className = "btn btn-success";
      b.addEventListener("click", e => addToCart(e, i));
      card.innerHTML = ` <img class="card-img-top" src=${
        item.image
      } alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">
         ${item.desc.slice(1, 60)}...
      </p>
    
    </div>`;
      card.appendChild(b);
      b.className = "btn btn-success";
      b.innerHTML = "Checkout from cart";
      cardDeck.appendChild(card);
    });
  }
  siteData = getItems("cartItems");
  siteDataClone = siteData;
  setCartItem();

  loadDataIntoDom();
}
