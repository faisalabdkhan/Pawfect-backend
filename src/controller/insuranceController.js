const InsuranceService = require("../services/mongo/InsuranceService");

class InsuranceController {
  async create(req, res) {
    try {
      console.log("req.data",req.body)
      const insurance = await InsuranceService.createInsurance(req.body);
      res.status(201).json(insurance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const insurances = await InsuranceService.getAllInsurances();
      res.status(200).json(insurances);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const insurance = await InsuranceService.getInsuranceById(req.params.id);
      if (!insurance)
        return res.status(404).json({ message: "Insurance not found" });
      res.status(200).json(insurance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const insurance = await InsuranceService.updateInsurance(
        req.params.id,
        req.body
      );
      if (!insurance)
        return res.status(404).json({ message: "Insurance not found" });
      res.status(200).json(insurance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const insurance = await InsuranceService.deleteInsurance(req.params.id);
      if (!insurance)
        return res.status(404).json({ message: "Insurance not found" });
      res.status(200).json({ message: "Insurance deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new InsuranceController();
