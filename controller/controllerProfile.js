exports.getProfile = (req, res) => {
    res.render('viewProfile', {userData: req.session.userData});
}

exports.postProfile = (req, res) => {
    res.render('viewProfile');
}