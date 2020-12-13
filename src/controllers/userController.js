// Repositories
const userRepo = require("../repositories/userRepository");

// Validations
const Validate = require('../validators/validate');
const validate = new Validate();
const ErrorMessage = require('../validators/errorMessage');
const errMes = new ErrorMessage();

// Utilities
const { v4: uuidv4 } = require("uuid");
const auth = require("../utils/auth");

class User {
  async index(_req, res) {
    const users = await userRepo.get();

    return res.json(users);
  }

  async store(req, res) {
    const { body } = req;
    const rValidate = await validate.validateUser(body);

    if (rValidate) {
      return res.status(400).json({ error: rValidate[0] });
    }

    // Checando se e-mail já está cadastrado
    const emailExists = await userRepo.getByEmail(body.email);
    const userNameExists = await userRepo.getByUserName(body.username);
    if (emailExists || userNameExists) {
      let campo = emailExists ? "E-mail" : "Username";
      return res.status(400).json({ error: `${campo} já cadastrado!` });
    }

    try {
      const user = await userRepo.create({
        email: body.email,
        name: body.name,
        username: body.username,
      });

      return res.status(201).send({
        message: "User created.",
        status: 201,
        data: user,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error.",
        status: 500,
        data: error || "Unexpected error.",
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { email, name, username } = req.body;

    const user = await userRepo.getById(id);
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    if (email) {
      const emailExists = await userRepo.getByEmail(email);
      if (emailExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado!' });
      }
    }

    if (username) {
      const userNameExists = await userRepo.getByUserName(username);
      if (userNameExists) {
        return res.status(400).json({ error: 'Username já cadastrado!' });
      }
    }

    await user.update({
      email,
      name,
      username,
    });

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await userRepo.getById(id);
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    await userRepo.delete(id);

    return res.json(user);
  }

  //passando username e email
  async authentication(req, res) {
    const { username, email } = req.body;

    const login = await userRepo.login({ username, email });
    if (!login) {
      return res
        .status(400)
        .json({ error: "Falha no Login. Username ou e-mail inválidos." });
    }

    const token = await auth.generateToken({
      id: login.id,
      email: login.email,
      usernamename: login.username,
    });

    return res.json({
      message: "Login efetuado com sucesso!",
      token,
      status: 201,
    });
  }
}

module.exports = new User();
