import type { NextApiRequest, NextApiResponse } from "next";

import knex from "../../clients/knex";

const TABLE = "palette";

export interface RGB {
  id?: number;
  red: number;
  green: number;
  blue: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const colors: RGB[] = await knex(TABLE);
    res.status(200).json(colors);
  } else if (req.method === "POST") {
    const color = await knex(TABLE).insert(req.body);
    res.status(200).json(color);
  } else if (req.method === "PUT") {
    await knex(TABLE).where({ id: req.body.id }).update(req.body);

    const [color] = await knex(TABLE).where({ id: req.body.id }).limit(1);
    res.status(200).json(color);
  } else if (req.method === "DELETE") {
    await knex(TABLE).where({ id: req.body }).delete();
    res.status(200).json({ id: req.body });
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
