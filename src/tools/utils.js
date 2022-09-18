const typeorm = require("typeorm");

module.exports = {
  dataSource: new typeorm.DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [require("../models/wilderModels"), require("../models/skillsModels")]
  }),
};
