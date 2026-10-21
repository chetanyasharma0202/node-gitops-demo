const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");

const app = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);

  await once(server, "listening");

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(() => {
  server.close();
});

test("GET /health returns UP", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.deepEqual(body, {
    status: "UP"
  });
});

test("GET / returns application information", async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.application, "node-gitops-demo");
  assert.equal(body.message, "CI/CD END-TO-END TEST v3");
});
