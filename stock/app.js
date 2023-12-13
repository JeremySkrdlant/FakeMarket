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

app.post('/placeOrder', (request, response) => {
     console.log(request.body)
     const {orderType, amount, account} = request.body;
     let newOrder = new Order(orderType, amount, account); 
     orderBook.push(newOrder); 
     console.log(orderBook);
     response.send(orderBook);
})


app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})