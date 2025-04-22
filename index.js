import express from 'express'
import mongoose from 'mongoose';
import { shortUrl } from './Controllers/url.js';
import { getOriginalUrl } from './Controllers/url.js';
import dotenv from 'dotenv';
dotenv.config();

//express server
const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server is running on port ${port}`))


//mongodb database
mongoose.connect(process.env.MONGODB_URI, {
    dbName: "Nodejs_Course",
})
    .then(() => console.log("MongoDB Connected..!"))
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');
//api
app.get('/', (req, res) => {
    res.render('index.ejs', { shortUrl: null });
})

//redirect to original url using short code : - dynamic routing 
app.get('/:shortCode', getOriginalUrl);

app.post('/short', shortUrl)
