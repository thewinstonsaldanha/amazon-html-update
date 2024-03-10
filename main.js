var products = [];

function addSearchedProduct(data) {
    var containerDiv = document.getElementById("searchedProduct");
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Product Id: ${data.productId}</h5>
                <img class="card-img-top" src="${data.productImage}">
                <h5 class="card-title">${data.productName}</h5>
                <p class="card-text font-italic">${data.productDescription}</p>
                <p class="card-text font-italic">Price: ${data.productPrice}</p>
                <button type="button" class="btn btn-primary mr-2"  onclick="updateHandler(${data.productId})" >Update</button>
                <button type="button" class="btn btn-danger" onclick="deleteHandler(${data.productId})" >Delete</button>
            </div>
        </div>`;
    containerDiv.appendChild(newDiv);
}

function deleteHandler(id) {
    document.getElementById("Home").style.display = "none";
    document.getElementById("add-product-form").style.display = "none";
    document.getElementById("edit-product-form").style.display = "none";
    document.getElementById("delete-product-form").style.display = "block";
    document.getElementById("view-all-product").style.display = "none";
    document.getElementById("deleteProductId").value = id;
}

function addProduct() {
    const productData = {
        productName: document.getElementById("productName").value,
        productPrice: document.getElementById("productPrice").value,
        productDescription: document.getElementById("productDesc").value,
        categoryId: document.getElementById("categoryId").value,
        productImage: document.getElementById("productImage").value
    }
    console.log(productData);

    fetch("http://localhost:8080/postbook/webapi/amazon/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    })
    .then((resp) => {
      /*  if (resp.status === 200) {
           //showAllProducts();
           console.log(resp.json);
            return resp.json();
        } else if (resp.status === 204) {
            //throw new Error("Failed to add product1");
            console.log("faild zala");
        }  */
        console.log(resp);
    })
    .then((data) => {
        if (data.queryStatus == true) {
            products.push(data);
            alert("Product added successfully !");
        } else {
            alert("Failed to add product2");
        }
    })
    .catch((error) => {
		console.log(productData);
		
        console.error("Error:", error);
        alert("Failed to add product3");
    });
}

function editProduct() {
    const productData = {
        productId: document.getElementById("editProductId").value,
        productName: document.getElementById("editProductName").value,
        productDescription: document.getElementById("editProductDesc").value,
        productPrice: document.getElementById("editProductPrice").value,
        productImage: document.getElementById("editProductImage").value
    };

    fetch("http://localhost:8080/postbook/webapi/amazon/products/updateProducts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    })
    .then((resp) => {
        if (resp.status === 200) {
            alert("Product updated successfully !");
            showAllProducts();
            return resp.json();
        } else if (resp.status === 204) {
            throw new Error("Failed to update product");
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to update product");
    });
}

function deleteProduct() {
    const productId = document.getElementById("deleteProductId").value;

    fetch(`http://localhost:8080/postbook/webapi/amazon/products/delete/${productId}`, {
        method: "DELETE",
    })
    .then((resp) => {
        if (resp.status === 200) {
            alert("Product deleted successfully !");
            showAllProducts();
            return resp.json();
        } else if (resp.status === 204) {
            throw new Error("Failed to delete product");
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to delete product");
    });
}

function getProductByName() {
    const productName = document.getElementById("SearchproductName").value;

    fetch(`http://localhost:8080/postbook/webapi/amazon/products/${productName}`, {
        method: "GET",
    })
    .then((resp) => resp.json())
    .then((data) => {
        addSearchedProduct(data);
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to retrieve product");
    });
}

function getAllProducts() {
    fetch("http://localhost:8080/postbook/webapi/amazon/products", {
        method: "GET",
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to retrieve products");
    });
}

function showAllProducts() {
    document.getElementById("add-product-form").style.display = "none";
    document.getElementById("edit-product-form").style.display = "none";
    document.getElementById("delete-product-form").style.display = "none";
    document.getElementById("view-all-products").style.display = "block";

    fetch("http://localhost:8080/postbook/webapi/amazon/products", {
        method: "GET",
    })
    .then((resp) => resp.json())
    .then((data) => {
        const allProductsList = document.getElementById("all-products-list");
        allProductsList.innerHTML = "";

        data.forEach((product) => {
            const listItem = document.createElement("li");
            listItem.textContent = product.productName;
            allProductsList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to retrieve products");
    });
}

function updateHandler(id) {
    document.getElementById("Home").style.display = "none";
    document.getElementById("add-product-form").style.display = "none";
    document.getElementById("edit-product-form").style.display = "block";
    document.getElementById("delete-product-form").style.display = "none";
    document.getElementById("view-all-products").style.display = "none";
    document.getElementById("editProductId").value = id;

    fetch(`http://localhost:8080/postbook/webapi/amazon/products/find/${id}`, {
        method: "GET",
    })
    .then((resp) => resp.json())
    .then((data) => {
        document.getElementById("editProductName").value = data.productName;
        document.getElementById("editProductDesc").value = data.productDescription;
        document.getElementById("editProductPrice").value = data.productPrice;
        document.getElementById("editProductImage").value = data.productImage;
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Failed to retrieve product");
    });
}

function signIn() {
	
	 document.getElementById("Home").style.display = "none";
    document.getElementById("add-product-form").style.display = "none";
    document.getElementById("edit-product-form").style.display = "none";
    document.getElementById("delete-product-form").style.display = "none";
    document.getElementById("view-all-products").style.display = "none";
      document.getElementById("sign-in").style.display = "block";

    
    
  const userEmailInput = document.getElementById("signInEmail");
  const userPasswordInput = document.getElementById("signInPassword");
  const userData = {
    userEmail: userEmailInput.value,
    userPassword: userPasswordInput.value,
  };
  userEmailInput.value = "";
  userPasswordInput.value = "";
 // console.log(userName);

  fetch("http://localhost:8080/postbook/webapi/twitter/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => {
      if (resp.status === 200) {
        // Successful login
        console.log("success");
        alert("Logged In Successfully!");
        document.getElementById("feed-tab").disabled = false;
        document.getElementById("profile-tab").disabled = false;
        document.getElementById("my-tweets-tab").disabled = false;
        document.getElementById("sign-in-tab").hidden = true;
        document.getElementById("sign-up-tab").hidden = true;
        document.getElementById("logout-tab").hidden = false;
        getTweets();
        const feedTabButton = document.getElementById("feed-tab");
        feedTabButton.click();
        console.log(userEmailInput.value)
        
        return resp.json();
      } else if (resp.status === 204) {
        // No content
        throw new Error("Wrong email or password");
      }
    })
    .then((data) => {
      user = data;
      console.log(user);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Email Id and Password is Wrong !");
      
    });
}


function signUp() {
  const userData = {
    userName: document.getElementById("signUpName").value,
    userEmail: document.getElementById("signUpEmail").value,
    userPassword: document.getElementById("signUpPassword").value,
  };
  //console.log(userName);
  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpName").value = "";
  document.getElementById("signUpPassword").value = "";

  fetch("http://localhost:8080/postbook/webapi/twitter/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => {
      if (resp.status === 200) {
        alert("User Register Successfully !");
        return resp.json();
      } else if (resp.status === 204) {
        // No content
        throw new Error("Wrong email or password");
      }
    })
    .then((data) => console.log(data));
}

