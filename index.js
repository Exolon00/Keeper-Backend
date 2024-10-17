const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(cors())
app.use(bodyParser.json());
app.use("/user", userRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
