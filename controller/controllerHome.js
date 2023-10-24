exports.getHome = (req, res) => {
    res.render('viewHome', {userData: req.session.userData});
}

exports.postHome = (req, res) => {
    res.render('viewHome');
}