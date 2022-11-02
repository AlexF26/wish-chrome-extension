function renderExtension() {
  function getAllProducts() {
    let arr = document.querySelectorAll('.dHSFPx');

    function hasAd(node) {
      // filter out ads defined by classes
      let ad1 = node.querySelector('.eVA-dTh');
      let ad2 = node.querySelector('.kUPMZa');
      return ad1 || ad2 ? false : true;
    }

    const filteredArr = [...arr].filter(hasAd);
    return filteredArr;
  }

  function getRandomProduct() {
    const productsArray = getAllProducts();
    const randomNumber = Math.floor(Math.random() * productsArray.length);
    return productsArray[randomNumber];
  }

  // inject wish hero section on top of page
  const main = document.querySelector('.TabBarWrapper__Wrapper-sc-1gl60ef-0');
  const content = `<div class="prize-section"><div class="prize-container">
      <div class="prize-content-container">
        <h1 class="prize-headline">WISH GAMESHOW</h1>
        <p class="prize-description"
          >Go to a page of your choice and click the button to win a random prize from the list of products below.</p
        >
        <button class="prize-button" id="prize-button">Win a Prize!</button>
      </div>
      <div class="prize-product-container">
      <img class="prize-image" src="https://res.cloudinary.com/dmnixrpra/image/upload/v1666922707/prize-lg.svg"/>
      </div>
    </div>
    <div class="prize-accumulated-container">
    <div class="prize-dropdown">Show Previous Prizes</div>
    </div>
    </div`;

  main.insertAdjacentHTML('afterbegin', content);

  // Duplicate prize and show it in the hero section
  const button = document.getElementById('prize-button');
  button.addEventListener('click', generatePrize);
  const prizeContainer = document.querySelector('.prize-product-container');

  function generatePrize() {
    const product = getRandomProduct();
    const clonedProduct = product.cloneNode(true);

    // reset container and add new generated product
    prizeContainer.innerHTML = '';
    prizeContainer.appendChild(clonedProduct);

    // new product properties
    const img = clonedProduct.querySelector('.eLMFZk').src;
    const link = clonedProduct.querySelector('.jyPXiE').href;
    const price = clonedProduct.querySelector('.hPJCiL').textContent;
    const newProduct = new CreateProduct(img, link, price);

    // show past products won
    const prizeArrayHTML = document.querySelector('.prize-accumulated-container');
    prizeArrayHTML.innerHTML += newProduct.createCard();
  }

  function CreateProduct(img, link, price) {
    this.img = img;
    this.link = link;
    this.price = price;
    this.createCard = function () {
      return `<a href="${this.link}" class="prize-acc-item">
      <img src="${this.img}"/>
      </a>`;
    };
  }

  // dropdown functionality
  const dropdownButton = document.querySelector('.prize-dropdown');
  dropdownButton.addEventListener('click', () => {
    const prizeListContainer = document.querySelector(
      '.prize-accumulated-container'
    );
    prizeListContainer.classList.toggle('visible');
  });
}

renderExtension(); // init extension
