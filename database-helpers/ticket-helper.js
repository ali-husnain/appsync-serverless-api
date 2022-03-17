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

async function ticketDetail(params) {
  try {
    const ticket = {};

    const [ticketsFromDb, metadata] = await dbConn.query(
      `
      select id, order_id from app_ticket_summary where id = ${params.id}
      `
    );

    console.log("TicketDetail", ticketsFromDb);

    if (ticketsFromDb.length === 0) {
      return null;
    }

    ticket.id = ticketsFromDb[0].id;
    ticket.order_id = ticketsFromDb[0].order_id;

    return ticket;
  } catch (err) {
    return err;
  }
}

module.exports = {
  ticketDetail
};
