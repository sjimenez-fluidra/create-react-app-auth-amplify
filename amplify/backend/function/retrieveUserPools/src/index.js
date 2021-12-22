const { pool } = require("/opt/postgressClient");

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
}

exports.handler = async (event) => {

    console.log('event', event);
    const query = `select  swp.*, blue_swp.blue_device_serial
        from user_swp
        join swp on ( user_swp.swimming_pool_id = swp.swimming_pool_id and swp.deleted is null)
        left join blue_swp on ( blue_swp.swimming_pool_id = user_swp.swimming_pool_id and blue_swp.unlink_date is null )
        where user_swp.user_id = $1`;

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
