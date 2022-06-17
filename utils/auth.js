import jwt from 'jsonwebtoken';

const signToken = (user) => {
  //sign receives user as payload
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

export { signToken };
