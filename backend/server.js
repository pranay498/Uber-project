import http from "http";
import app from "./app.js";
import logger from "./utils/logger.js";
const port = process.env.PORT|| 8000;

const server  = http.createServer(app);

server.listen(port,()=>{
    logger.info(`Server is running on port ${port}`);
}
)