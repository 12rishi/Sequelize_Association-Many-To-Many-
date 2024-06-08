const express = require("express");
const { actors, movies } = require("./model/index");
require("./model/index");
const app = express();
app.use(express.json());
app.post("/actors", async (req, res) => {
  const { name } = req.body;

  try {
    name.map(async (data) => {
      await actors.create({
        name: data,
      });
    });
    res.status(200).json({
      message: name,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/movies", (req, res) => {
  const { title } = req.body;
  try {
    title.map(async (data) => {
      await movies.create({
        title: data,
      });
    });
    res.status(200).json({
      message: title,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/actors/:actorsid/movies", async (req, res) => {
  const actor = await actors.findByPk(req.params.actorsid);
  console.log(actor);
  if (actor) {
    const movieData = await movies.findAll({
      where: {
        id: req.body.movieIds,
      },
    });
    console.log(movieData);

    if (movieData.length === req.body.movieIds.length) {
      await actor.addMovie(movieData);
      res.status(200).json({
        message:
          "association has been established betwwen an actore and many movie",
      });
    } else {
      res.status(400).json({
        message: "some movie doesnot exist",
      });
    }
  } else {
    res.status(400).json({
      message: "actor doesnot exist",
    });
  }
});
app.get("/actor/:id", async (req, res) => {
  const data = await actors.findAll({
    where: {
      id: req.params.id,
    },
    include: movies,
  });
  res.status(200).json({
    message: data,
  });
});

app.listen(3000, () => {
  console.log("server has started at port no 3000");
});
