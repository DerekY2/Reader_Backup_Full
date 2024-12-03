const http = require('http'); 
const fs = require('fs');

/*
const tabsPage = fs.readFileSync(path.join(__dirname, 'html', 'config', 'tabs.html'), 'tabsPage');
const homePage = fs.readFileSync(path.join(__dirname, 'html', 'config', 'home.html'), 'homePage');
const errorPage = fs.readFileSync(path.join(__dirname, 'html', 'config', 'focus.html'), 'errorPage');
*/

const tabsPage = fs.readFileSync('tabs.html');
const homePage = fs.readFileSync('home.html');
const errorPage = fs.readFileSync('focus.html');


const server = http.createServer((req, res) => { 
  console.log(req.url); 
  res.end('<h1>Hello world</h1>'); 
  if(req.url === '/tabs'){
    res.end(tabsPage);
  }
  else if(req.url === '/'){
    res.end(homePage);
  }
  else{
    res.writeHead(404);
    res.end(errorPage);
  }
});

server.listen(3000); 
console.log('Listening on port 3000...');
