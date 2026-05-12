/*const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;*/

const jwt = require("jsonwebtoken");


const protect = async (
  req,
  res,
  next
) => {

  try {

    /*
    =========================
    GET AUTH HEADER
    =========================
    */

    const authHeader =
      req.headers.authorization;


    /*
    =========================
    CHECK TOKEN EXISTS
    =========================
    */

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({

        success: false,

        message: "No token provided",

      });

    }


    /*
    =========================
    EXTRACT TOKEN
    =========================
    */

    const token =
      authHeader.split(" ")[1];


    /*
    =========================
    VERIFY TOKEN
    =========================
    */

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );


    /*
    =========================
    ATTACH USER ID
    =========================
    */

    req.user = decoded.id;


    /*
    =========================
    NEXT
    =========================
    */

    next();

  }

  catch (error) {

    console.log(error);

    res.status(401).json({

      success: false,

      message: "Invalid token",

    });

  }

};


module.exports = protect;