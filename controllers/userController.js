const userService = require("../services/userService");

class UserController {
  constructor(service) {
    this.service = service;
  }
  async getUsers(req, res) {
    this.service.getAllUsers((err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result.rows);
    });
  }
  async getUserById(req, res) {
    this.service.getUserById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result.rows[0]);
    });
  }

  createUser(req, res) {
    console.log(req.body);
    this.service.createUser(req.body, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(result.rows);
    });
  }

  updateUser(req, res) {
    const { id } = req.params;
    this.service.updateUser(id, req.body, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(result.rows[0]);
    });
  }
  deleteUser(req, res) {
    const { id } = req.params;
    this.service.updateUser(id, { deleted: true }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      return res.json(result.rows[0]);
    });
  }
  searchUser(req, res) {
    const { search } = req.query;
    const searchTerm = search.toLowerCase();
    this.service.searchUser(
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        return res.json(result.rows);
      }
    );
  }
}
// Create controller instance
module.exports = new UserController(userService);
