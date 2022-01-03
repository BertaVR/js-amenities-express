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

    const getPack = ( (req, res, next) => {
        Packs.findOne({ 'nombre': `${req.params.nombre}` })
            .exec(function (err, pack) {
                if (err) { return next(err); }
                // Successful, so render.
                res.status(200).type('json').json(pack);
        })
      })

    const getAllPacks = ( (req, res, next) => {
        const packs =  Packs.find().exec(function (error, packs) {
            if (error) { return next(error); }
            // Successful, so render.
            res.status(200).type('json').json(packs);
        });
          console.log(Packs);
          res.send(Packs);
    })
    
    // public API
    return {
        getAllPacks,
        getPack
    };
})(); 

exports.storeAPI = storeAPI;
