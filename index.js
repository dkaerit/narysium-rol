const server = require('./server');
const _PORT = process.env.PORT || 3000;


async function main() {
    await server.listen(_PORT);
    console.log('Server on port', _PORT);
}

main();