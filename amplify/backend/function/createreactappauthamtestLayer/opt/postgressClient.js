const pg = require('pg');

const pool = new pg.Pool({
    user: 'lambda',
    host: 'riiotpgsql.cdncwtppcq4s.eu-west-1.rds.amazonaws.com',
    database: 'virtualpoolcare_test',
    password: 'UXC64MdU2jcdLjhw',
    port: 5432,
})
exports.pool = pool;