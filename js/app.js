


const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText} `
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phone, dataLimit) => {

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    // show 10 product
    const showAll = document.getElementById('show-all');
    if (dataLimit && phone.length > 10) {
        phone = phone.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')

    }

    // display no phone 
    const noPhone = document.getElementById('no-phone')
    if (phone.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    // displayy all pHone 
    phone.forEach(phone => {
        const phoneDiv = document.createElement('div');
        // console.log(phone);
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        
          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary border-0"  data-bs-toggle="modal" data-bs-target="#phoneModal">show Details</button>
         
         
        
          </div>
      </div>
      
        `
        phoneContainer.appendChild(phoneDiv);

        // https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

    });
    // Stop Loader
    toggleLoadSpinner(false);


}

// hander search button
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader 
    /* 
     toggleLoadSpinner(true);
     const searchField = document.getElementById('search-value')
     const searchTextt = searchField.value;
     console.log(searchTextt);
     loadPhones(searchTextt);
     
     */
    procesSearch(10);

})

const toggleLoadSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// Data procesing
function procesSearch(dataLimit) {
    toggleLoadSpinner(true);

    const searchField = document.getElementById('search-value')
    const searchTextt = searchField.value;
    loadPhones(searchTextt, dataLimit);


}

// handel search button click 
document.getElementById('btn-all').addEventListener('click', function () {

    procesSearch();
})

// search input field enter key handler 
document.getElementById('search-value').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        // code enter 
        procesSearch(10);
    }
});

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id} `
    const res = await fetch(url)
    const data = await res.json();
    displayPhonesDetails(data.data);

}

const displayPhonesDetails = phone =>{
    console.log(phone.mainFeatures);
    const modalTitle = document.getElementById('phoneModalLabel');
    modalTitle.innerText=phone.name;

    const phoneDetails =document.getElementById('phone-detail');
    phoneDetails.innerHTML = `
    <p>Relase Date: ${phone.releaseDate ? phone.releaseDate: 'No release Date'}</p>
    <p>Storage: ${phone.mainFeatures.storage} </p>
    <p>Display Size : ${phone.mainFeatures.displaySize} </p>
    <p>Memory : ${phone.mainFeatures.memory} </p>
    `;

}


loadPhones('apple')