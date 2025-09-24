const dns = require('dns');
const host = '_mongodb._tcp.cluster0.kettqra.mongodb.net'; // change if your host differs

dns.resolveSrv(host, (err, addresses) => {
  if (err) {
    console.error('SRV ERR', err.message);
    process.exit(1);
  }
  console.log('SRV addresses:', addresses);
});
