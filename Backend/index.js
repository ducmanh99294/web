const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const blogRouter = require('./routes/blogRouter')
const categoryRouter = require('./routes/categoryRouter')


const app = express();
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

connectDB();

//API products
app.use('/api/v1/', productRouter)

//API users
app.use('/api/v2/', userRouter)

//API blogs
app.use('/api/v3/', blogRouter)

//API categories
app.use('/api/v4/', categoryRouter)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server chay o cong https://localhost:${PORT} `);

})