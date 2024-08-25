const { getUser } = require("../service/auth");

// async function useForRestrictUserOnly(req, res, next) {
//   console.log(req.headers["authorization"], "reqqqqqqq");
//   const userUid = req.headers["authorization"];

//   if (!userUid) return res.render("login");

//   const token = userUid.split("Bearer ")[1];

//   //   const user = getUser(userUid);
//   const user = getUser(token);

//   if (!user) {
//     return res.render("login");
//   } else {
//     return res.render("home");
//   }

//   req.user = user;
//   next();
// }

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];

  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  )
    return next();

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (roles.includes(req.user.role)) return res.end("UnAuthorized");

    next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
