const express = require("express");
const os = require("os");

const app = express();

app.get("/", (req, res) => {
  res.json({
    application: "node-gitops-demo",
    message: "CI/CD END-TO-END TEST v2",
    version: process.env.APP_VERSION || "dev",
    hostname: os.hostname()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP"
  });
});

module.exports = app;
