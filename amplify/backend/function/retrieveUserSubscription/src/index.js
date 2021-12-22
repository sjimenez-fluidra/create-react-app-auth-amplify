const { pool } = require("/opt/postgressClient");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
}

exports.handler = async (event) => {

    console.log('event', event);
    const query = "select * from user_subscription where user_id = $1 order by expiration_date desc";
    const values = [event.queryStringParameters.identityId];

    const client = await pool.connect();
    return client.query(query, values)
        .then(response => {
            return {
                headers, 
                statusCode: 200,
                body: JSON.stringify(response?.rows)
            };

        })
        .catch(err => {
            return {
                headers, 
                statusCode: 200,
                body: JSON.stringify(err)
              };
        })
        .finally(() => {
            client.release();
        })
};
