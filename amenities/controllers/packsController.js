const importaStore = require('../domain/store/store');
const importaPack = require('../domain/pack/pack');

const Packs = require('../models/packs');


var storeAPI = (function singleController() {

    let store = importaStore.singletonStore.getStore();
    let {inventory} = store;




    const getPack = ( (req, res, next) => {
        console.log("ha llegado a la función del controlador");

        Packs.findOne({ 'nombre': `${req.params.nombre}` })
            .exec(function (err, pack) {
                if (err) { return next(err); }
                // Successful, so render.
                res.status(200).type('json').json(pack);
        })
      })

    const getAllPacks = ( (req, res, next) => {
        console.log("ha llegado a la función del controlador");

        const packs =  Packs.find({}).exec(function (error, packs) {
            if (error) { return next(error); }
            // Successful, so render.
            res.status(200).type('json').json(packs);
        });
    })
    
    // public API
    return {
        getAllPacks,
        getPack
    };
})(); 

exports.storeAPI = storeAPI;
