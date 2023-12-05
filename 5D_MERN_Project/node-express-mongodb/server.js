const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/attach', express.static(path.join(__dirname, 'attach')));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'attach/'); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the file name
  },
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/5DAssignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const formDataSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  mobile: String,
  city: String,
  email: String,
  password: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

// Express route for form submission
app.post('/submit-form', async (req, res) => {
  try {
    const { firstname, lastname, mobile, city, email, password } = req.body;

    const formData = new FormData({ firstname, lastname, mobile, city, email, password });
    await formData.save();

    res.status(200).json({ success: true, message: 'Form data submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Define MongoDB schema and model
const momentSchema = new mongoose.Schema({
  title: String,
  tags: [String], // Array of tags
  attachments: [String], // Array of attachment URLs
  timestamp: { type: Date, default: Date.now },
});

const Moment = mongoose.model('Moment', momentSchema);

app.post('/create-moment', upload.array('attachments', 10), async (req, res) => {
  try {
    const { title, tags, timestamp } = req.body;

    // Assuming you are using the moment model
    const newMoment = new Moment({
      title,
      tags,
      attachments: req.files.map((file) => file.path),
      timestamp: timestamp || Date.now(), // Use provided timestamp or current timestamp
    });

    await newMoment.save();

    res.status(200).json({ success: true, message: 'Moment created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
