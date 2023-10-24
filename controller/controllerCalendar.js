exports.getCalendar = (req, res) => {
    res.render('viewCalendar', {userData: req.session.userData});
}

exports.postCalendar = (req, res) => {
    res.render('viewCalendar');
}