const userfield = document.querySelector('#user');
const passfield = document.querySelector('#pass');
const signBut = document.querySelector('#submit');
const link = document.querySelector('a');
let accessing = false;

const getSignData = async ()=>{

  const res = await fetch("/signData")
  try {
    const data = await res.json();
    console.log(data);
    if (userfield.value == data.name && passfield.value == data.pass)
    {
        accessing = true;
        signBut.textContent = 'click again';
        link.setAttribute('href', '/home');
        postaccess();
    }
    else
    {
      signBut.textContent = 'Wrong inputs';
    }
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postaccess = async ( url = '/accessV', data = {accessing:true})=>{
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

signBut.addEventListener('click',accessy);

function accessy()
{
  getSignData()
}