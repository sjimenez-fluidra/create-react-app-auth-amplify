const AWS = require('aws-sdk')
const {test} = require("/opt/test")

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "test-user_userTable";

const test2 = async () => {
  const params = {
    TableName: tableName,
    Limit: 10
  }
  const users = await dynamodb.scan(params).promise();
  console.log("scanned users", users );
}

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  test();

  await test2();

  let queryParams = {
    TableName: tableName,
    KeyConditionExpression: '#user_id = :user_id',
    ExpressionAttributeNames: {
        "#user_id": "user_id",
    },
    ExpressionAttributeValues: {
        ":user_id": "blue@riiotlabs.com",
    }
  }

  console.log("queryParams: ", queryParams);
  return dynamodb.query(queryParams).promise()
    .then(data => {
      console.log("data", data);
      console.log("data.Items", data.Items);
      return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        statusCode: 200,
        body: JSON.stringify(data.Items)
      };
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};



