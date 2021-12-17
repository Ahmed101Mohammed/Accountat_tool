const express = require('express');
let app = express();

const db = require('./db');
// **************
app.use(express.static('demo'));
app.use('/css',express.static(__dirname + 'demo/style'))
app.use('/js',express.static(__dirname + 'demo/js'))

// set views:
app.set('views','./views')
app.set('view engine', 'ejs')

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const { get } = require('express/lib/response');
const res = require('express/lib/response');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let server = app.listen(8000, (e)=>{if (e) throw e; console.log("server active .......")});

// routs:
app.get('/',openIndex);
function openIndex(req,res)
{
    res.render('index')
}

app.get('/home',openHome)
function openHome(req,res)
{
    if (access == true)
    {
        res.render('home');
    }
    else
    {
        res.end('You Shoud inter from the sign page');
    }
    
}

app.get('/home/products',openProductsPage)
function openProductsPage(req,res)
{
    if (access == true)
    {
        res.render('productsdata');
    }
    else
    {
        res.end('You Shoud inter from the sign page');
    }
    
}

app.get('/home/products/products-info',openProductsInfoPage)
function openProductsInfoPage(req,res)
{
    if (access == true)
    {
        res.render('productsdata-info');
    }
    else
    {
        res.end('You Shoud inter from the sign page');
    }
    
}

app.get('/home/clients',openclientsPage)
function openclientsPage(req,res)
{
    if (access == true)
    {
        res.render('clientsdata');
    }
    else
    {
        res.end('You Shoud inter from the sign page');
    }
    
}

app.get('/home/receipts',openreceipsPage)
function openreceipsPage(req,res)
{
    if (access == true)
    {
        res.render('receiptsdata');
    }
    else
    {
        res.end('You Shoud inter from the sign page');
    }
    
}

app.get('/home/receipts/receipt-info', openReceiptsInfoPage);
function openReceiptsInfoPage(req,res)
{
    if (access == true)
    {
        res.render('receipt-info');
    }
    else
    {
        res.end('You Shoud inter from the sign page');
    }
}
//gets and posts: 

// sign-in page gets and posts:

// get pass and user name:
app.get('/signData',getSignData)
function getSignData(req,res)
{
    db.getPassAName(res);
}

// post accessing staus:
let access = false;
app.post('/accessV',accessingStates)
function accessingStates(req,res)
{
    
    access = req.body.accessing;
    console.log(access);
}

// Taple of products page gets and posts
app.get('/getproducts',getAll);
function getAll(req,res)
{
    db.getAllProductsData(res);
}

app.post('/postProdactData',productData);
function productData(req,res)
{
    db.addProductData(req.body);
}

app.post('/postDeletingData',postDeletingData);
function postDeletingData(req,res)
{
    db.removeProductData(req.body);
    res.send({});
}

app.post('/postProductUpdateData',postProductUpdateData);
function postProductUpdateData(req,res)
{
    db.UpdateProductData(req.body);
}

app.post('/postInfoData',postInfoData);
function postInfoData(req,res)
{
    console.log(req.body);
    db.findProductData(res,req.body);
}

let dataInfo;
app.post('/postInfoDataTS',postInfoIS);
function postInfoIS(req,res)
{
    dataInfo = req.body;
    console.log(dataInfo);
    res.send({url:'products/products-info'})
}

// gets and posts for productsdata-info:

    // get All poducts-info data:
app.get('/getproductsinfo',getProductsInfoData);
function getProductsInfoData(req,res)
{
    res.send(dataInfo);
}

    // post product ore:
app.post('/postProductOre',insertOre);
function insertOre(req,res)
{
    dataInfo.ore.push(req.body);
    db.UpdateProductData(dataInfo);
}

    // Remove product Ore
app.post('/postDeletingOre',postDeletingOre);
function postDeletingOre(req,res)
{
    const id = req.body._id;
    for (i of dataInfo.ore)
    {
        if(i._id == id)
        {
            let p = dataInfo.ore.indexOf(i);
            dataInfo.ore.splice(p,1);
        }
    }
    db.UpdateProductData(dataInfo);
    res.send({});
}

    // Update product Ore:
app.post('/postProductUpdateOre',postProductUpdateOre);
function postProductUpdateOre(req,res)
{
    const id = req.body._id;
    for (i of dataInfo.ore)
    {
        if(i._id == id)
        {
            let p = dataInfo.ore.indexOf(i);
            dataInfo.ore[p] = req.body;
        }
    }
    db.UpdateProductData(dataInfo);

}

// gets and posts for clients data:

    // get all clients data:
app.get('/getAllClientsData',getAllClientsData);
function getAllClientsData(req,res)
{
    db.getAllClientsData(res);
}

    // post clients data:
app.post('/postClientsData',addClientsData);
function addClientsData(req,res)
{
    db.addClientsData(req.body);
}

    // post clients id for deleting:
app.post('/postDeletingClient', deletingClient);
function deletingClient(req,res)
{
    db.deletingClient(req.body);
    res.send({});
}

    // post clients data for update:
app.post('/postClientsUpdate',clientsUpdate);
function clientsUpdate(req,res)
{
    db.clientsUpdate(req.body);
}

// gets and posts for Receipts data:

    // Add Receipts Data:
app.post('/postReceiptData',addReceiptData);
function addReceiptData(req,res)
{
    db.addReceiptData(req.body);
}

    // get all receipts:
app.get('/getAllReceipts',getAllReceipts);
function getAllReceipts(req,res)
{
    db.getAllReceipts(res);
}

    // post deleting data:
app.post('/postDeletingRData', deletingRData);
function deletingRData(req,res)
{
    db.deletingRData(req.body);
    res.send({});
}

    // post Updated Data:
app.post('/postReceiptUpdateData',receiptUpdateData);
function receiptUpdateData(req,res)
{
    db.receiptUpdateData(req.body);
}

    // post Info data:
app.post('/postInfoRData',infoRData);
function infoRData(req,res)
{
    console.log(req.body);
    db.infoRData(res,req.body);
}

let dataRInfo;
app.post('/postInfoRDataTS',postInfoRIS);
function postInfoRIS(req,res)
{
    dataRInfo = req.body;
    console.log(dataInfo);
    res.send({url:'receipts/receipt-info'})
}

// gets and posts for Receipts data-info:

    // get All:
app.get('/getAllItems',getAllItems);
function getAllItems(req,res)
{
    res.send(dataRInfo);
}

    // add Item data
app.post('/postRIdata', addRIdata);
function addRIdata(req,res)
{
    console.log(req.pody);
    dataRInfo = req.body;
    db.receiptUpdateData(dataRInfo);
    
}

    // delet Item Data:
app.post('/postDeletingItem', deletingItem);
function deletingItem(req,res)
{
    dataRInfo = req.body;
    db.receiptUpdateData(dataRInfo);
    res.send({});
}

    // Update Item Data:
app.post('/postRUpdate', rUpdate);
function rUpdate(req,res)
{
    dataRInfo = req.body;
    db.receiptUpdateData(dataRInfo);
}