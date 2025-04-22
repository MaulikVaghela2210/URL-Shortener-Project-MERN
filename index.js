import express from 'express';
import mongoose from 'mongoose';
import { shortUrl } from './Controllers/url.js';
import { getOriginalUrl } from './Controllers/url.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

// ✅ This line should match exactly:
const PORT = process.env.PORT || 5000;

// ✅ This too:
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    dbName: "Nodejs_Course",
})
    .then(() => console.log("MongoDB Connected..!"))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { shortUrl: null });
});

app.get('/:shortCode', getOriginalUrl);
app.post('/short', shortUrl);
