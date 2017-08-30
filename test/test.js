const request = require("supertest");
const express = require('express');
//const assert = require("assert");
var assertions = require('mocha').it;
const application = require("../server");
var chai = require('chai');
var assert =  require('chai').assert;



 describe('POST/api/vendor/items', function () {
   it('should create new item quantity, description, and cost in vending machine', function (done) {
     request(application)
       .post('/api/vendor/items')
       .set('Accept', 'application/json')
       .send({  id: 4, description: 'rc-cola', cost: 0.50, quantity: 10})
       .expect(200)
       .expect("Content-Type", "application/json; charset=utf-8")
       .expect(function  (response) {
          assert.deepEqual({ id: 4, description: 'rc-cola', cost: 0.50, quantity: 10},{ id: 4,description: 'rc-cola', cost: 0.50, quantity: 10}, 'new items are not equal');
      
       })
       .end(done);
   })
 })

describe("GET/api/customer/items", function (done) {
   it("should return successfully all the items", function (done) {
     request(application)
        .get('/api/customer/items')
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(response){
         assert.exists('items','items is not `null` or `undefined`');
         assert.deepEqual(response.body, {
          "status": "success",
          "data": [
            {
              "id": 1,
              "description": "snickers",
              "quantity": 20,
              "cost": .80,
            },
            {
              "id": 2,
              "description": "cheetos",
              "quantity": 6,
              "cost": 1.40
            },
            {
              "id": 3,
              "description": "mountain-dew",
              "quantity": 10,
              "cost": 1.20
            }
          ]
         })
                   
       })
          .end(done);
    })

  })

describe("PUT/api/vendor/items/itemId", function (done) {
   it("should return successfully update the cost and quantity on item 3", function (done) {
     request(application)
        .put('/api/vendor/items/:id')
        .send({  id: 3, description: 'mountain-dew', cost: 0.75, quantity: 8}) 
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(response){
         assert.deepEqual(response.body, {
          "status": "success",
          "data": 
          {
              "id": 3,
              "description": "mountain-dew",
              "quantity": 8,
              "cost": .75
            }
           })        
       })
          .end(done);
    })

  })
 
describe("GET/api/vendor/money", function (done) {
   it("should return successfully the amount of $ in the machine", function (done) {
     request(application)
        .get('/api/vendor/money') 
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(response){
          assert.deepEqual(response.body,  60.75 )        
       })
          .end(done);
    })

  })


describe("GET/api/vendor/purchases", function (done) {
   it("should return successfully the time and items purchased in the machine", function (done) {
     request(application)
        .get('/api/vendor/purchases') 
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(response){
          assert.deepEqual(response.body, {
                
                  "status": "success",
                    "data": [

                {
                    "timeOfPurchase":"2017-08-28 12:30:00",
                    "description": "snickers",
                    "quantity": 1,
                    "cost": .80
                },
                {
                    "timeOfPurchase": "2017-08-30 12:30:00",
                    "description": "cheetos",
                    "quantity": 1,
                    "cost": 1.40
                },
                {
                    "timeOfPurchase": "2017-08-27 12:00:01",
                    "description": "mountain-dew",
                    "quantity": 1,
                    "cost": 1.20
                 }
          ]
         })
                   
       })
          .end(done);
    })

  })             


   describe("POST/api/customer/items/:id/purchases", function (done) {
    it("should purchase an item  successfully from the machine", function (done) {
      request(application)
         .post('/api/customer/items/:id/purchases') 
        .send({  id: 1, description: 'snickers', cost: 0.80, quantity:1}) 
         .expect(200)
         .expect("Content-Type", "application/json; charset=utf-8")
         .expect(function(response){
          assert.deepEqual(response.body, {
           "status": "success",
           "data": [
             {
               "id": 1,
               "description": "snickers",
               "quantity": 1,
              "cost": .80,
            }
             
           ]
         })
                   
        })
           .end(done);
     })

   })  