const { connect } = require('mongoose');
const logger = require('../util/Logger');
//

class Connect {
    connect() {
            return new Promise( (resolve, reject) => {
                connect(
                    `mongodb+srv://${process.env.MONGO_HOST}`,
                    {
                        user: process.env.MONGO_USER,
                        pass: process.env.MONGO_PASS,
                        dbName: process.env.MONGO_DB,
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                    (err) => {
                        if (err) {
                            reject(new DatabaseError(err));
                        } else {
                            logger.info('Base de dados está conectada.');
                            resolve(true);
                        }
                    }
                );
            });
    }
}
  

module.exports = new Connect().connect();