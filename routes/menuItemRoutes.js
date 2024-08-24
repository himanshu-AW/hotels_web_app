const express = require('express');
const router = express.Router();

const MenuItem = require("../models/MenuItem");


// post method to save menu item data into the db.
router.post('/',async (req,res) => {
    try{
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log('Menu item saved successfully');
      res.status(200).json(response);
  
    }catch(err){
      console.log('Error saving menu item');
      res.status(500).json({error : 'Internal server error'});
    }
  })
  
  // get method to fetch all menu item data from the db.
  router.get('/', async (req, res) => {
    try{
      const data = await MenuItem.find();
      console.log('Data fetched successfully');
      res.status(200).json(data);
    }
    catch(err){
      console.log('Error getting menu items');
      res.status(500).json({error : 'Internal server error'});
    }
  })

  router.get('/:tasteType', async (req, res) => {
    const tasteType = req.params.tasteType;
    try{
      const data = await MenuItem.find({taste: tasteType});
      console.log('Data fetched successfully');
      res.status(200).json(data);
    }catch(err){
        console.log('Error getting menu items');
        res.status(500).json({error : 'Internal server error'});
    }
  })


  router.put('/:id',async (req, res) => {
    try{
      const menuId = req.params.id;
      const updatedMenuItemData = req.body;

      const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItemData,{
        new: true,
        runValidators: true,
      })

      if(!response){
        return res.status(404).json({error : 'Menu item not Found error'});
      }

      console.log('Menu item updated successfully');
      res.status(200).json(response);

    }catch(err){
      console.log('Error updating menu item');
      res.status(500).json({error : 'Internal server error'});
    }
  })

  router.delete('/:id', async(req, res)=>{
    try{
      const menuId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuId);
      
      if(!response) {
        return res.status(404).json({error : 'Menu item not Found error'});
      }
      
      console.log('Menu item deleted successfully');
      res.status(200).json(response);

    }catch (err){
      console.log('Error deleting menu item');
      res.status(500).json({error : 'Internal server error'});
    }
  })

module.exports = router;