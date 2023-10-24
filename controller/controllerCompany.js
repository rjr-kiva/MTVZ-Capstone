exports.getCompany = (req, res) => {
    res.render('viewCompany', {userData: req.session.userData});
}

exports.postCompany = (req, res) => {
    res.render('viewCompany');
}