const express = require("express");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');

const YAML = require('yamljs');
const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(express.json({ extended: false }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Authentication Route
app.use("/authentication", require("./routes/login"));

// Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

app.use("/user", require("./routes/user"));

app.use("/settings", require("./routes/webConsole"));
app.use("/template", require("./routes/template"));
app.use("/systems", require("./routes/connectedsystems"));
app.use('/uploads', express.static('uploads'));
app.use('/instance', require("./routes/connectedsystemsInstance"));
app.use('/integration', require("./routes/integration"));

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
