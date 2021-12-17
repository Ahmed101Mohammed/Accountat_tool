// render a file:(u)
let headOfPage = document.querySelector('h1');

// First stib:(u)
const getAllOre = async ()=>{

    const res = await fetch("/getproductsinfo")
    try {
      const data = await res.json();
      console.log(data);
      headOfPage.textContent = `Table of ore's ${data.name}`
      for (i of data.ore)
      {
        let row = document.createElement('tr');
        table.appendChild(row);
        row.innerHTML = `
                            <td>${i._id}</td>
                            <td>${i.name}</td>
                            <td>${i.qO}</td>
                            <td>${i.qP}</td>
                            <td><i class="far fa-edit edit"></i></td>
                            <td><i class="fas fa-trash-alt delet"></i></td>
                        `
        id_arr.push(i._id);
      }
      
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
  getAllOre();
// vars:
let edit = false;
let addDataButton;
let cancelButton;
let id_arr = [];
let addDataButtonFE;
let cancelButtonFE;
// Posts & Gets:

  //post product Data:(u)
const postProductOre = async ( url = '/postProdactOre', data = {})=>{
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
const postProductUpdateOre = async ( url = '/postProductUpdateOre', data = {})=>{
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
const postDeletingOre = async ( url = '/postDeletingOre', data = {})=>{
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
const addTitle = 'Add Ore Info';
const editTitle = 'Edit Ore'
function appearAddForm()
{
    let filter = document.createElement('div');
    let body = document.querySelector('body');
    body.appendChild(filter);
    filter.outerHTML = `<div class = 'filter'>
                            <section class = 'adding-product'>
                                <h2 clss = 'title'>${addTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'code' type='number' placeholder='Ore Code' />
                                    <input id = 'name' type='text' placeholder='Ore Name' />
                                    <input id = 'q-ore' type='number' placeholder='Ore quantity'/>
                                    <input id = 'q-product' type='number' placeholder='Product quantity' />
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

// add Data:(u)
let counter = 0;
const table = document.querySelector('table');
function addData()
{
    const oreCode = document.querySelector('#code');
    const oreName = document.querySelector('#name');
    const oreQuantity = document.querySelector('#q-ore');
    const productQuantity = document.querySelector('#q-product');
    let inputs = [oreCode,oreName,oreQuantity,productQuantity];
    if (edit != true)
    {
        if (oreCode.value == '' || oreName.value == '' || oreQuantity.value == '' || productQuantity == '')
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
        else if (id_arr.includes(oreCode.value))
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
                oreCode.insertAdjacentHTML('afterend',errorM);
            }
            
        }
        else
        {
            const errorMa = document.querySelector('.error');
            if (errorMa != null)
            {
                errorMa.remove();
            }
            postProductOre('/postProductOre',{_id : oreCode.value, name : oreName.value, qO : Number(oreQuantity.value), qP : Number(productQuantity.value), unitNeeds:  Number(oreQuantity.value)/Number(productQuantity.value)});
            id_arr.push(oreCode.value);
            addDataButton.textContent = `Add ${++counter}`;
            let row = document.createElement('tr');
            table.appendChild(row);
            row.innerHTML = `
                                <td>${oreCode.value}</td>
                                <td>${oreName.value}</td>
                                <td>${oreQuantity.value}</td>
                                <td>${productQuantity.value}</td>
                                <td><i class="far fa-edit edit"></i></td>
                                <td><i class="fas fa-trash-alt delet"></i></td>
                            `
            oreCode.value = '';
            oreName.value = '';
            oreQuantity.value = '';
            productQuantity.value = '';
        }
    }
    else
    {
        if (oreCode.value == '' || oreName.value == '' || oreQuantity.value == '' || productQuantity == '')
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
            postProductUpdateOre('/postProductUpdateOre',{_id : oreCode.value, name : oreName.value, qO : Number(oreQuantity.value), qP : Number(productQuantity.value), unitNeeds:  Number(oreQuantity.value)/Number(productQuantity.value)});
            let allTd = tr.querySelectorAll('td');
            allTd[1].textContent =  oreName.value;
            allTd[2].textContent =  Number(oreQuantity.value);
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
        let codeOfData = {_id: code.textContent};
        postDeletingOre('/postDeletingOre',codeOfData);
        
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
                                <h2 clss = 'title'>${editTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'code' type='number' disabled placeholder='Product Code' value = '${allTd[0].textContent}'/>
                                    <input id = 'name' type='text' placeholder='Product Name' value = '${allTd[1].textContent}'/>
                                    <input id = 'q-ore' type='number' placeholder='Ore quantity' value = '${allTd[2].textContent}'/>
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
