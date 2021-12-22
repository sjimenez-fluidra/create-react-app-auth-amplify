const { pool } = require("/opt/postgressClient");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
}

exports.handler = async (event) => {

    console.log('event', event);
    const query = "select * from usr where user_id = $1";
    const values = [event.queryStringParameters.userEmail];
    const client = await pool.connect();
    return client.query(query, values)
        .then(async response => {
            return {
                headers, 
                statusCode: 200,
                body: JSON.stringify(response?.rows[0])
            };

        })
        .catch(async err => {
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
