(() => {
  let saleId = localStorage.getItem("saleId");
  let productId = document.querySelector("#productId");
  let productName = document.querySelector("#productName");
  let quantity = document.querySelector("#quantity");
  let price = document.querySelector("#price");
  let submitBtn = document.querySelector("#submitForm");
  let createBtn = document.querySelector("#createSale")

  implantValues = () => {
    productId.value = localStorage.getItem("productId");
    productName.value = localStorage.getItem("productName");
    quantity.value = localStorage.getItem("quantity");
    price.value = localStorage.getItem("price");

    // Clear localStorage
    localStorage.removeItem("saleId");
    localStorage.removeItem("productId");
    localStorage.removeItem("productName");
    localStorage.removeItem("quantity");
    localStorage.removeItem("price");
  };

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const data = {
        "salesId": saleId,
        "productId": productId.value,
        "productName": productName.value,
        "quantity": quantity.value,
        "price": price.value
    };

    fetch("http://localhost:8081/updateRecord", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      })
      .then((data) => {
          console.log(data);
          window.location.href = "./index.html"
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  });

  createBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const data = {
        "productId": productId.value,
        "productName": productName.value,
        "quantity": quantity.value,
        "price": price.value
    };

    fetch("http://localhost:8081/addRecord", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      })
      .then((data) => {
          console.log(data);
          window.location.href = "./index.html"
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  });

  implantValues();
})(window);
