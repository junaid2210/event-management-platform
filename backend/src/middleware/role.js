const isOrganizer = (req, res, next) => {
    if(req.user.role !== 'organizer'){
        return res.status(403).json({message: 'Organizer access only'});
    }
    next();
};

const isStudent = (req, res, next) => {
    if(req.user.role !== 'student'){
        return res.status(403).json({message: 'Student access only'});
    }
    next();
};

module.exports = {isOrganizer, isStudent};