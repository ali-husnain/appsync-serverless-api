const { ticketDetail } = require("../../database-helpers/ticket-helper");

exports.handler = async event => {
  console.log("Request Event: ", event);
  const params = {
    id: event.id
  };

  try {
    const data = await ticketDetail(params);

    if (!data) {
      return {
        statusCode: 404,
        body: "Ticket not found"
      };
    }

    return {
      statusCode: 200,
      body: data
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: err
    };
  }
};
