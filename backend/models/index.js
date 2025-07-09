// // const sequelize = require("../config/db");

// // const Test = require("./test.model");
// // const Section = require("./section.model");
// // const MCQ = require("./mcq");

// // // Define relationships
// // Test.hasMany(Section, { foreignKey: "testId" });
// // Section.belongsTo(Test, { foreignKey: "testId" });

// // Section.hasMany(MCQ, { foreignKey: "sectionId" });
// // MCQ.belongsTo(Section, { foreignKey: "sectionId" });

// // module.exports = {
// //   sequelize,
// //   Test,
// //   Section,
// //   MCQ,
// // };

// // const { Sequelize, DataTypes } = require("sequelize");
// // const sequelize = require("../config/db");

// // const Test = require("./test.model")(sequelize, DataTypes);
// // const Section = require("./section.model")(sequelize, DataTypes);
// // const MCQ = require("./mcq")(sequelize, DataTypes);
// // const User = require("./User")(sequelize, DataTypes);

// // // Define associations
// // Test.hasMany(Section, { foreignKey: "testId" });
// // Section.belongsTo(Test, { foreignKey: "testId" });

// // Section.hasMany(MCQ, { foreignKey: "sectionId" });
// // MCQ.belongsTo(Section, { foreignKey: "sectionId" });

// // module.exports = {
// //   sequelize,
// //   Sequelize,
// //   Test,
// //   Section,
// //   MCQ,
// // };


// // models/index.js
// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// // Import model functions
// const testModel = require("./test.model");
// const sectionModel = require("./section.model");
// const mcqModel = require("./mcq");
// const userModel = require("./User");
// const passcode = require("./Passcode");
// const License = require("./License");
// const LicensedUser = require("./LicensedUser");

// // Initialize models
// const db = {
//   sequelize,
//   Sequelize,
//   passcode,
//   License,
//   LicensedUser,
//   Test: testModel(sequelize, DataTypes),
//   Section: sectionModel(sequelize, DataTypes),
//   MCQ: mcqModel(sequelize, DataTypes),
//   User: userModel(sequelize, DataTypes)
// };

// // Define associations
// db.Test.hasMany(db.Section, { foreignKey: "test_id" });
// db.Section.belongsTo(db.Test, { foreignKey: "test_id" });

// db.Section.hasMany(db.MCQ, { foreignKey: "section_id" });
// db.MCQ.belongsTo(db.Section, { foreignKey: "section_id" });

// module.exports = db;


// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Import model functions
const testModel = require("./test.model");
const sectionModel = require("./section.model");
const mcqModel = require("./mcq");
const userModel = require("./User");
const passcodeModel = require("./Passcode");
const licenseModel = require("./License");
const licensedUserModel = require("./LicensedUser");

// Initialize Sequelize models
const db = {
  sequelize,
  Sequelize,
  Test: testModel(sequelize, DataTypes),
  Section: sectionModel(sequelize, DataTypes),
  MCQ: mcqModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes),
  passcodeModel,
  License: licenseModel(sequelize, DataTypes),
  LicensedUser: licensedUserModel(sequelize, DataTypes),
};

// Define model associations
db.Test.hasMany(db.Section, { foreignKey: "test_id" });
db.Section.belongsTo(db.Test, { foreignKey: "test_id" });

db.Section.hasMany(db.MCQ, { foreignKey: "section_id" });
db.MCQ.belongsTo(db.Section, { foreignKey: "section_id" });

db.License.hasMany(db.LicensedUser, { foreignKey: "license_id", as: "users" });
db.LicensedUser.belongsTo(db.License, { foreignKey: "license_id", as: "license" });

module.exports = db;
