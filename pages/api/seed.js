import nc from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/db';
import data from '../../utils/data';
import User from '../../models/User';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany(); //delete all products before seeding
  await Product.insertMany(data.products);
  await User.deleteMany(); //delete all users before seeding
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
