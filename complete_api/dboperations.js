var  config = require('./dbconfig');
const  sql = require('mssql');
const client = require('./dboperations.js')

// async  function  getLogin() {
//     try {
//       let  pool = await  sql.connect(config);
//       let  products = await  pool.request().query("SELECT * from login");
//       return  products.recordsets;
//     }
//     catch (error) {
//       console.log(error);
//     }
//   }
const mysql = require('mysql');
async function executeQuerry(sql){ 
    var res;
    const client = new mysql(config);
    client.connect();
    await client.query(sql).then(result => res =  result.rows)
      .catch(e => console.error(e.stack))
      .then(() => client.end());
    return res;
  };
async function getLogin(){
    try{
        //await executeQuerry("CREATE TABLE IF NOT EXISTS OREDR(ID INTEGER,TITLE TEXT,MESSAGE TEXT,PRIMARY KEY(ID));")
        //await executeQuerry("INSERT INTO ORDERS VALUES(3,'VIKRAM','done','8','tvl');");
        let sql = "SELECT * FROM login;";
        let result = await executeQuerry(sql);
        return result;
        //console.log(result);
    }
    catch(error){
        console.log(error);
        console.log(error);
    }
}

  module.exports = {
    // getOrders:  getOrders,
    getLogin:  getLogin,
    // addOrder:  addOrder
  }