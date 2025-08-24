const VaccinationService = require('../services/mongo/VaccinationService');

class VaccinationController {
  async create(req, res) {
    try {
      const vaccination = await VaccinationService.createVaccination(req.body);
      res.status(201).json(vaccination);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const vaccinations = await VaccinationService.getAllVaccinations();
      res.status(200).json(vaccinations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const vaccination = await VaccinationService.getVaccinationById(req.params.id);
      if (!vaccination) return res.status(404).json({ message: 'Vaccination not found' });
      res.status(200).json(vaccination);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const vaccination = await VaccinationService.updateVaccination(req.params.id, req.body);
      if (!vaccination) return res.status(404).json({ message: 'Vaccination not found' });
      res.status(200).json(vaccination);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const vaccination = await VaccinationService.deleteVaccination(req.params.id);
      if (!vaccination) return res.status(404).json({ message: 'Vaccination not found' });
      res.status(200).json({ message: 'Vaccination deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new VaccinationController();