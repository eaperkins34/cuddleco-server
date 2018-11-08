const router = require('express').Router();
//const validateSession = require('../middleware/validate-session');
const Animal = require('../db').import('../models/animals');

/********CREATE NEW ANIMAL********/
router.post('/create', (req, res) => {
    let name = req.body.animal.name;
    let age = req.body.animal.age;
    let cat = req.body.animal.cat;
    let personality = req.body.animal.personality;
    let image = req.body.animal.image;

    Animal
        .create({
            name: name,
            age: age,
            cat: cat,
            personality: personality,
            image: image,
        })
        .then(function() {
            res.send('new animal posted');
        },
        function(err) {
            console.log(err);
    });
})

/********DELETE ANIMAL********/
router.delete('/delete/:id', (req, res) => {
    Animal.destroy({ where: { id: req.params.id }})
        .then( animal => res.status(200).json(animal))
        .catch( err => res.json(req.errors))
})

/*******UPDATE*******/
router.put('/update/:id', (req, res) => {
    if(!req.errors) {
        Animal.update(req.body.animal, { where: { id: req.params.id }})
            .then(animal => res.status(200).json(animal))
            .catch(err => res.status(500).json(req.errors))
    }
})

/*******GET ALL******/
router.get('/all', (req, res) => {
    Animal.findAll()
        .then(animal => res.status(200).json(animal))
        .catch(error => res.status(500).json(error))
});

router.get('/cats', (req, res) => {
    Animal.findAll({ where: {cat: true }})
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/dogs', (req, res) => {
    Animal.findAll({ where: {cat: false }})
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;