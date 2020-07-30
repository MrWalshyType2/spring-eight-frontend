(() => {
  let container = document.querySelector("#dataContainer");

  rowCreator = (data) => {
    let row = document.createElement("tr");
    let rowTh = document.createElement("th");
    rowTh.setAttribute("scope", "row");
    let productIdTd = document.createElement("td");
    let productNameTd = document.createElement("td");
    let quantityTd = document.createElement("td");
    let priceTd = document.createElement("td");
    let functionTd = document.createElement("td");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    rowTh.innerText = data.salesId;
    productIdTd.innerText = data.productId;
    productNameTd.innerText = data.productName;
    quantityTd.innerText = data.quantity;
    priceTd.innerText = data.price;

    editButton.classList = "btn btn-warning";
    editButton.innerText = "Edit";
    deleteButton.classList = "btn btn-danger";
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("href", `http://localhost:8081/deleteRecord/${data.salesId}`);

    editButton.addEventListener("click", (event) => {
        localStorage.setItem("saleId", data.salesId);
        localStorage.setItem("productId", data.productId);
        localStorage.setItem("productName", data.productName);
        localStorage.setItem("quantity", data.quantity);
        localStorage.setItem("price", data.price);
        window.location.href = "./edit.html";
    });

    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      deleteData(deleteButton.getAttribute("href"));
      location.reload();
    });

    functionTd.appendChild(editButton);
    functionTd.appendChild(deleteButton);

    row.appendChild(rowTh);
    row.appendChild(productIdTd);
    row.appendChild(productNameTd);
    row.appendChild(quantityTd);
    row.appendChild(priceTd);
    row.appendChild(functionTd);

    return row;
  };

  fetchData = (url) => {
    fetch(url)
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
        let dataCount = data.length;

        for (let i = 0; i < dataCount; i++) {
          let row = rowCreator(data[i]);
          container.appendChild(row);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  };

  deleteData = (url) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  };

  fetchData("http://localhost:8081/get/all");
})(window);
