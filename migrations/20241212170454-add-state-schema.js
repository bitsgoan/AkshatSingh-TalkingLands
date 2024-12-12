module.exports = {
  async up(db, client) {
    // Create the State collection
    await db.createCollection("states");

    // Create an index on the geometry field (2dsphere index)
    await db.collection("states").createIndex({ geometry: "2dsphere" });
  },

  async down(db, client) {
    // Drop the 'states' collection if we need to rollback
    await db.collection("states").drop();
  },
};
