module.exports = (req, res, renderTemplate) => {
    renderTemplate(res, req, "pages/login.ejs");
};