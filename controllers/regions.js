import { Data } from "../models/data.models.js";


const regions = async (req,res)=>{
    
    const field = req?.body?.field 
    
const region = await Data.aggregate([
    // Group by the 'region' field and count the number of occurrences
    {
      $group: {
        _id: `$${field}`,
        count: { $sum: 1 }
      }
    },
    // Sort the results by region name (optional)
    {
      $sort: { _id: 1 }
    },
    // Add a stage to project the results into a more readable format (optional)
    {
      $project: {
        _id: 0,
        field: '$_id',
        count: 1
      }
    }
  ])


  res.status(200).json(region)
}


export {regions}