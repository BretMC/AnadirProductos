class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");

    const str = `
      <div class="toast show mt-4" style="box-shadow: unset;" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header d-flex justify-content-between">
          <strong class="me-auto">${product.name}</strong>
          <div class="d-flex align-items-center justify-content-end">
            <small class="me-2">${product.year}</small>
            <button type="button" class="btn-close custom-close" style="width: 30px; height: 30px;" data-bs-dismiss="toast" name="delete" aria-label="cerrar">
              &#x2716;
            </button>
          </div>
        </div>
        <div class="toast-body">Precio Q. ${product.price}</div>
      </div>`;

    element.innerHTML = str;
    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      const toastElement = element.closest(".toast");
      if (toastElement) {
        toastElement.remove();
        this.showMessage("Producto eliminado correctamente", "skyblue");
      }
    }
  }

  showMessage(message, color) {
    const messagesDiv = document.getElementById("messages");
    const div = document.createElement("div");

    
    div.className = `alert mt-2`;  
    div.style.fontSize = "16px";
    div.style.color = "white";
    div.style.padding = "10px";
    div.style.textAlign = "left";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = color;
    div.style.fontWeight = "bold";
    div.style.height = "50px";
    div.style.maxWidth = "1110px";
    div.style.margin = "0 auto";
    div.style.marginTop = "50px";

    div.appendChild(document.createTextNode(message));
    messagesDiv.appendChild(div);

    setTimeout(function () {
      div.remove();
    }, 2000);
  }
}

document.getElementById("product-form").addEventListener("submit", function (e) {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;

  const product = new Product(name, price, year);
  const ui = new UI();

  let hasError = false;

  if (name === "") {
    document.getElementById("name-error").style.display = "block";
    hasError = true;
  } else {
    document.getElementById("name-error").style.display = "none";
  }

  if (price === "") {
    document.getElementById("price-error").style.display = "block";
    hasError = true;
  } else {
    document.getElementById("price-error").style.display = "none";
  }

  if (year === "" || year < 1900 || year > new Date().getFullYear()) {
    document.getElementById("year-error").style.display = "block";
    hasError = true;
  } else {
    document.getElementById("year-error").style.display = "none";
  }

  if (hasError) {
    ui.showMessage("Por favor, complete todos los campos.", "red"); 
    e.preventDefault();
    return;
  }

  ui.addProduct(product);
  ui.showMessage("Producto añadido correctamente", "green");
  ui.resetForm();
  e.preventDefault();
});

document.getElementById("product-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});

