  module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        image: String,
        description: String,
        status: String,
        robots: String,
        captain: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Planets = mongoose.model("planet", schema);
    return Planets;
  };