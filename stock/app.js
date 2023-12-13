import express  from "express";
import cors from "cors"; 
import {Stock} from "./stock.js"; 
import { Order } from "./order.js";
import { LimitOrder } from "./limitOrder.js";

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
var limitOrder = []

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


app.post('/placeOrder', (request, response) => {
     console.log(request.body)
     const {orderType, amount, account} = request.body;
     let newOrder = new Order(orderType, amount, account); 
     orderBook.push(newOrder); 
     console.log(orderBook);
     response.send(orderBook);
})

app.post('/limitOrder', (request, response) => {
     console.log(request.body)
     const {address, minCost, ammount} = request.body;
     let limitOrder = Order(address, minCost, ammount)
     limitOrder.push(limitOrder)
     console.log(limitOrder);
     response.send(limitOrder)
})


// Nathaniel. 
// route where we pass in a users address, We should get the total 
// number of stocks they own. 


// Hunter 
// route where we can view the history of the price of the stock. 

app.get('/history', (request, response) => {
      response.send(stock.priceHistory)
})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})