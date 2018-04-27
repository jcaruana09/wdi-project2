const port           = process.env.PORT || 3000;
const databaseURI    = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project2';

module.exports = {databaseURI, port};
