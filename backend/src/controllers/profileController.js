const connection = require('../database/conn');

module.exports = {
  async list(request, response) {
    const ong_id = request.headers.authorization;

    try {
      const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');
      return response.json(incidents);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
};
