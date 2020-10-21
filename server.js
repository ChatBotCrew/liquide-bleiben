var express = require('express');
var app = express();
var fs = require('fs');
var { getDescriptions } = require('./description-service');
var { getOffers } = require('./offer-service');

const PORT = process.env.PORT || 8080;

/**
 * Serve the directory "public" statically
 * The directory includes the frontend build
 */
app.use('/',express.static('./liquid-client/dist'));
app.use('/finder',express.static('./liquid-client/dist'));
app.use('/results',express.static('./liquid-client/dist'));
app.use('/results/*',express.static('./liquid-client/dist'));
app.use('/test',express.static('./liquid-client/dist'));
app.use('/test/*',express.static('./liquid-client/dist'));
app.use('/sw-test/sw.js',express.static('./liquid-client/public/sw-test.js'));

/**
 * Provide funding programs.
 * Additionally the request is logged to a .txt-File on the disc
 * @param {e.Response} req Includes filter parameters in it's query, see openapi.yml-Specification for details
 * @param {e.Response} res
 */
app.get('/api/offers', async (req, res) => {
  if (req.query.lok) fs.writeFile('log.txt', `${JSON.stringify(req.query)}\n`, { flag: 'a' }, e => { if(e) console.log(e); });
  res.send(getOffers(req.query));
});


/**
 * Return all descriptions for the different types of funding programs
 * @param {e.Response} req
 * @param {e.Response} res
 */
app.get('/api/descriptions', async (req, res) => {
  res.send(getDescriptions())
});

/**
 * Start the server on port 8080
 */
app.listen(PORT, function () { console.log(`"Wir bleiben Liquide" running on ${PORT}!`); });
