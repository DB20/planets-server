const db = require("../models");
const Planet = db.planets;

// Create and Save a new Planet
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      // Create a Planet
      const planet = new Planet({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        status: req.body.status,
        robots: req.body.robots,
        captain: req.body.captain
      });
    
      // Save Planet in the database
      planet
        .save(planet)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Planet."
          });
        });
};


//Retrieve all Planets/ find by name from the database:
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Planet.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving planets."
      });
    });
};


// Find a single Planet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Planet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Planet with id=${id} not found`});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Planet with id=" + id });
    });
};


// Update a Planet by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Planet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Planet with id=${id}. Maybe Planet was not found!`
            });
          } else res.send({ message: "Planet was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Planet with id=" + id
          });
        });
};


// Delete a Planet with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Planet.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Planet with id=${id}. Maybe Planet was not found!`
          });
        } else {
          res.send({
            message: "Planet was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Planet with id=" + id
        });
      });
};


// Delete all Planets from the database.
exports.deleteAll = (req, res) => {
    Planet.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Planets were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


// Find all OK Planets
exports.findAllOkPlanets = (req, res) => {
    Planet.find({ status: 'OK' })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
