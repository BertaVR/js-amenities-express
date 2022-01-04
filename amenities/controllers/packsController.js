const importaStore = require('../domain/store/store');
const importaPack = require('../domain/pack/pack');

const Packs = require('../models/packs');


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
        let packInstance = new Pack(
            {   nombre: "aaaa", 
                messageOnRequest: greetings
            }
        );

        inventory.save(function (err) {
            if (err) return handleError(err);
        });

        res.status(200).type('json').json(packInstance);
    }

    const getPack = ( (req, res, next) => {
        console.log("ha llegado a la función");

        Packs.findOne({ 'nombre': `${req.params.nombre}` })
            .exec(function (err, pack) {
                if (err) { return next(err); }
                // Successful, so render.
                res.status(200).type('json').json(pack);
        })
      })

    const getAllPacks = ( (req, res, next) => {
        console.log("ha llegado a la función");

        const packs =  Packs.find({}).exec(function (error, packs) {
            if (error) { return next(error); }
            // Successful, so render.
            res.status(200).type('json').json(packs);
        });
          console.log(packs);
    })
    
    // public API
    return {
        getAllPacks,
        getPack
    };
})(); 

exports.storeAPI = storeAPI;
