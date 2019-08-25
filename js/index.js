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

  loadMore.addEventListener("click", () => {
    currentDataIndex += 1;

    loadDataIntoDom();
  });

  function setCartItem() {
    let badge = document.querySelector(".badge");
    let cartItems = localStorage.getItem("cartItems") || "[]";
    badge.innerHTML = JSON.parse(cartItems).length;
  }

  function checkLeftOvers() {
    let leftOvers = getItems();
    const urlParams = new URLSearchParams(window.location.search);
    const ap = urlParams.get("ap");
    if (ap) {
      return;
    }
    if (leftOvers.length) {
      console.log(leftOvers.length);
      let randomnum = Math.floor(Math.random() * leftOvers.length);
      const currentData = leftOvers[randomnum];
      if (currentData) {
        const html = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Items you may have missed</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <h1>${currentData.title}</h1>
              <img
                src=${currentData.image}
                alt=""
                class="item-image"
              />
              <div class="desc">
                ${currentData.desc}
              </div>
              <div class="price">
              $${currentData.price}
              </div>
              <div class="load-more-button-container">
              <button id = "load_more">
                <a href = "/description.html?id=${
                  currentData.id
                }">Visit page</a>
              </button>
              </div>
  
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>`;
        modal.innerHTML = html;
        $("#myModal").modal("show");
      }
    }
  }
  checkLeftOvers();

  function loadDataIntoDom() {
    setCurrentData();
    updateDom();
  }

  function fetchData() {
    return fetch("../node_scrapper/darajProductData.json").then(res =>
      res.json()
    );
  }

  function setCurrentData() {
    let data = [...siteData].splice(
      currentData.length,
      currentDataIndex * dataToLoad
    );

    currentData = [...currentData, ...data];
  }

  function loadDesc(e, i) {
    console.log({ e, i });
    if (e.target.tagName === "BUTTON") {
      addToCart(e, i);
      return;
    }
    setItem(siteData[i]);
    let url = `/description.html?id=${i}`;
    window.location.href = url;
  }

  function addToCart(e, i) {
    setItem(siteData[i], "cartItems");
    setCartItem();
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
      b.className = "btn btn-primary";
      b.innerHTML = "Add to cart";
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
      cardDeck.appendChild(card);
    });
  }
  siteData = await fetchData();
  siteDataClone = siteData;
  setCartItem();
  loadDataIntoDom();
  currentData.forEach(data => {});
}
