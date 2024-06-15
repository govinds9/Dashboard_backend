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

const dashData = async (req, res)=>{

    try {
        const totalCountriesPromise = await Data.aggregate([
          { $group: { _id: '$country' } },
          { $count: 'totalCountries' }
        ]);
    
        const totalSectorsPromise = await Data.aggregate([
          { $group: { _id: '$sector' } },
          { $count: 'totalSectors' }
        ]);
    
        const totalTopicsPromise = await Data.aggregate([
          { $group: { _id: '$topic' } },
          { $count: 'totalTopics' }
        ]);
        const totalRegionsPromise = await Data.aggregate([
          { $group: { _id: '$region' } },
          { $count: 'totalRegions' }
        ]);
        
         const startpromise = await util("start_year")
         const regionpromise = await util("region")
         const likelihoodpromise = await util("likelihood")
         const relevancepromise = await util("relevance")
        // Execute all promises in parallel
        const [totalCountries, totalSectors, totalTopics,totalRegions] = await Promise.all([
          totalCountriesPromise,
          totalSectorsPromise,
          totalTopicsPromise,
          totalRegionsPromise
          
        ]);
    
        res.status(200).json({
          totalCountries: totalCountries[0] ? totalCountries[0].totalCountries : 0,
          totalSectors: totalSectors[0] ? totalSectors[0].totalSectors : 0,
          totalTopics: totalTopics[0] ? totalTopics[0].totalTopics : 0,
          totalRegions:totalRegions[0] ? totalRegions[0].totalRegions : 0,
          start_year:startpromise,
          region:regionpromise,
          likelihood:likelihoodpromise,
          relevance:relevancepromise
        });
      } catch (error) {
        res.status(500).send(error);
      }

}


export {dashData,util}