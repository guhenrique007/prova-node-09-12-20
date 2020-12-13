const request = require("supertest");

const app = require("../../src/app");
const auth = require("../../src/utils/auth");
const factory = require("../factories");

describe("Autenticacao", () => {
  it("Deve retornar um token JWT quando autenticado com as credenciais válidas", async () => {
    const user = await factory.create("User", {});

    const res = await request(app).post("/users/login").send({
      email: user.email,
      username: user.username,
    });

    await factory.cleanUp();

    expect(res.status).toBe(200);
  });

  it("Deve acessar rotas privadas com a autenticação", async () => {
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

  it("Não deve acessar rotas privadas com token inválido", async () => {
    const user = await factory.create("User", {});

    const res = await request(app)
      .delete(`/users/${user.id}`)
      .set("x-access-token", "token");

    await factory.cleanUp();

    expect(res.status).toBe(401);
  });
});
