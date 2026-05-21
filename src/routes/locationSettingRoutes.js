const express = require("express");

const router = express.Router();

const locationController = require("../controllers/locationSettingController");

// ======================================================
// COUNTRY ROUTES
// ======================================================

// ADD COUNTRY
router.post(
  "/country/add",
  locationController.addCountry
);

// UPDATE COUNTRY
router.put(
  "/country/update/:id",
  locationController.updateCountry
);

// GET ALL COUNTRIES
router.get(
  "/country/all",
  locationController.getAllCountry
);

// GET SINGLE COUNTRY
router.get(
  "/country/single/:id",
  locationController.getSingleCountry
);

// COUNTRY DROPDOWN
router.get(
  "/country/dropdown",
  locationController.getCountryDropdown
);

// DELETE COUNTRY
router.delete(
  "/country/delete/:id",
  locationController.deleteCountry
);

// ======================================================
// STATE ROUTES
// ======================================================

// ADD STATE
router.post(
  "/state/add",
  locationController.addState
);

// UPDATE STATE
router.put(
  "/state/update/:id",
  locationController.updateState
);

// GET ALL STATES
router.get(
  "/state/all",
  locationController.getAllState
);

// GET SINGLE STATE
router.get(
  "/state/single/:id",
  locationController.getSingleState
);

// STATE DROPDOWN
router.get(
  "/state/dropdown",
  locationController.getStateDropdown
);

// DELETE STATE
router.delete(
  "/state/delete/:id",
  locationController.deleteState
);

// ======================================================
// CITY ROUTES
// ======================================================

// ADD CITY
router.post(
  "/city/add",
  locationController.addCity
);

// UPDATE CITY
router.put(
  "/city/update/:id",
  locationController.updateCity
);

// GET ALL CITY
router.get(
  "/city/all",
  locationController.getAllCity
);

// GET SINGLE CITY
router.get(
  "/city/single/:id",
  locationController.getSingleCity
);

// CITY DROPDOWN
router.get(
  "/city/dropdown",
  locationController.getCityDropdown
);

// DELETE CITY
router.delete(
  "/city/delete/:id",
  locationController.deleteCity
);

module.exports = router;