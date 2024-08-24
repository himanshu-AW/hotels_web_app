const express = require('express');
const router = express.Router();

const Person = require("../models/Person");


router.post("/", async (req, res) => {
    try {
      // Assuming the request body contains the person data...
      const data = req.body;
  
      // Create a new Person document using the MOngoose model
      const newPerson = new Person(data);
  
      // Save the new person in the database
      const response = await newPerson.save();
      console.log("New Person saved successfully:");
      res.status(200).json(response);
      
    } catch (err) {
      console.log("Error Saving Person: " + err);
      res.status(500).json({error : 'Internal server error'});
    }
  });
  
  // get method to fetch all person data from the db.
 router.get('/', async (req,res) => {
    try{
      const data =  await Person.find();
    console.log('Data fatched successfully');
    res.status(200).json(data);
    } catch (err) {
      console.log("Error getting");
      res.status(500).json({error : 'Internal server error'});
    }
  })

  // get method to fetch person data based on workType from the db.
 router.get('/:workType', async (req,res) => {
    try{
        const workType = req.params.workType;
        if(workType === 'waiter' || workType === 'manager' || workType === 'chef') {
            const data = await Person.find({work:workType});
            console.log('Data fatched successfully');
            res.status(200).json(data);
        } else {
            console.log("Invalid work type");
            res.status(400).json({error : 'Invalid work type'});
        }
    } catch (err) {
      console.log("Error getting");
      res.status(500).json({error : 'Internal server error'});
    }
  })

  router.put('/:id', async (req, res) => {
    try{
      const personId = req.params.id;
      const updatedPersonData = req.body;

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true,
        runValidators: true,
      });

      if(!response) {
        return res.status(404).json({error : 'Internal server error'});
      }
 
      console.log('Person updated successfully');
      res.status(200).json(response);

    }catch(err){
      console.log('Error updating person');
      res.status(500).json({error : 'Internal server error'});
    }
  })

  router.delete('/:id', async(req,res)=>{
    try{
      const personId = req.params.id;
      const response = await Person.findByIdAndDelete+(personId);
      
      if(!response) {
        return res.status(404).json({error : 'Internal server error'});
      }
      
      console.log('Person deleted successfully');
      res.status(200).json(response);
    } catch (err){
      console.log('Error deleting person');
      res.status(500).json({error : 'Internal server error'});
    }
  })

  module.exports = router;