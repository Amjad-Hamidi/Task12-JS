// Define functions first
const getProductDetails = async (productId) => {
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    console.log(response);
    console.log(response.data);
    if (!response.data) {
        throw new Error('An error occurred while loading data');
    }
    return response.data;
};

// Define the function before invoking it
const displayProductDetails = async () => {

    const params = new URLSearchParams(window.location.search);
    //console.log(window);
    //console.log(window.location);
    //console.log(window.location.search);
    const productId = params.get('productId'); // Get the product ID from the URL , productId : from api

    try {
        const product = await getProductDetails(productId);

        const productHTML = `
            <div class="prod">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Stock: ${product.stock}</p>
                <p>Discount: ${product.discountPercentage}%</p> 
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating} stars</p>
                <p>Category: ${product.category}</p> <!-- Display category here -->
            </div>
        `;

        document.querySelector('.product-details .row').innerHTML = productHTML;
    } catch (error) {
        document.querySelector('.product-details .row').innerHTML = "<p>An error occurred while loading product details</p>";
    } 
};
// Invoke the function when the page loads
document.addEventListener("DOMContentLoaded", displayProductDetails);
// OR : displayProductDetails();
