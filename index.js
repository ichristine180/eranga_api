import app from "./app.js";
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT || 3000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})