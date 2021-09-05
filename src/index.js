import express from 'express';
import routes from './routes/seasonlessRepayment';
import multipart from 'connect-multiparty';
const serverPort = process.env.PORT || 5000;
const multipartMiddleware = multipart();
const app = express();
const http = require('http').Server(app);

app.use(multipartMiddleware);
app.use('/api', routes);
http.listen(
    serverPort,
    console.log(`Server has started on port ${serverPort}`)
  );
  export default app;
