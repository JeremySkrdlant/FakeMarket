import express  from "express";
import cors from "cors"; 
import {Stock} from "./stock.js"; 
import { Order } from "./order.js";

const app = express(); 
app.use(cors()); 
app.use(express.json());

var stock; 
var orderBook = []

app.get('/', (request, response) => {
     response.send(`Welcome to this ${stock.name}`)
})

app.get('/orders', (request, response) => {
     response.send(orderBook)
})

app.post('/createStock', (request, response) => {
    const {name, ticker, price} = request.body
    stock = new Stock(name, ticker, parseFloat(price))
    response.send(stock);      
}) 

app.post('/placeOrder', (request, response) => {
     const {orderType, amount, account} = request.body;
     let newOrder = new Order(orderType, amount, account); 
     orderBook.push(newOrder); 
     response.send(orderBook);
})


app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})