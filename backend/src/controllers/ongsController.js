const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/conn');

module.exports = {
  async index(request, response) {
    const { id } = request.params;
    try {
      const user = await connection('ongs')
        .where({ id })
        .first();
      if (user) return response.json(user);
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async list(request, response) {
    const { page = 1, offset } = request.query;

    try {
      if (offset) {
        const [count] = await connection('ongs').count('*');
        const ongs = await connection('ongs')
          .limit(offset)
          .offset((page - 1) * offset)
          .select('*');
        response.header('X-Total-Count', count['count(*)']);
        return response.json(ongs);
      } else {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
      }
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    try {
      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });

      return response.json({ id });
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { name, email, whatsapp, city, uf } = request.body;

    try {
      const user = await connection('ongs')
        .where({ id: id })
        .update({
          name,
          email,
          whatsapp,
          city,
          uf
        });

      if (user) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      const user = await connection('ongs')
        .where({ id })
        .delete();

      if (user) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
};
