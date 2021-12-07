const importaStore = require('../domain/store');
const importaPack = require('../domain/pack');

const pack = require('../models/Packs');
const Boxes = require('../models/boxes');


var storeAPI = (function singleController() {

    let store = importaStore.singletonStore.getStore();
    let {inventory} = store;



    
    // get a meeseeks
    
    const getInventory = function(req, res) {
        // res.send('NOT IMPLEMENTED: Create meeseeks');
        store.getInventory()
        console.log("Number of items= ", inventory.size);

        // destructuring
        // Utilizo destructurig para forzar la busqueda en
        // la cadena de prototipos del objeto MrMeeseeks {} 
        // de sus propiedades message. Lo que hay en 
        // reality es un objeto sin own properties 
        // MrMeeseeks {} cuyo prototipo es el objeto
        // que está en la propiedad this.mrMeeseeks
        // de box
        let {messageOnCreate: hi, messageOnRequest: greetings} = Array.from(inventory).pop();

        // a la bbdd
        let meeseeksInstance = new Pack(
            {   messageOnCreate: hi, 
                messageOnRequest: greetings
            }
        );

        inventory.save(function (err) {
            if (err) return handleError(err);
        });

        res.status(200).type('json').json(meeseeksInstance);
    }

    // get meeseeks por parametro

    const getBox = ( (req, res) => {
        Boxes.findOne({ 'name': `${req.params.owner}'s box` })
            .exec(function (err, box) {
                if (err) { return next(err); }
                // Successful, so render.
                res.status(200).type('json').json(box);
        })
    })

    const deleteBox = async function(req, res) {
        Boxes.findOneAndDelete({ 'name': `${req.params.owner}'s box` })
            .exec(function (err, deletedBox) {
                if (err) { return next(err); }
                res.redirect('/reality/explode/' + deletedBox.mrMeeseeks._id.toString());
            })
    }

    const getAllBoxes = ( (req, res) => {
        Boxes.find()
            .exec(function (err, boxes) {
                if (err) { return next(err); }
                // Successful, so render.
                res.status(200).type('json').json(boxes);
            })
    })
    
    // public API
    return {
        factory,
        createMeeseeks,
        getBox,
        deleteBox,
        getAllBoxes
    };
})(); 


exports.boxAPI = boxAPI;