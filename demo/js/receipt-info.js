let allProductsData;
// get all products data:
const getAllProducts = async ()=>{

    const res = await fetch("/getproducts")
    try {
      const data = await res.json();
      console.log(data);
      allProductsData = data;
      getAllItems();
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
getAllProducts();
// render a file:(u)
let headOfPage = document.querySelector('h1');

// First stip:(u)
let reReceipt;
const getAllItems = async ()=>{

    const res = await fetch("/getAllItems")
    try {
      const data = await res.json();
      console.log(data);
      headOfPage.textContent = `Table of Receipt: (${data._id})`
      reReceipt = data;
      for (i of data.receiptItems)
      {
          for (j of allProductsData)
          {
              if (i._id == j._id)
              {
                let row = document.createElement('tr');
                table.appendChild(row);
                row.innerHTML = `
                                    <td>${i._id}</td>
                                    <td>${j.name}</td>
                                    <td>${j.price}</td>
                                    <td>${i.qP}</td>
                                    <td>${i.qP * j.price}</td>
                                    <td><i class="far fa-edit edit"></i></td>
                                    <td><i class="fas fa-trash-alt delet"></i></td>
                                `
                id_arr.push(i._id);
                
              }
          }
      }
      summaryTable(data);
      
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

  
// vars:
let edit = false;
let addDataButton;
let cancelButton;
let id_arr = [];
let addDataButtonFE;
let cancelButtonFE;
// Posts & Gets:

  //post product Data:(u)
const postRIdata = async ( url = '/postRIdata', data = {})=>{
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

    //post product Data Update:(u)
const postRUpdate = async ( url = '/postRUpdate', data = {})=>{
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
    // post deleting element's code:(u)
const postDeletingItem = async ( url = '/postDeletingItem', data = {})=>{
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

// open add form:(u)
const addButton = document.querySelector('section.body .add');

addButton.addEventListener('click',appearAddForm);
const addTitle = 'Add Item Info:';
const editTitle = 'Edit Item Info:';
let proCode;
let proName;
let proPrice;
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
                                    <input id = 'price' type='number' placeholder='Product price'/>
                                    <input id = 'q-product' type='number' placeholder='Product quantity' />
                                    <button id='add'>Add</button>
                                    <button id='cancel'>Cancel</button>
                                </section>
                            </section>
                        </div>`;
    proCode = document.querySelector('#code'); 
    proCode.addEventListener('keyup',findigNP);  
    proName = document.querySelector('#name');   
    proPrice = document.querySelector('#price');             
    addDataButton = document.querySelector('#add');
    addDataButton.addEventListener('click',addData);
    cancelButton = document.querySelector('#cancel');
    cancelButton.addEventListener('click',closeDataForm);
}

// add Data:(u)
let counter = 0;
const table = document.querySelector('table');
function addData()
{
    const code = document.querySelector('#code');
    const name = document.querySelector('#name');
    const price = document.querySelector('#price');
    const productQuantity = document.querySelector('#q-product');
    let inputs = [code,name,price,productQuantity];
    if (edit != true)
    {
        if (code.value == '' || name.value == '' || price.value == '' || productQuantity == '')
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
        else if (id_arr.includes(code.value))
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
                code.insertAdjacentHTML('afterend',errorM);
            }
            
        }
        else
        {
            const errorMa = document.querySelector('.error');
            if (errorMa != null)
            {
                errorMa.remove();
            }
            reReceipt.receiptItems.push({_id : code.value, qP : Number(productQuantity.value)});
            reReceipt = makeUpDate(reReceipt);
            console.log(reReceipt);
            postRIdata('/postRIdata',reReceipt);
            id_arr.push(code.value);
            addDataButton.textContent = `Add ${++counter}`;
            let row = document.createElement('tr');
            table.appendChild(row);
            row.innerHTML = `
                                <td>${code.value}</td>
                                <td>${name.value}</td>
                                <td>${price.value}</td>
                                <td>${productQuantity.value}</td>
                                <td>${Number(price.value) * Number(productQuantity.value)}</td>
                                <td><i class="far fa-edit edit"></i></td>
                                <td><i class="fas fa-trash-alt delet"></i></td>
                            `
            code.value = '';
            name.value = '';
            price.value = '';
            productQuantity.value = '';
        }
    }
    else
    {
        if (code.value == '' || name.value == '' || price.value == '' || productQuantity == '')
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
            let n = {_id:code.value, nq: productQuantity.value};
            reReceipt = editQ(reReceipt , n);
            postRUpdate('/postRUpdate', reReceipt);
            let allTd = tr.querySelectorAll('td');
            allTd[3].textContent = Number(productQuantity.value);
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
let row;
function deletData(e)
{
    if (e.target.className === 'fas fa-trash-alt delet')
    {
        row = e.target.parentElement.parentElement;
        const code = row.querySelector(`td`);
        let codeOfItem = code.textContent;
        reReceipt = deletItem(reReceipt,codeOfItem);
        postDeletingItem('/postDeletingItem',reReceipt);
        
    }
    else if (e.target.className === 'far fa-edit edit')
    {
        edit = true;
        appearAddFormForEdit(e.target.parentElement.parentElement);
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
                                <h2 clss = 'title'>${addTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'code' type='number' placeholder='Product Code' disabled value = '${allTd[0].textContent}'/>
                                    <input id = 'name' type='text' placeholder='Product Name' disabled value = '${allTd[1].textContent}'/>
                                    <input id = 'price' type='number' placeholder='Product price' disabled value = '${allTd[2].textContent}'/>
                                    <input id = 'q-product' type='number' placeholder='Product quantity' value = '${allTd[3].textContent}'/>
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

// finding name and price by product code:
function findigNP()
{
    for (i of allProductsData)
    {
        if (proCode.value == i._id)
        {
            proName.value = i.name;
            proPrice.value = i.price;
        }
    }
}

// Make Update Ore function:
function makeUpDate(receipt)
{
    receipt.totalPrice = 0;
    const empty = [];
    receipt.receiptOre = empty;
    console.log(receipt);
    for (i of receipt.receiptItems)
    {
        let itemId = i._id;
        let itemQ = i.qP;
        
        for (j of allProductsData)
        {
            if (j._id == itemId)
            {
                for (k of j.ore)
                {
                    let done = 0;
                    for (l of receipt.receiptOre)
                    {
                        if (l.name == k.name)
                        {
                            l.qO += itemQ * k.unitNeeds;
                            done = 1;
                        }                       

                    }
                    if (done != 1)
                    {
                        receipt.receiptOre.push({name : k.name, qO : itemQ*k.unitNeeds})
                    }
                }
                receipt.totalPrice += itemQ * j.price;
            }
        }
    }
    return receipt;


}

// Delet Item:
function deletItem(receipt,code)
{
    for (i of receipt.receiptItems)
    {
        if (code == i._id)
        {
            let p = receipt.receiptItems.indexOf(i);
            receipt.receiptItems.splice(p,1);
        }
    }
    receipt = makeUpDate(receipt);
    return receipt;
}

// Edint Item Quantity:
function editQ(receipt,nD)
{

    for (i of receipt.receiptItems)
    {
        if (nD._id == i._id)
        {
            i.qP = nD.nq;
            console.log('nq: ',nD.nq);
        }
    }
    receipt = makeUpDate(receipt);
    return receipt;
}

// SumMary Data
let table2;
function summaryTable(receipt)
{
    let section = document.querySelector('section.body');
    hr = document.createElement('hr');
    section.appendChild(hr);
    table2 = document.createElement('table');
    section.appendChild(table2);
    table2.outerHTML = `
                            <table class = 'table2'>
                                <tr>
                                    <th>Ore's name</th>
                                    <th>Ore's quantity</th>
                                    <th>Price</th>
                                </tr>
                            </table>
                        `
    ores = receipt.receiptOre;
    console.log(ores);
    totalPrice = receipt.totalPrice;
    table2 = document.querySelector('.table2');
    for (i of ores)
    {
        let tr = document.createElement('tr');
        table2.appendChild(tr);
        tr.outerHTML = `
                            <tr>
                                <td>${i.name}</td>
                                <td>${i.qO}</td>
                            </tr>
                        `
    }
    allTr = table2.querySelectorAll('tr');
    nTd = document.createElement('td');
    console.log(allTr);
    allTr[1].appendChild(nTd);
    nTd.textContent = totalPrice;
}