const express = require("express");
const app = express();
const https = require("https");
const port = process.env.PORT || 3000;
const path = require("path");

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.set("views", `${__dirname}/views`);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const city = req.body.city;
  const apiKey = "your_api_key";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  https.get(url, async (response) => {
    console.log(response.statusCode);
    response.on("data", async (data) => {
      const weatherData = await JSON.parse(data);
      // console.log(weatherData);
      let iconurl = weatherData.weather[0].icon;
      const date = new Date();
      const time = date.toDateString();
      res.render("data", {
        cityName: weatherData.name,
        temp: weatherData.main.temp,
        des: weatherData.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${iconurl}@2x.png`,
        time: time,
      });
    });
  });

  // res.send(`<h1>${city}Success</h1>`);
});

app.listen(port, () => {
  console.log("server running on port " + port + "");
});

const date = new Date();
console.log(date.toDateString);
