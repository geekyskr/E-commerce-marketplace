import { createServer } from 'http';
import app from "../src/routes/routes.js";

const port = process.env.PORT || 8080;
const server = createServer(app);
server.listen(port, () => {
  console.log("Server is running on port " + port);
});