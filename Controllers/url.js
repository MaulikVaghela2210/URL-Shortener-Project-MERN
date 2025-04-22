import { Url } from "../Models/Url.js";
import shortid from "shortid";

// Load base URL from environment or default to localhost
const baseUrl = process.env.BASE_URL || 'http://localhost:2000';

export const shortUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();

    const shortUrl = `${baseUrl}/${shortCode}`;

    // Save to database
    const newUrl = new Url({ shortCode, longUrl });
    await newUrl.save();

    console.log("Short saved =", newUrl);

    res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
    const shortCode = req.params.shortCode;

    // Find in database
    const originalUrl = await Url.findOne({ shortCode });

    if (originalUrl) {
        return res.redirect(originalUrl.longUrl);
    } else {
        return res.json({ message: "Invalid short Code..!" });
    }
};
