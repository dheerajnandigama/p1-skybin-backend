const db = require('./db')
const express = require('express');
const {lambda} = require('./db.config.js')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});



router.post('/uploads3File',(req,res) => {
  console.log(req.body);
  const params = {
    FunctionName: 'get_presign_url_skybin',
    Payload: JSON.stringify(req.body),
};

lambda.invoke(params, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Data:', data);
        return res.json(JSON.parse(JSON.parse(data.Payload).body))
    }
});
})

router.put('/updates3File',async(req,res) => {
  console.log(req.body);
  const result=await db.createOrUpdate(req.body,true)
  return res.json(result)
})

router.post('/insertDBdetails',async (req,res) => {
  console.log(req.body);
  const result=await db.createOrUpdate(req.body)
  return res.json(result)
})

router.get('/readList', async(req, res) => {
  console.log(req.query);
  const result=await db.readList(req.query.userId)
  res.json(result);
});

router.delete('/deletes3File',async(req,res)=>{
  console.log(req.query);
  const result=await db.deleteById(req.query.id)
  return res.json(result);
})

module.exports = router;
