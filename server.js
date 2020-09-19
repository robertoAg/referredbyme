const express = require('express');

const app = express();

app.use(express.static('./dist/referredbyme'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/referredbyme/'}),
);

app.listen(process.env.PORT || 8080);