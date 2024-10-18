const getCategories = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
    console.log(data);

    return data;
}

const displayCategories = async () => {
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');

    try {
        const categories = await getCategories();

        const result = categories.map(category => {
            return `<div class='category'>
                    <h2>${category}</h2>
                    <a href="categoryDetails.html?category=${category}">Details</a> 
                </div>`
        }).join(' ');

        document.querySelector('.categories .row').innerHTML = result;
    }
    catch (error) {
        document.querySelector('.categories .row').innerHTML = "<p>error loading categories</p>";
    }
    finally {
        loader.classList.remove('active');
    }

}

const getProducts = async (pge) => {
    const skip = (pge - 1) * 10;

    const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    console.log(data);

    return data;
}

const displayProducts = async (page = 1) => { 
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');

    try {
        const data = await getProducts(page);
        const numberOfPages = Math.ceil(data.total / 10); // ceil(19.4) = 20 
                                    // data.total : الكلي products عدد ال
        console.log(numberOfPages); // 20

        const result = data.products.map(product => {
            return `<div class='product'>
            <img src="${product.thumbnail}" alt="${product.description}"/> 
            <h3>${product.title}</h3>
            <span>${product.price}</span>
        </div>`
        }).join(' ');

        document.querySelector('.products .row').innerHTML = result;


        let paginationLink = ``
        if (page == 1) {
            paginationLink += `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>` 
        } else {
            paginationLink += `<li class="page-item"><button onclick=displayProducts('${page - 1}') class="page-link">&laquo;</button></li>` //&laquo : رمز الصفحة الي قبل
        }                                                    //  1 يلي مضغوط عليها رح تكون اقل منها ب page وبعطيها ال getProducts لهاد الفنكشن بستدعي body وبرسل الها رقم الصفحة الي بضغط عليها ثم كالعادة خلال ال  displayProducts Function لما اضغط عليها بفعل
                                                                // اي الي قبلها
        for (let i = 1; i <= numberOfPages; i++) {
            paginationLink += `<li class="page-item ${i == page?'active':''}"><button onclick = displayProducts('${i}') class="page-link" href="#">${i}</button></li>`
        }


        if (page == numberOfPages) {
            paginationLink += `<li class="page-item"><button disabled class="page-link">&raquo;</button></li>` 
            document.querySelector('.pagination').innerHTML = paginationLink
        }
        else {
            paginationLink += `<li class="page-item"><button onclick=displayProducts('${parseInt(page) + 1}') class="page-link">&raquo;</button></li>` //&raquo : رمز الصفحة الي بعد
            document.querySelector('.pagination').innerHTML = paginationLink
        }

    }
    catch (error) {
        document.querySelector('.products .row').innerHTML = "<p>error loading products</p>";
    }
    finally {
        loader.classList.remove('active');
    }
}
displayCategories();
displayProducts();


window.onscroll = function () {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".categories");


    if (window.scrollY > categories.offsetTop) { 
        nav.classList.add("scrollNavBar");
    }
    else {
        nav.classList.remove("scrollNavBar");
    }
}

const countDown = () => {
    const countDownDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime(); 

    const distance = countDownDate - now;

    const days = Math.floor(distance / 86400000); 
    document.querySelector('#days').textContent = days;

    const hours = Math.floor((distance % 86400000) / 3600000); 
    document.querySelector('#hours').textContent = hours;
    
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / 60000);
    document.querySelector('#minutes').textContent = minutes;
    
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector('#seconds').textContent = seconds;

}

setInterval(() => {
    countDown();
}, 1000);


