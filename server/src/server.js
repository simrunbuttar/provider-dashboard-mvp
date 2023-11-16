const app = require('./app')
const cors = require('cors')

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
