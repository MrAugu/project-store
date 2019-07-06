module.exports = (req, res, renderTemplate) => {
  // renderTemplate(res, req, "pages/signup.ejs");
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  console.log(`Email: ${email}`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
};