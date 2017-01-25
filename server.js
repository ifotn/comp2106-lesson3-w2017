/**
 * Created by RFreeman on 1/25/2017.
 */

// link to connect
let connect = require('connect');
let url = require('url');
let accounting = require('accounting');

// create a new connect object
let app = connect();

// hello "page"
let hello = function(req, res, next) {
    res.end('Hello, this now restarts with nodemon');
};

// goodbye "page"
let goodbye = function(req, res, next) {
    res.end('Goodbye!');
};

// index "page"
let index = function(req, res, next) {
  res.end('This is the home page');
};

// tax calculator "page"
let tax = function(req, res, next) {

    // get the full querystring ?amount=1000
    let qs = url.parse(req.url, true).query;

    // get the amount value from querystring like $_GET['amount']
    let amount = qs.amount;

    // calculate hst and total
    let hst = amount * .13;
    let total = parseFloat(hst) + parseFloat(amount);

    // display all
    res.end('<h1>Tax Calculator</h1>' +
        'Amount: ' + accounting.formatMoney(amount) + '<br />' +
        'HST: ' + accounting.formatMoney(hst) + '<br />' +
        'Total: ' + accounting.formatMoney(total));
};

// 404
let notFound = function(req, res, next) {
  res.writeHead(404);
  res.end('Not found');
};

// json API
let api = function(req, res, next) {
    // create json object
  let person = JSON.stringify({
      "name": "Ralph",
      "age": 35,
      "nationality": "Canadian"
  });

    // set response type as json rather than text or html
   res.writeHead(200, { "Content-Type": "application/json" });
   res.end(person);
};

// map the url's to the correct virtual pages
app.use('/hello', hello);
app.use('/goodbye', goodbye);
app.use('/api', api);
app.use('/tax', tax);
app.use('/', index);
// app.use(notFound);

// start the connect http server
app.listen(3000);
console.log('Connect server running on port 3000');



