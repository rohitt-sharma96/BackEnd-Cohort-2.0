/* 
server ko start karna
database ko connect karna

 */

require('dotenv').config();
const connectToDb = require('./src/config/database')
const app = require('./src/app')



connectToDb();


app.listen(3000,()=>{
    console.log('server is runnin on port 3000')
})