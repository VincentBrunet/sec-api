var knex = require('knex')({
    client: 'sqlite3',
    connection: () => ({
      filename: './db.sqlite'
    })
  });
  
import axios from 'axios';

(async () => {
    const value = await axios.get("https://google.com");
    console.log("Value", value);
})();

console.log("HELLO");

