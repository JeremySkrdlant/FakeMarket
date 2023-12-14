import express  from "express";
import cors from "cors"; 
import {Stock} from "./stock.js"; 
import { Order } from "./order.js";
import { LimitOrder } from "./limitOrder.js";

const app = express(); 
app.use(cors()); 
app.use(express.json());

var stock; 

function updateStockPrice(orderType, amount, stock ){
     const priceChange = 0.1
     if(orderType === "buy"){
          stock.ipo += priceChange * amount
     }else if(orderType === "sell"){
          stock.ipo -= priceChange * amount
     }
     stock.priceHistory.push(stock.ipo)
     console.log(stock.ipo)
}

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
     updateStockPrice(orderType, amount, account);
})


app.post('/limitOrder', (request, response) => {
     console.log(request.body)
     const {address, minCost, ammount} = request.body;
     let limitOrder = new LimitOrder(address, minCost, ammount)
     limitOrder.push(limitOrder)
     console.log(limitOrder);
     response.send(limitOrder)
})

app.get('/maxOrder', (request, response) => {
      console.log(request.body)
      const {address, maxCost, amount} = request.body;
      let maxOrder = new maxOrder(address, maxCost, amount)
      maxOrder.push(maxOrder)
      console.log(maxOrder);
      response.send(maxOrder)
})


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

app.get('/history', (request, response) => {
      response.send(stock.priceHistory)
})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})