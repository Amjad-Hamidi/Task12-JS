const getProducts = async () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);

    return data;
};

const displayProducts = async () => {
    const data = await getProducts();

    const result = data.products.map(product => {
        return `<div class='product'>
            <img src="${product.thumbnail}" alt="${product.description}"/> 
            <h3>${product.title}</h3>
            <span style="display: block;">$${product.price}</span>
            <a href="productDetails.html?productId=${product.id}">View Details</a> 
            <a href="productCategories.html?productId=${product.id}">View Category</a> 
            </div>`
    }).join(' ');

    document.querySelector('.products .row').innerHTML = result;
};
displayProducts();