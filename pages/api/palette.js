import knex from "../../clients/knex";

const ENTITY = "palette";

export default async (req, res) => {
  if (req.method === "GET") {
    const colors = await knex(ENTITY);
    res.status(200).json(colors);

  } else if (req.method === "PUT") {
    await knex(ENTITY)
      .where({ id: req.body.id })
      .update({ body: req.body.body });

    const [color] = await knex(ENTITY)
      .where({ id: req.body.id })
      .limit(1);

    res.status(200).json(color);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
