const { customerDetail } = require("../customer-ddb-helpers");

exports.handler = async event => {
  console.log("Request Event: ", event);
  const params = {
    cid: event.cid
  };

  try {
    const data = await customerDetail(params);

    if (!data) {
      return {
        statusCode: 404,
        body: "Customer not found"
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
