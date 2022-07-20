const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


export const generateToken = (userMail: string, userId: string) =>
  jwt.sign({ email: userMail, userId }, process.env.PRIVATE_KEY, {
    expiresIn: 86400,
  });

export const checkToken = (token: string) =>
  jwt.verify(token, process.env.PRIVATE_KEY, (err: any, decoded: any) =>
    err
      ? {
          err: err?.message,
        }
      : decoded
  );

  export const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));


