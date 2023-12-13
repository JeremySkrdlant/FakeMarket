import express  from "express";
import cors from "cors"; 
import {Stock} from "./stock.js"; 
import { Order } from "./order.js";

const app = express(); 
app.use(cors()); 
app.use(express.json());

var stock; 

if(process.env){
     const {stockName, ticker, ipo} = process.env
     if(stockName && ticker && ipo){
          stock = new Stock(stockName, ticker, ipo);
     }
}

var orderBook = []

app.get('/', (request, response) => {
     if(stock){
          response.send(`Welcome to this ${stock.name}`)
     }else {
          response.send(`You need to create the stock`)
     }
     
})

app.get('/orders', (request, response) => {
     response.send(orderBook)
})

app.get('/info', (request, response) => {
      response.send(stock);
})

app.post('/createStock', (request, response) => {
    const {name, ticker, price} = request.body
    stock = new Stock(name, ticker, parseFloat(price))
    response.send(stock);      
}) 

// Darian
// Supply and Demand - So if the order is a buy order, that means less stock so the price goes up
// If the order is a sell order, that means more stock so the price goes down

// Kyler
// Dissallow someone selling stock they do not own. 
// This object tracks the amount of stocks each account owns

var stocksAmount = {};

app.post('/placeOrder', (request, response) => {
     const {orderType, amount, account} = request.body;
 
     if (orderType.toLowerCase() === 'sell') {
         let currentStockAmount = getCount(account);
 
         if (currentStockAmount < amount) {
             return response.status(400).send('Cannot sell stock you do not own');
         }
         stocksAmount[account] = currentStockAmount - amount;
     } else if (orderType.toLowerCase() === 'buy') {
         let currentStockAmount = getCount(account);
         stocksAmount[account] = currentStockAmount + amount;
     } else {
         return response.status(400).send('Invalid order type');
     }
 
     let newOrder = new Order(orderType, amount, account);
     orderBook.push(newOrder);
 
     response.send(orderBook);
 });
 
 function getCount(accountNumber) {
     let userOrders = orderBook.filter(order => order.account === accountNumber);
     let stockCount = 0;
 
     userOrders.forEach(order => {
         if (order.orderType.toLowerCase() === 'buy') {
             stockCount += order.amount;
         } else if (order.orderType.toLowerCase() === 'sell') {
             stockCount -= order.amount;
         }
     });
 
     return stockCount;
 }
 
app.post ('/getStockTotal/:accountNumber', () => {
     const { accountNumber } = request.params;

     usersOrders = orderBook.filter (order => order.userAccountNumber === accountNumber);

     var stocksAmount = 0;
     usersOrders.forEach(order => {
          if (order.orderType.toLowerCase === 'buy') {
               stocksAmount += order.amount;
          } else if (order.orderType.toLowerCase === 'sell') {
               stocksAmount -= order.amount;
          }
     });

     response.send ({ total: stocksAmount, history: usersOrders });
});

// Hunter 
// route where we can view the history of the price of the stock. 


app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})