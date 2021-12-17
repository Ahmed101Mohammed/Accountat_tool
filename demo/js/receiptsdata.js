let clientsData;
// Data needs:
const getAllClientsData = async ()=>{

  const res = await fetch("/getAllClientsData")
  try {
    const data = await res.json();
    console.log(data);
    clientsData = data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
getAllClientsData();
// First stib:
const getAllReceipts = async ()=>{

    const res = await fetch("/getAllReceipts")
    try {
      const data = await res.json();
      console.log(data);
      for (i of data)
      {
        let row = document.createElement('tr');
        table.appendChild(row);
        row.innerHTML = `
                            <td>${i._id}</td>
                            <td>${i.client_id}</td>
                            <td>${i.clientData[0].name}</td>
                            <td>${i.date}</td>
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
getAllReceipts();
// vars:
let edit = false;
let addDataButton;
let cancelButton;
let id_arr = [];
let addDataButtonFE;
let cancelButtonFE;
// Posts & Gets:

  //post product Data:
const postReceiptData = async ( url = '/postReceiptData', data = {})=>{
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

    //post Updated Receipt Data:
const postReceiptUpdateData = async ( url = '/postReceiptUpdateData', data = {})=>{
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
const postDeletingRData = async ( url = '/postDeletingRData', data = {})=>{
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
const postInfoRDataTS = async ( url = '/postInfoRDataTS', data = {})=>{
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
const postInfoRData = async ( url = '/postInfoRData', data = {})=>{
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
        postInfoRDataTS('/postInfoRDataTS',newData[0]);
        return newData;
        }catch(error) {
      console.log("error", error);
      }
    }

// open add form:
const addButton = document.querySelector('section.body .add');

addButton.addEventListener('click',appearAddForm);
const addTitle = 'Add Reciept Info:';
const editTitle = 'Edit Reciept Info:';
let clientCodeUp;
let clientName;
function appearAddForm()
{
    let filter = document.createElement('div');
    let body = document.querySelector('body');
    body.appendChild(filter);
    filter.outerHTML = `<div class = 'filter'>
                            <section class = 'adding-product'>
                                <h2 clss = 'title'>${addTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'receipt-code' type='number' placeholder='Receipt Code' />
                                    <input id = 'client-code' type='number' placeholder='Client Code' />
                                    <input id = 'client-name' type='text' placeholder='Client Name' />
                                    <input id = 'date' type='text' placeholder='Date' />
                                    <button id='add'>Add</button>
                                    <button id='cancel'>Cancel</button>
                                </section>
                            </section>
                        </div>`;
    clientName = document.querySelector('#client-name');
    clientCodeUp = document.querySelector('#client-code');
    clientCodeUp.addEventListener('keyup',clientNameAuto);
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
    const receiptCode = document.querySelector('#receipt-code');
    const clientCode = document.querySelector('#client-code');
    const clientName = document.querySelector('#client-name');
    const date = document.querySelector('#date');
    let inputs = [receiptCode,clientCode,clientName,date];
    if (edit != true)
    {
        if (receiptCode.value == '' || clientCode.value == '' || clientName.value == '' || date == '')
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
        else if (id_arr.includes(receiptCode.value))
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
                receiptCode.insertAdjacentHTML('afterend',errorM);
            }
            
        }
        else
        {
            const errorMa = document.querySelector('.error');
            if (errorMa != null)
            {
                errorMa.remove();
            }
            postReceiptData('/postReceiptData',{_id : receiptCode.value, client_id : clientCode.value, date : date.value, receiptItems : [], receiptOre : [], totalPrice : 0});
            id_arr.push(receiptCode.value);
            addDataButton.textContent = `Add ${++counter}`;
            let row = document.createElement('tr');
            table.appendChild(row);
            row.innerHTML = `
                                <td>${receiptCode.value}</td>
                                <td>${clientCode.value}</td>
                                <td>${clientName.value}</td>
                                <td>${date.value}</td>
                                <td><i class="far fa-edit edit"></i></td>
                                <td><i class="fas fa-trash-alt delet"></i></td>
                                <td><a><i class="fas fa-info info"></i></a></td>
                            `
            receiptCode.value = '';
            clientCode.value = '';
            clientName.value = '';
            date.value = '';
        }
    }
    else
    {
        if (receiptCode.value == '' || clientCode.value == '' || clientName.value == '' || date == '')
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
            postReceiptUpdateData('/postReceiptUpdateData',{_id : receiptCode.value, client_id : clientCode.value, date : date.value, receiptItems : [], receiptOre : [], totalPrice : 0});
            let allTd = tr.querySelectorAll('td');
            allTd[1].textContent =  clientCode.value;
            allTd[2].textContent =  clientName.value;
            allTd[3].textContent = date.value;
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
        postDeletingRData('/postDeletingRData',codeOfData);
        
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
        postInfoRData('/postInfoRData',codeOfData);
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
                                <h2 clss = 'title'>${addTitle}</h2>
                                <section class='add-form'>
                                    <input id = 'receipt-code' type='number'  disabled placeholder='Receipt Code' value = '${allTd[0].textContent}' />
                                    <input id = 'client-code' type='number' placeholder='Client Code' value = '${allTd[1].textContent}' />
                                    <input id = 'client-name' type='text' placeholder='Client Name' value = '${allTd[2].textContent}' />
                                    <input id = 'date' type='text' placeholder='Date' value = '${allTd[3].textContent}' />
                                    <button id='add'>Add</button>
                                    <button id='cancel'>Cancel</button>
                                </section>
                            </section>
                        </div>`;
    clientName = document.querySelector('#client-name');
    clientCodeUp = document.querySelector('#client-code');
    clientCodeUp.addEventListener('keyup',clientNameAuto);
    tr = e;
    addDataButtonFE = document.querySelector('#add');
    cancelButtonFE = document.querySelector('#cancel');
    addDataButtonFE.addEventListener('click',addData);
    cancelButtonFE.addEventListener('click',closeDataForm);
}

// client Name auto:

function clientNameAuto()
{
  let clientCodeV = clientCodeUp.value;
  for (i of clientsData)
  {
    if (i._id == clientCodeV)
    {
      clientName.value = i.name;
      break;
    }
  }
}