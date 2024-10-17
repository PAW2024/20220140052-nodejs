import dns from "dns/promises";

const lookup = await dns.lookup("www.programmerzamannow.com");

console.info(lookup.family);
console.info(lookup.address);