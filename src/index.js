const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [
  {
    id: "ecd77c0c-f5bb-4dd1-8d09-cd30bb66e3cf",
    title: "testeee",
    url: "https.....",
    techs: "alguma coisa",
    likes: 0,
  },
];

function checkRepoExists(request, response, next) {
  const { id } = request.params;

  const repo = repositories.find((numId) => numId.id == id);

  if (!repo) {
    return response.status(404).json({ error: "Not Found" });
  }

  next();
  return response.status(201).json(repo);
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", checkRepoExists, (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repository = repositories.find(
    (repositoryUpdate) => repositoryUpdate.id === id
  );

  return response.json(repository);
});

app.delete("/repositories/:id", checkRepoExists, (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.indexOf((repository) => repository.id === id);

  if (repositoryIndex > 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.find((repository) => repository.id === id);

  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositoryIndex.likes;

  return response.json(repositoryIndex);
});

module.exports = app;
