module.exports = (req, res, renderTemplate) => {
    renderTemplate(res, req, "pages/signup.ejs", { alert: null });
};