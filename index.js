const server = require('./api/server.js');

const port = process.env.PORT || 6500;
server.listen(port, () => {
    console.log(`\nThe server is cooking on route ${port}\n`)
});

