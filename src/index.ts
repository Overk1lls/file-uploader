import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer({ dest: './uploads/' });

app.use(express.static('./public'));
app.post('/', upload.single('file'), (req, res) => {
    res.sendStatus(200);
});

app.listen(3000, () => console.log('App is running on port 3000'));