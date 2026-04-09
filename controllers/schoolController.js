const { insertSchool, fetchAllSchools } = require("../models/schoolModel");
const { getDistanceKm } = require("../utils/distance");
const { addSchoolSchema, listSchoolsSchema, validate } = require("../utils/validation");

const addSchool = async (req, res, next) => {
  try {
    const { error, value } = validate(addSchoolSchema, req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    const schoolId = await insertSchool(value);

    res.status(201).json({
      success: true,
      message: "School added successfully",
      schoolId,
    });
  } catch (err) {
    next(err);
  }
};

const listSchools = async (req, res, next) => {
  try {
    const { error, value } = validate(listSchoolsSchema, req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    const { latitude, longitude } = value;
    const schools = await fetchAllSchools();

    const sorted = schools
      .map((school) => ({
        ...school,
        distance: getDistanceKm(latitude, longitude, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    next(err);
  }
};

module.exports = { addSchool, listSchools };
