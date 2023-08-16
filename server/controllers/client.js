import CrimeData from "../models/crimeData.js";
import { iso1A3Code } from '@ideditor/country-coder';
import tryCatch from './utils/tryCatch.js';



export const getCrimeData = tryCatch( async (req, res) => {
 
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const crimeData = await CrimeData.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await CrimeData.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      success: true,
      result:{
      crimeData,
      total,}
    });
  });

  
  export const createCrimeData = tryCatch(async (req, res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    const newCrimeData = new CrimeData({ ...req.body, uid, uName, uPhoto });
    await newCrimeData.save();
    res.status(201).json({ success: true, result: newCrimeData });
  });

  export const DeleteCrimeData = tryCatch(async (req, res) => {
    const {_id} = await CrimeData.findByIdAndDelete(req.params.crimeDataId);
    res.status(200).json({ success: true, result: {_id} });
  });

  export const UpdateCrimeData = tryCatch(async (req, res) => {
    const updateCrimeData = await CrimeData.findByIdAndUpdate(req.params.crimeDataId, req.body,{new:true});
    res.status(200).json({ success: true, result: updateCrimeData });
  });


export const getGeography = async (req, res) => {
  try {
    const crimeData = await CrimeData.find();    
      const mappedLocations = crimeData.reduce((acc, { lat, lon }) => {  
      const countryISO3 = iso1A3Code([lon,lat]);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

