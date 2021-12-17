// First stib:(u)
const getAllClientsData = async ()=>{

    const res = await fetch("/getAllClientsData")
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
                            <td>${i.phone}</td>
                            <td>${i.address}</td>
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
  getAllClientsData();
// vars:
let edit = false;
let addDataButton;
let cancelButton;
let id_arr = [];
let addDataButtonFE;
let cancelButtonFE;
// Posts & Gets:

  //post clients Data:(u)
const postClientsData = async ( url = '/postClientsData', data = {})=>{
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

    //post Clients Data Update:(u)
const postClientsUpdate = async ( url = '/postClientsUpdate', data = {})=>{
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
const postDeletingClient = async ( url = '/postDeletingClient', data = {})=>{
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
const addTitle = 'Add Client Info:';
const editTitle = 'Edit Client Info:'
function appearAddForm()
{
    let filter = document.createElement('div');
    let body = document.querySelector('body');
    body.appendChild(filter);
    filter.outerHTML = `<div class = 'filter'>
                            <section class = 'adding-product'>
                                <h2 clss = 'title'>${addTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'code' type='number' placeholder='Client Code' />
                                    <input id = 'name' type='text' placeholder='Client Name' />
                                    <input id = 'phone' type='number' placeholder='Client Phone Num'/>
                                    <input id = 'address' type='text' placeholder='Client Address' />
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
    const clientCode = document.querySelector('#code');
    const clientName = document.querySelector('#name');
    const clientPhoneNum = document.querySelector('#phone');
    const clientAddress = document.querySelector('#address');
    let inputs = [clientCode,clientName,clientPhoneNum,clientAddress];
    if (edit != true)
    {
        if (clientCode.value == '' || clientName.value == '' || clientPhoneNum.value == '' || clientAddress == '')
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
        else if (id_arr.includes(clientCode.value))
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
                clientCode.insertAdjacentHTML('afterend',errorM);
            }
            
        }
        else
        {
            const errorMa = document.querySelector('.error');
            if (errorMa != null)
            {
                errorMa.remove();
            }
            postClientsData('/postClientsData',{_id : clientCode.value, name : clientName.value, phone : clientPhoneNum.value, address : clientAddress.value});
            id_arr.push(clientCode.value);
            addDataButton.textContent = `Add ${++counter}`;
            let row = document.createElement('tr');
            table.appendChild(row);
            row.innerHTML = `
                                <td>${clientCode.value}</td>
                                <td>${clientName.value}</td>
                                <td>${clientPhoneNum.value}</td>
                                <td>${clientAddress.value}</td>
                                <td><i class="far fa-edit edit"></i></td>
                                <td><i class="fas fa-trash-alt delet"></i></td>
                            `
            clientCode.value = '';
            clientName.value = '';
            clientPhoneNum.value = '';
            clientAddress.value = '';
        }
    }
    else
    {
        if (clientCode.value == '' || clientName.value == '' || clientPhoneNum.value == '' || clientAddress == '')
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
            postClientsUpdate('/postClientsUpdate',{_id : clientCode.value, name : clientName.value, phone : clientPhoneNum.value, address : clientAddress.value});
            let allTd = tr.querySelectorAll('td');
            allTd[1].textContent =  clientName.value;
            allTd[2].textContent =  Number(clientPhoneNum.value);
            allTd[3].textContent = clientAddress.value;
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
        postDeletingClient('/postDeletingClient',codeOfData);
        
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
                                    <input id = 'phone' type='number' placeholder='Client phone number' value = '${allTd[2].textContent}'/>
                                    <input id = 'address' type='text' placeholder='Client address' value = '${allTd[3].textContent}'/>
                                    
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
