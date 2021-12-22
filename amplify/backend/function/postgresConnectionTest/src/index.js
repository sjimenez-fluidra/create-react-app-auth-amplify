const pg = require('pg');


exports.handler = async (event) => {

    const connectionData = {
        user: 'lambda',
        host: 'riiotpgsql.cdncwtppcq4s.eu-west-1.rds.amazonaws.com',
        database: 'virtualpoolcare_test',
        password: 'UXC64MdU2jcdLjhw',
        port: 5432,
    }
    const client = new pg.Client(connectionData)

    client.connect()
    return client.query('select * from usr limit 10')
        .then(response => {
            console.log(response.rows)
            client.end()
            return {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                statusCode: 200,
                body: JSON.stringify(response.rows)
            };

        })
        .catch(err => {
            client.end()
            return {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                }, 
                statusCode: 200,
                body: JSON.stringify(err)
              };
        })
};
