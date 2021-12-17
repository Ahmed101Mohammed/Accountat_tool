// First stib:
const getAllProducts = async ()=>{

    const res = await fetch("/getproducts")
    try {
      const data = await res.json();
      console.log(data);
      for (i of data)
      {
        let row = document.createElement('tr');
        table.appendChild(row);
        row.innerHTML = `
                            <td>${i._id}</td>
                            <td>${i.name}</td>
                            <td>${i.price}</td>
                            <td><i class="far fa-edit edit"></i></td>
                            <td><i class="fas fa-trash-alt delet"></i></td>
                            <td><a><i class="fas fa-info info"></i></a></td>
                        `
        id_arr.push(i._id);
      }
      
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
getAllProducts();
// vars:
let edit = false;
let addDataButton;
let cancelButton;
let id_arr = [];
let addDataButtonFE;
let cancelButtonFE;
// Posts & Gets:

  //post product Data:
const postProductData = async ( url = '/postProdactData', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

    //post product Data:
const postProductUpdateData = async ( url = '/postProductUpdateData', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
    // post deleting element's code:
const postDeletingData = async ( url = '/postDeletingData', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
      
      try {
        const newData = await response.json();
        console.log(newData);
        row.remove();
        return newData;
        }catch(error) {
      console.log("error", error);
      }
    }
// post INfo to the server:
const postInfoDataTS = async ( url = '/postInfoDataTS', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
      
      try {
        const newData = await response.json();
        console.log(newData);
        linkToInfo.setAttribute('href',newData.url);
        linkToInfo.firstElementChild.style.color = 'green';
        return newData;
        }catch(error) {
      console.log("error", error);
      }
    }

// post Info element's code:
const postInfoData = async ( url = '/postInfoData', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
      
      try {
        const newData = await response.json();
        console.log(newData);
        postInfoDataTS('/postInfoDataTS',newData[0]);
        return newData;
        }catch(error) {
      console.log("error", error);
      }
    }

// open add form:
const addButton = document.querySelector('section.body .add');

addButton.addEventListener('click',appearAddForm);
const addTitle = 'Add Product Info';
const editTitle = 'Edit product'
function appearAddForm()
{
    let filter = document.createElement('div');
    let body = document.querySelector('body');
    body.appendChild(filter);
    filter.outerHTML = `<div class = 'filter'>
                            <section class = 'adding-product'>
                                <h2 clss = 'title'>${addTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'code' type='number' placeholder='Product Code' />
                                    <input id = 'name' type='text' placeholder='Product Name' />
                                    <input id = 'price' type='number' placeholder='Product Price' />
                                    <button id='add'>Add</button>
                                    <button id='cancel'>Cancel</button>
                                </section>
                            </section>
                        </div>`;
    addDataButton = document.querySelector('#add');
    addDataButton.addEventListener('click',addData);
    cancelButton = document.querySelector('#cancel');
    cancelButton.addEventListener('click',closeDataForm);
}

// add Data:
let counter = 0;
const table = document.querySelector('table');
function addData()
{
    const productCode = document.querySelector('#code');
    const productName = document.querySelector('#name');
    const productPrice = document.querySelector('#price');
    let inputs = [productCode,productName,productPrice];
    if (edit != true)
    {
        if (productCode.value == '' || productName.value == '' || productPrice.value == '')
        {
            for (let input of inputs)
            {
                if (input.value == '')
                {
                    input.setAttribute('placeholder',`E: Don't leave the inpot empty`);
                    input.style.border = '1px red solid' 
                }
            }
        }
        else if (id_arr.includes(productCode.value))
        {
            const errorMa = document.querySelector('.error');
            if (errorMa != null)
            {
                
            }
            else
            {
                let errorM = `
                            <div class='error'>
                                Erorr: It's repeated code! please write anthor.
                            </dive>
                        `;
                productCode.insertAdjacentHTML('afterend',errorM);
            }
            
        }
        else
        {
            const errorMa = document.querySelector('.error');
            if (errorMa != null)
            {
                errorMa.remove();
            }
            postProductData('/postProdactData',{_id : productCode.value, name : productName.value, price : Number(productPrice.value), ore : []});
            id_arr.push(productCode.value);
            addDataButton.textContent = `Add ${++counter}`;
            let row = document.createElement('tr');
            table.appendChild(row);
            row.innerHTML = `
                                <td>${productCode.value}</td>
                                <td>${productName.value}</td>
                                <td>${productPrice.value}</td>
                                <td><i class="far fa-edit edit"></i></td>
                                <td><i class="fas fa-trash-alt delet"></i></td>
                                <td><a><i class="fas fa-info info"></i></a></td>
                            `
            productCode.value = '';
            productName.value = '';
            productPrice.value = '';
        }
    }
    else
    {
        if (productCode.value == '' || productName.value == '' || productPrice.value == '')
        {
            for (let input of inputs)
            {
                if (input.value == '')
                {
                    input.setAttribute('placeholder',`E: Don't leave the inpot empty`);
                    input.style.border = '1px red solid' 
                }
            }
        }
        else
        {
            postProductUpdateData('/postProductUpdateData',{_id : productCode.value, name : productName.value, price : Number(productPrice.value), ore : []});
            let allTd = tr.querySelectorAll('td');
            allTd[1].textContent =  productName.value;
            allTd[2].textContent =  Number(productPrice.value);
            const filter = document.querySelector('.filter');
            filter.remove();
            edit = false;
        }
    }
    
    
    
}


function closeDataForm()
{
    const filter = document.querySelector('.filter');
    filter.remove();
    counter = 0;
    edit = false;
}

// Delet & Edit data
table.addEventListener('click',deletData)
let linkToInfo;
let row;
function deletData(e)
{
    if (e.target.className === 'fas fa-trash-alt delet')
    {
        row = e.target.parentElement.parentElement;
        const code = row.querySelector(`td`);
        let codeOfData = {_id: code.textContent};
        postDeletingData('/postDeletingData',codeOfData);
        
    }
    else if (e.target.className === 'far fa-edit edit')
    {
        edit = true;
        appearAddFormForEdit(e.target.parentElement.parentElement);
    }
    // info about Data:
    else if (e.target.className === 'fas fa-info info')
    {
        const row = e.target.parentElement.parentElement.parentElement;
        const code = row.querySelector(`td`);
        let codeOfData = {_id: code.textContent};
        console.log(codeOfData);
        postInfoData('/postInfoData',codeOfData);
        linkToInfo = e.target.parentElement;
    }
}

let tr;

function appearAddFormForEdit(e)
{
    let allTd = e.querySelectorAll('td');
    let filter = document.createElement('div');
    let body = document.querySelector('body');
    body.appendChild(filter);
    filter.outerHTML = `<div class = 'filter'>
                            <section class = 'adding-product'>
                                <h2 clss = 'title'>${editTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'code' type='number' disabled placeholder='Product Code' value = '${allTd[0].textContent}'/>
                                    <input id = 'name' type='text' placeholder='Product Name' value = '${allTd[1].textContent}'/>
                                    <input id = 'price' type='number' placeholder='Product Price'value = '${allTd[2].textContent}' />
                                    <button id='add'>Add</button>
                                    <button id='cancel'>Cancel</button>
                                </section>
                            </section>
                        </div>`;
    tr = e;
    addDataButtonFE = document.querySelector('#add');
    cancelButtonFE = document.querySelector('#cancel');
    addDataButtonFE.addEventListener('click',addData);
    cancelButtonFE.addEventListener('click',closeDataForm);
}
