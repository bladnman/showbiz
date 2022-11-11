const path = require("path");
require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const rewrite = require("express-urlrewrite");
const cors = require("cors");

const app = express();
const port = process.env.VITE_DEV_SERVER_PORT || 8903;
const baseUrl = `http://localhost:${port}`;

// CORS - enable all requests
app.use(cors());

// REWRITE URLS
app.use(
  rewrite("/search/multi\\?query=:query&*", "/data/search/multi/:query.json")
);

app.use(rewrite("/:type/:id/images\\?*", "/data/images/:id.json"));

app.use(rewrite("/tv/:id\\?*", "/data/tv/:id.json"));
app.use(rewrite("/movie/:id\\?*", "/data/movie/:id.json"));
app.use(rewrite("/person/:id\\?*", "/data/person/:id.json"));

// CATCH URL PATTERNS
app.use(express.static(path.join(__dirname, "public", "images")));
app.use(express.static(path.join(__dirname, "public", "data")));
app.use(express.static(path.join(__dirname, "public")));

// LISTEN
app.listen(port, () => {
  console.log(`Example app listening on port [${port}] => ${baseUrl}`);
  console.log(`   try: ${baseUrl}/blood.json`);
  console.log(`   try: ${baseUrl}/search/multi/blood.json`);
  console.log(`   try: ${baseUrl}/search/multi?query=blood`);
});
