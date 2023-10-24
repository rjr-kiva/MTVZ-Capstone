exports.getRecords = (req, res) => {
    res.render('viewRecords', {userData: req.session.userData});
}

exports.postRecords = (req, res) => {
    res.render('viewRecords');
}