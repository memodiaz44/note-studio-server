const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const routes = require('./routes/routes');
const drawing = require('./routes/drawing')
const user =  require('./routes/user')
const cors = require('cors')
require('dotenv').config()
 
app.use(cors());
app.use(express.json());

app.use('/api', routes)
app.use('/api' , drawing)
app.use("/api", user)

mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));


const PORT = 5000

app.listen(PORT, () => {
    console.log(`listeting to port ${PORT}` )
})

