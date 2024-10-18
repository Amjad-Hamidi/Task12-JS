const getProductCategories = async (productId) => {
    // Replace with the actual API endpoint to get the product details
    const response = await axios.get(`https://dummyjson.com/products/${productId}`);
    console.log(response.data);
    return response.data.category; // Assuming the API returns categories in this format
};

const displayProductCategories = async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId'); // Get productId from the URL
    const categoriesContainer = document.getElementById('category-list');

    try {
        const category = await getProductCategories(productId);
        
        categoriesContainer.innerHTML = category;

    } catch (error) {
        categoriesContainer.innerHTML = "<p>Error loading category for this product.</p>";
        console.error(error);
    }
};

// Call the function on page load
document.addEventListener("DOMContentLoaded", displayProductCategories);
