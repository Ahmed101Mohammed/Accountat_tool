const res = require('express/lib/response');
const db = require('mongodb');

dbM = db.MongoClient;

dburl = 'Your DB link';



let pass;
let name;


// Data base treatments with Sign page:
function getPassAName(res)
{
    dbM.connect(dburl,accing);
    function accing(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let uc = dbN.collection("users"); 
            uc.findOne({},{projection: {_id: 0, name: 1, password: 1}},getUaP);
        }
    }
    function getUaP(e,r)
    {
        if (e)
        {
            throw e
        
        }
        else
        {
            pass = r.password;
            name = r.name;
            res.send({pass:pass,name:name});
        }
    }
}

// Data base treatments with Table of products page:

    //add products data: 
function addProductData(data)
{
    dbM.connect(dburl,adding);
    function adding(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("products"); 
            pc.insertOne(data,(e,d)=>{if (e){console.log('E', e)} else {console.log(d)}});
        }
    }
}

    //get all products data:
    
function getAllProductsData(res)
{
    dbM.connect(dburl,getdata);
    function getdata(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("products"); 
            pc.find({}).toArray(getd)
        }
    }
    function getd(e,r)
    {
        if (e)
        {
            throw e
        
        }
        else
        {
            console.log(r);
            res.send(r);
        }
    }
}

    // Remove produat data:
function removeProductData(data)
{
    dbM.connect(dburl,deletData);
    function deletData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("products"); 
            pc.deleteOne(data);
        }
    }
}

    // Update products data:
function UpdateProductData(data)
{
    dbM.connect(dburl,updateData);
    function updateData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            q = {_id: data._id};
            newD = {$set: data};
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("products"); 
            pc.updateOne(q, newD);
        }
        
    }
}

    // find product data:
function findProductData(res,data)
{
    dbM.connect(dburl,findProData);
    function findProData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            q = {_id: data._id};
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("products"); 
            pc.find(q).toArray((e,d)=>{if(e){console.log('e:',e)}else{res.send(d)}});
        }
    }
}

// Data base treatments with Table of clients page:

    //get all clients data:
    
function getAllClientsData(res)
{
    dbM.connect(dburl,getCdata);
    function getCdata(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let cc = dbN.collection("clients"); 
            cc.find({}).toArray(getCd)
        }
    }
    function getCd(e,r)
    {
        if (e)
        {
            throw e
        
        }
        else
        {
            console.log(r);
            res.send(r);
        }
    }
}

    //add Clients data: 
function addClientsData(data)
{
    dbM.connect(dburl,addingC);
    function addingC(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("clients"); 
            pc.insertOne(data,(e,d)=>{if (e){console.log('E', e)} else {console.log(d)}});
        }
    }
}

    // Remove Client data:
function deletingClient(data)
{
    dbM.connect(dburl,deletCData);
    function deletCData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("clients"); 
            pc.deleteOne(data);
        }
    }
}

    // Update products data:
function clientsUpdate(data)
{
    dbM.connect(dburl,updateCData);
    function updateCData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            q = {_id: data._id};
            newD = {$set: data};
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("clients"); 
            pc.updateOne(q, newD);
        }
        
    }
}

// Data base treatments with Table of receipts page:

    // add receipt data:
function addReceiptData(data)
{
    dbM.connect(dburl,addingR);
    function addingR(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let rc = dbN.collection("receipt"); 
            rc.insertOne(data,(e,d)=>{if (e){console.log('E', e)} else {console.log(d)}});
        }
    }
}

    //get all receipts data:
function getAllReceipts(res)
{
    dbM.connect(dburl,getRdata);
    function getRdata(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("receipt"); 
            pc.aggregate([
                { $lookup:
                   {
                     from: 'clients',
                     localField: 'client_id',
                     foreignField: '_id',
                     as: 'clientData'
                   }
                 }
                ]).toArray(getRd)
        }
    }
    function getRd(e,r)
    {
        if (e)
        {
            throw e
        
        }
        else
        {
            console.log(r);
            res.send(r);
        }
    }
}

   // Remove receipt data:
function deletingRData(data)
{
    dbM.connect(dburl,deletRData);
    function deletRData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("receipt"); 
            pc.deleteOne(data);
        }
    }
}

    // Update products data:
function receiptUpdateData(data)
{
    dbM.connect(dburl,updateData);
    function updateData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            q = {_id: data._id};
            newD = {$set: data};
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("receipt"); 
            pc.updateOne(q, newD);
        }
        
    }
}

    // get info receipt data:
function infoRData(res,data)
{
    dbM.connect(dburl,findReceiptData);
    function findReceiptData(e,d)
    {
        if (e)
        {
            throw e
        }
        else 
        {
            q = {_id: data._id};
            console.log('Accessing successful');
            let dbN = d.db("project-db");
            let pc = dbN.collection("receipt"); 
            pc.find(q).toArray((e,d)=>{if(e){console.log('e:',e)}else{res.send(d)}});
        }
    }
}
 
module.exports = 
{
    getPassAName : getPassAName,
    addProductData : addProductData,
    getAllProductsData : getAllProductsData,
    removeProductData : removeProductData,
    UpdateProductData : UpdateProductData,
    findProductData : findProductData,
    getAllClientsData : getAllClientsData,
    addClientsData : addClientsData,
    deletingClient : deletingClient,
    clientsUpdate : clientsUpdate,
    addReceiptData : addReceiptData,
    getAllReceipts : getAllReceipts,
    deletingRData : deletingRData,
    receiptUpdateData : receiptUpdateData,
    infoRData : infoRData,
}