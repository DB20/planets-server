module.exports = app => {

    const planets = require("../controllers/planets.controller.js");

    var router = require("express").Router();

    // Create a new Planet
    router.post("/", planets.create);

    // Retrieve all Planets
    router.get("/", planets.findAll);
  
    // Retrieve all OK Planets
    router.get("/statusok", planets.findAllOkPlanets);
  
    // Retrieve a single Planet with id
    router.get("/:id", planets.findOne);
  
    // Update a Planet with id
    router.put("/:id", planets.update);
  
    // Delete a Planet with id
    router.delete("/:id", planets.delete);
  
    // Delete all Planets
    router.delete("/", planets.deleteAll);
  
    app.use('/api/planets', router);
  };