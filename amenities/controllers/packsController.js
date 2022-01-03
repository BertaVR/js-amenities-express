const importaStore = require('../domain/store/store');
const importaPack = require('../domain/pack/pack');

const Packs = require('../models/Packs');


var storeAPI = (function singleController() {

    let store = importaStore.singletonStore.getStore();
    let {inventory} = store;



    
    // get a meeseeks
    
  /* const getInventory = function(req, res) {
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
    }*/

    const getAllPacks = ( (req, res, next) => {
        Packs.find()
            .exec(function (err, packs) {
                if (err) { return next(err); }
                res.status(200).type('json').json(Packs);
            })
    })
    
    // public API
    return {
        getAllPacks
    };
})(); 

exports.storeAPI = storeAPI;
