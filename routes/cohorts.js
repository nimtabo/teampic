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

router.get('/new',(req,res)=>{
  res.render('cohorts/new')
})


router.get('/home',(req,res)=>{
  res.render('cohorts/home')
})
router.get('/pickerOptions',(req,res)=>{
  res.render('cohorts/pickerOptions')
})

router.get('/:id',(req,res)=>{
  let choice = req.query.choice;
  let quantity = parseInt(req.query.quantity)
  knex('cohorts')
  .where('id',req.params.id)
  .first()
  .then(cohort=>{
   
    let details = group(req.query.choice,cohort.members,quantity)
      res.render(`cohorts/showCohort`,{details:details,cohort:cohort,id:req.params.id,choice:choice,quantity:quantity})
    
  })
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}
const group=(choice,members,quantity)=>{
  members=shuffle(members.split(','))
  console.log(members)
  
  let div = members.length/quantity 
  let rem=members.length%quantity
  let outArr=[];
  switch(choice){
      case 'team_count':
          for(let i=0; i<members.length;i+=div){
              outArr.push(members.slice(i,div+i))
          }
          break;
      case 'number_per_team':
          let last;
          if(rem<=2&&rem>0){
            let ind=members.length-rem
            last=members.splice(ind,rem)
            console.log(last)
            for(var i=0; i<members.length; i+=quantity){
              
                  outArr.push(members.slice(i,quantity+i))
              }
            
              for(let j=0; j<last.length; j++){
                  outArr.push(last[j])
              }
          }
          else if(rem>2){
              let div = Math.round(members.length/quantity)
              let num=members.length/div
              for(let i=0; i<members.length; i+=num){
                  outArr.push(members.slice(i,num+i)) 
              }   
          }
          else{
              for(let i=0; i<members.length; i+=quantity){
                  outArr.push(members.slice(i,quantity+i)) 
              }     
          }
  }
  
  return outArr
}
router.get('/:id/edit',(req,res)=>{
  knex('cohorts')
  .where('id',req.params.id)
  .first()
  .then(cohort=>{
    if(!cohort){
      res.send('No cohort found')
    }
    else{
      res.render('cohorts/edit',{cohort:cohort})
    }
  })
})


router.post('/',(req,res)=>{
  const logo = req.body.logoUrl
  const tName = req.body.name
  const tMembers = req.body.members
  knex('cohorts')
  .insert({
    logoUrl:logo,
    name:tName,
    members:tMembers
  })
  .returning('*')
  .then((cohort)=>{
    console.log(cohort)
    const c = cohort[0]
    
    res.redirect(`cohorts/${c.id}`)
  })

})
router.patch('/:id',(req,res)=>{
  knex('cohorts')
  .where('id',req.params.id)
  .update({
    logoUrl:req.body.logoUrl,
    name:req.body.name,
    members:req.body.members
  })
  .then(()=>{
    res.redirect(`/cohorts/${req.params.id}`)
  })
})

router.delete('/:id',(req,res)=>{
  knex('cohorts')
  .where('id',req.params.id)
  .del()
  .then(()=>{
    res.redirect('/cohorts')
  })
})






module.exports = router
