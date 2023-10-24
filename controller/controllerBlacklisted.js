exports.getBlacklisted = (req, res) => {
    res.render('viewBlacklisted', {userData: req.session.userData});
}

exports.postBlacklisted = (req, res) => {
    res.render('viewBlacklisted');
}