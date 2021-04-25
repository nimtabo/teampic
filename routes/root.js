const express = require('express')
const knex = require('../db/client')
const router = express.Router()

router.get('/',(req,res)=>{
  knex('cohorts')
  .orderBy('created_at','desc')
  .then(cohort=>{
    res.render('cohorts/index',{cohort:cohort})
  })
})
router.get('/',(req,res)=>{
  res.render('cohorts/index')
})



module.exports = router
