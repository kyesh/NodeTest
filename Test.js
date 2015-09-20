var express = require('express'),
    app = express();

var oauth2 = require('simple-oauth2')({
  clientID: '229W2W',
  clientSecret: 'aec0bda7f40a05926816596847e6daca',
  site: 'https://www.fitbit.com',
  tokenPath: '/oauth2/token',
  authorizationPath: '/oauth2/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://haikernode.cloudapp.net/callback',
  scope: 'notifications',
  state: '3(#0/!~'
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  var code = req.query.code;
  console.log('/callback');
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://haikernode.cloudapp.net/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
  }
});

app.get('/', function (req, res) {
  res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

app.listen(8080);

console.log('Express server started on port 8080');