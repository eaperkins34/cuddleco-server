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
        .then(function(newAnimal) {
            res.json({
                message: 'new animal happened',
                animal: newAnimal
            });
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
    let name = req.body.table.name
    let age = req.body.table.age;
    let cat = req.body.table.cat;
    let personality = req.body.table.personality;
    let image = req.body.table.image;

    if(!req.errors) {
        Animal.update({
            name: name,
            age: age,
            cat: cat,
            personality: personality,
            image: image},
            { where: { id: req.params.id }})
            
            .then(animal => res.status(200).json(animal))
            .catch(err => res.status(500).json(req.errors))
    }
})

/*******GET ANIMALS******/
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