const express = require('express');
const bodyParser = require('body-parser');


const application = express();
application.use(bodyParser.urlencoded({extended: true}))
application.use(bodyParser.json());


var items = {
    "status": "success",
    "data": [

                {
                    id: 1,
                    description: 'snickers',
                    quantity: 20,
                    cost: .80
                },
                {
                    id: 2,
                    description: 'cheetos',
                    quantity: 6,
                    cost: 1.40
                },
                {
                    id: 3,
                    description: 'mountain-dew',
                    quantity: 10,
                    cost: 1.20
                }
            ]
        }

 application.get('/api/customer/items', (request, response) => {

    
    response.json(items);
 });




 application.post('/api/customer/items/:itemId/purchases', (request, response) => {

      var itemToPurchase = request.body.id;
      console.log(itemToPurchase);
      console.log(request.body.id);
      console.log(request.body.cost);
      var item = items.data.filter(function(obj){
        return obj.id === itemToPurchase;
    });
        
        if(request.body.cost >= item[0].cost){

        console.log("item succesfully purchased");
        console.log(item[0].cost);
        purchasedItem = 
        {
           status: "success",
            data: [
            {
            id: request.body.id,
            description: request.body.description,
            cost: request.body.cost,
            quantity: 1
            }
            ]
        }

     response.json(purchasedItem);
    }else{

    var notEnoughMoney = {
    status: "failure",
    data: {
        "money_submitted": request.body.cost,
        "money_required": item[0].cost
    }
    }
      response.json(notEnoughMoney);

  }
 });

var purchases = {
    status: "success",
    data: [

                {
                    timeOfPurchase:'2017-08-28 12:30:00',
                    description: 'snickers',
                    quantity: 1,
                    cost: .80
                },
                {
                    timeOfPurchase: '2017-08-30 12:30:00',
                    description: 'cheetos',
                    quantity: 1,
                    cost: 1.40
                },
                {
                    timeOfPurchase: '2017-08-27 12:00:01',
                    description: 'mountain-dew',
                    quantity: 1,
                    cost: 1.20
                }
            ]
        }


 application.get('/api/vendor/purchases', (request, response) => {
    response.json(purchases);
 });

var moneyInMachine = 60.75;

 application.get('/api/vendor/money', (request, response) => {
    response.json(moneyInMachine);
 });
var newItems = [];

application.post('/api/vendor/items', (request, response) => {
  //  console.log('************************************* REQUEST BODY',request.body)
    var id = request.body.id;
    var description = request.body.description;
    var cost = request.body.cost;
    var quantity = request.body.quantity;

    var  newItem = {
        id: id,
        description: description,
        cost: cost,
        quantity: quantity
    }
    //console.log('this is a newly created item', newItem);
    newItems.push(newItem);
    //console.log (newItems.description);
    response.json(newItems);
    
    });

    
 application.put('/api/vendor/items/:id', (request, response) => {

     var itemToUpdate = request.body.id;
       // console.log (itemToUpdate);
        var item = items.data.filter(function(obj){
        return obj.id === itemToUpdate;
    })
       // console.log(request.body.description);
       // console.log(request.body.cost);
       // console.log(itemToUpdate);
       // console.log(item);

        var updatedItem = {
            status: "success",
            data: {
                id: itemToUpdate,
                description: request.body.description,
                quantity: request.body.quantity,
                cost: request.body.cost,
        }
        
    };
    console.log(updatedItem.data);
    response.json(updatedItem);
 });



module.exports = application;
