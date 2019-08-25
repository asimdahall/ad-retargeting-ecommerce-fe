window.addEventListener("DOMContentLoaded", init);
let siteData = [];
let currentData = {};
let currentId = 0;

async function init() {
  console.log("ok");
  let loadMore = document.querySelector("#load_more");
  let jumbotron = document.querySelector(".jumbotron");
  //event-listeners

  //   loadMore.addEventListener("click", () => {
  //     // loadDataIntoDom();
  //   });

  function setCartItem() {
    let badge = document.querySelector(".badge");
    let cartItems = localStorage.getItem("cartItems") || [];
    badge.innerHTML = JSON.parse(cartItems).length;
  }

  function setCurrentData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    currentData = siteData[id];
  }
  function loadDataIntoDom() {
    setCurrentData();
    updateDom();
  }

  function fetchData() {
    console.log("...fetching");
    return fetch("../node_scrapper/darajProductData.json").then(res =>
      res.json()
    );
  }

  function updateDom() {
    console.log(currentData);
    let content = ` <h1>${currentData.title}</h1>
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
      <button id="load_more">Add to cart</button>
    </div>`;
    jumbotron.innerHTML = content;
  }
  setCartItem();
  siteData = await fetchData();
  loadDataIntoDom();
}
