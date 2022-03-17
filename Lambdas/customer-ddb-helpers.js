const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

const config = {
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  host: process.env.MYSQL_DB_HOST,
  dialect: "mysql",
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
  pool: {
    max: 2,
    min: 1,
    acquire: 30000,
    idle: 10000
  }
};
const dbConn = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

async function customerDetail(params) {
  try {
    const customer = {};

    const [customerFromDb, metadata] = await dbConn.query(
      `select cid, first_name from app_customer where cid = ${params.cid}`
    );

    console.log("customerMetaData", metadata);
    console.log("customerData", customerFromDb);

    if (customerFromDb.length === 0) {
      return null;
    }

    const ticketsFromDb = await dbConn.query(
      `
      select id, order_id from app_ticket_summary where customer_id = ${customerFromDb[0].cid}
      `
    );

    console.log("TicketData", ticketsFromDb);

    customer.cid = customerFromDb[0].cid;
    customer.first_name = customerFromDb[0].first_name;
    customer.Tickets = ticketsFromDb;

    // if (ticketsFromDb.length > 0) {
    //   customer.Tickets = ticketsFromDb.map(x => {
    //     return { id: x.id, order_id: x.order_id };
    //   });
    // }

    return customer;
  } catch (err) {
    return err;
  }
}

module.exports = {
  customerDetail
};
