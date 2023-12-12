import express from "express";
import cors from "cors";

const app = express()
app.use(cors());


app.get('/', (request, response) => {
     response.send("Welcome to the Panel")
})

app.get('/check/:server', async (request, response) => {
     const {server} = request.params
    let result = await fetch(`http://${server}:3000/info`);
    let data = await result.json();
    response.send(data)

})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})