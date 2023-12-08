import express from "express";
import cors from "cors";

const app = express()
app.use(cors());


app.get('/', (request, response) => {
     response.send("Welcome to the Panel")
})

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})