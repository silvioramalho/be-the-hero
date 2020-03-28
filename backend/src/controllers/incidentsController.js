const crypto = require('crypto');
const connection = require('../database/conn');

module.exports = {
  async index(request, response) {
    const { id } = request.params;
    try {
      const incident = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .where({ 'incidents.id': id })
        .first({
          id: 'incidents.id',
          title: 'incidents.title',
          description: 'incidents.description',
          value: 'incidents.value',
          ong_id: 'incidents.ong_id'
        });
      if (incident) return response.json(incident);
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async list(request, response) {
    const { page = 1, offset } = request.query;
    try {
      const [count] = await connection('incidents').count('*');
      if (offset) {
        const incidents = await connection('incidents')
          .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
          .limit(offset)
          .offset((page - 1) * offset)
          .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
          ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
      } else {
        const incidents = await connection('incidents')
          .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
          .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
          ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
      }
    } catch (error) {
      console.error(error);
      return response.status(500).send(error);
    }
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    if (!ong_id) {
      return response.status(401).send({ error: 'Operation not permitted.' });
    }

    if (!(await connection('ongs').where({id: ong_id}).first())) {
      return response.status(401).send({ error: 'Operation not permitted.' });
    }

    try {
      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
      });

      return response.json({ id });
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { title, description, value, ong_id } = request.body;

    try {
      const operation = await connection('incidents')
        .where({ id: id })
        .update({
          title,
          description,
          value,
          ong_id
        });

      if (operation) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    if (!ong_id) {
      return response.status(401).send({ error: 'Operation not permitted.' });
    }

    try {
      const incident = await connection('incidents')
        .where({ id })
        .select('ong_id')
        .first();

      if (!incident) {
        return response.status(404).send();
      } else if (incident.ong_id !== ong_id) {
        return response.status(401).send({ error: 'Operation not permitted.' });
      }

      const operation = await connection('incidents')
        .where({ id })
        .delete();

      if (operation) return response.status(204).send();
      else return response.status(404).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send(error);
    }
  }
};
