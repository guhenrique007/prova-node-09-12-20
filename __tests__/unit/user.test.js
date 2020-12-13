const request = require("supertest");

const app = require("../../src/app");
const auth = require("../../src/utils/auth");
const factory = require("../factories");
const User = require("../../models/User").definition;

describe("Users", () => {
  describe("GET", () => {
    it("/users", async () => {
      const res = await request(app).get("/users").send();

      expect(res.status).toBe(200);
    });
  });

  describe("POST", () => {
    it("/users", async () => {
      const res = await request(app).post("/users").send({
        name: "Mock Name",
        username: "mock_007",
        email: "mock@mail.com",
      });

      await User.destroy({ where: { id: res.body.data.id } });

      expect(res.status).toBe(201);
    });
  });

  describe("PUT", () => {
    it("/users", async () => {
      const user = await factory.create("User", {});

      const res = await request(app).put(`/users/${user.id}`).send({
        name: "Edited name",
      });

      await factory.cleanUp();

      expect(res.status).toBe(200);
    });
  });

  describe("DELETE", () => {
    it("/users", async () => {
      const user = await factory.create("User", {});

      const token = await auth.generateToken({
        id: user.id,
        email: user.email,
        usernamename: user.username,
      });

      const res = await request(app)
        .delete(`/users/${user.id}`)
        .set("x-access-token", token);

      await factory.cleanUp();

      expect(res.status).toBe(200);
    });
  });
});
