var router = require('express').Router();
var Sequelize = require('../db');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = Sequelize.import('../models/user.js');

router.post('/', (req, res) => {
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10),
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        phoneNumber: req.body.user.phoneNumber,
        email: req.body.user.email
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
        
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
        },
        createError = err => res.status(500).send(err)
        )
});

router.delete('/delete/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id }})
    .then(user => res.status(200).json(user))
    .catch(err => res.json(req.errors))
})

module.exports = router;