const AWS = require('aws-sdk')

AWS.config.update({
    region: "us-east-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ACCESS
})
console.log(process.env.AWS_ACCESS_KEY_ID,process.env.AWS_SECRET_KEY_ACCESS)

const db = new AWS.DynamoDB.DocumentClient()
const lambda = new AWS.Lambda()

const Table = 'skybin'

module.exports = {
    db,
    lambda,
    Table
}