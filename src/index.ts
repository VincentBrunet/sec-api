/*
var knex = require('knex')({
    client: 'sqlite3',
    connection: () => ({
      filename: './db.sqlite'
    }),
    useNullAsDefault: true
  });
  */

import { HttpCached } from './HttpCached';

const ticker = "AAPL";

const reg = new RegExp('CIK=[0-9]*', 'g');

(async () => {

    const data = await HttpCached.get("https://www.sec.gov/cgi-bin/browse-edgar?CIK=" + ticker);

    const matches = data.match(reg);

    console.log("Matches", matches);

    const cik = matches[0].split("CIK=")[1];

    console.log("CIK", cik);

    const data2 = await HttpCached.get("https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=" + cik + "&count=100");

    console.log("HOP", data2);

})();

console.log("HELLO");

