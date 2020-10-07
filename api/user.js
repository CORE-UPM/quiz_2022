const createError = require('http-errors');
const {models} = require('../models');
const Sequelize = require('sequelize');

//-----------------------------------------------------------

// Autoload the user with id equals to :userId
exports.load = async (req, res, next, userId) => {

    try {
        const user = await models.User.findByPk(userId, {
            attributes: ['id', 'isAdmin', 'username', 'accountTypeId', 'profileId', 'profileName'],
            include: [{
                model: models.Attachment,
                as: 'photo',
                attributes: ['mime', 'url']
            }]
        });

        if (user) {
            req.load = {...req.load, user};
            next();
        } else {
            throw createError(404, 'No exist userId=' + userId);
        }
    } catch (error) {
        next(error);
    }
};

// Forces autoloading of the user with token equals to req.load.token.userId.
// The object req.load.token.userId is created by the token.load middleware.
exports.loadToken = (req, res, next) => {

    exports.load(req, res, next, req.load.token.userId);
};

//-----------------------------------------------------------

// GET /api/users
exports.index = async (req, res, next) => {

    try {
        const users = await models.User.findAll({
            attributes: ['id', 'isAdmin', 'username', 'accountTypeId', 'profileId', 'profileName'],
            include: [{
                model: models.Attachment,
                as: 'photo',
                attributes: ['mime', 'url']
            }]
        });
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//-----------------------------------------------------------

// GET /api/users/:userId
exports.show = (req, res, next) => {
    res.json(req.load.user);
};


//-----------------------------------------------------------
