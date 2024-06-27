const { db } = require("./models/index.js");
const app = require("./app.js");

const PORT = process.env.PORT || 3001;

const init = async () => {
  try {
    await db.sync();

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error)
  }
};

init();
