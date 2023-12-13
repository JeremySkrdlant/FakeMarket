import express from "express";
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json())


app.get('/', (request, response) => {
     response.send("Welcome to the Panel")
})

app.get('/check/:server', async (request, response) => {
     const {server} = request.params
    let result = await fetch(`http://${server}:3000/info`);
    let data = await result.json();
    response.send(data)

})

app.post('/submitOrder/:server', async (request, response) => {
     //You will call the post route on that server
     //The body will contain the same data as the placeorder. 
     const {server} = request.params; 
     console.log(request.body)
     let result = await fetch(`http://${server}:3000/placeOrder`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(request.body)
     })
     let data = await result.json(); 
     console.log(data)
     response.send(data);
})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})