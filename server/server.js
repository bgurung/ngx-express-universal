require('zone.js/dist/zone-node');
const renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
const AppServerModuleNgFactory = require('../dist-server/main.aea1fda33c452b4083f7.bundle.js').AppServerModuleNgFactory;
const index = require('fs').readFileSync('./dist-server/index.html', 'utf8');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 3000;
app.use(express.static(path.join(__dirname, '../dist')));
app.use('*', function (req, res, next) {
    // res.sendFile(path.join(__dirname,'../dist/index.html'));
    renderModuleFactory(AppServerModuleNgFactory, { document: index, url: req.baseUrl }).then(html => {
        res.send(html);
    });
});
app.listen(port, function () {
    console.log('listening on port: ' + port);
});
