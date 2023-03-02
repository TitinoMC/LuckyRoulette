import express from "express";
import cors from "cors";
import winners from "./routes/winners.routes.js"; 
import tickets from "./routes/tickets.routes.cjs";
import animals from "./routes/animals.routes.cjs";

const port = 5050;
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use(winners);
app.use(tickets);
app.use(animals)

app.listen( port, () => {
    console.log(`Server runnig on port ${port}`);
})
