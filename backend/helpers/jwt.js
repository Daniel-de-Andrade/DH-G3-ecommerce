const { sign, verify } = require("jsonwebtoken");

const secrety = "docinhoDeLeite23";

module.exports = {
  generateToken: (user_id) =>
    sign({}, secrety, {
      subject: `${user_id}`,
      expiresIn: "30d",
    }),
  verifyToken: (token) => verify(token, secrety),
};
