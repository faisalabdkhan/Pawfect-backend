const GroomingService = require("../services/mongo/GroomingService");

class GroomingController {
  async create(req, res) {
    try {
      const grooming = await GroomingService.createGrooming(req.body);
      res.status(201).json(grooming);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const groomings = await GroomingService.getAllGroomings();
      res.status(200).json(groomings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const grooming = await GroomingService.getGroomingById(req.params.id);
      if (!grooming)
        return res.status(404).json({ message: "Grooming not found" });
      res.status(200).json(grooming);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const grooming = await GroomingService.updateGrooming(
        req.params.id,
        req.body
      );
      if (!grooming)
        return res.status(404).json({ message: "Grooming not found" });
      res.status(200).json(grooming);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const grooming = await GroomingService.deleteGrooming(req.params.id);
      if (!grooming)
        return res.status(404).json({ message: "Grooming not found" });
      res.status(200).json({ message: "Grooming deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new GroomingController();
