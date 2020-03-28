const connection = require('../database/conn');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    try {
      const ong = await connection('ongs')
        .where('id', id)
        .first('name');

      if (ong) return response.json(ong);
      else return response.status(404).send({error: 'No ONG found with this ID'}); 

    } catch (error) {
      return response.status(500).send(error);
    }
  }
};
