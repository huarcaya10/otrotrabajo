const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

const {logError,errorHandler,boomErrorHandler} = require('./middlewares/error.handler');

app.use(express.json());

app.get('/',(req, res) => {
  res.send('hi from server express');
});


//derivando toda la resolución de rutas a la ruta /routes/
routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log("Express active in port: "+port);
});
