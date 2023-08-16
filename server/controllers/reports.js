import CrimeData from "../models/crimeData.js";

export const getReports = async (req, res) => {
  try {
    const crimeData = await CrimeData.find().sort({ _id: -1 });

    res.status(200).json(crimeData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};