const isOrganizer = (req, res, next) => {
    if(req.user.role !== 'organizer'){
        res.status(403).json({message: 'Organizer access only'});
    }
    next();
};

const isStudent = (req, res, next) => {
    if(req.user.role !== 'student'){
        res.status(403).json({message: 'Student access only'});
    }
};

module.exports = {isOrganizer, isStudent};