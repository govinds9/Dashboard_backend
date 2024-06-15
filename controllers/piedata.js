import { Data } from "../models/data.models.js";


const util = async (field)=>{
  const result = await Data.aggregate([
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

     return result
}




const pieData = async (req, res)=>{

    try {
       
         const startpromise = await util("start_year")
         const endyearpromise = await util("end_year")
         const sectorpromise = await util("sector")
        
         const impactpromise = await util("impact")
        // Execute all promises in parallel
       
    
        res.status(200).json({
        
         final: [startpromise,
          endyearpromise,
          sectorpromise,
          impactpromise
        ],
        field:["Start Year","End Year", "Sector", "Impact"]
        });
      } catch (error) {
        res.status(500).send(error);
      }

}


const barData = async (req, res)=>{

  try {
     
       const regionpromise = await util("region")
       const pestlepromise = await util("pestle")
       
      // Execute all promises in parallel
     
  
      res.status(200).json({
      
       final: [regionpromise,
        pestlepromise,
        
      ],
      field:["Region","Pestle"]
      });
    } catch (error) {
      res.status(500).send(error);
    }

}



export {pieData, barData}