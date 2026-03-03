import express from "express";
import routes from "./Routes.js";

const app = express();

app.use(express.json());
app.use(routes);
app.listen(8080, () => {
    console.log("Running on port 8080")
})