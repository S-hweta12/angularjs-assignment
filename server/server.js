const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/saveData', (req, res) => {
    const data = req.body;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send('Data saved successfully');
    });
});

app.get('/getData', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.json([]);
            }
            return res.status(500).send('Error reading file');
        }

        if (!data || data.trim() === '') {
            return res.json([]);
        }

        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
