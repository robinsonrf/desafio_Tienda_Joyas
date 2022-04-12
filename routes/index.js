const express = require('express');
const router = express.Router();
const {HATEOAS, HATEOASV1, HATEOASV2, joya, filtroByCategory, categoria, orderValues, fieldsSelect, arrayJoyas} = require('../js/scripts');

//Requerimiento 1 - Ruta Raiz.
router.get('/joyas', (req, res) => {
    res.send({joyas: HATEOAS()});
  });
  
  //Requerimiento 2 - Versionamiento
  router.get('/api/v1/joyas', (req, res) => {
    res.send({joyas: HATEOASV1()});
  });
  
  router.get('/api/v2/joyas', (req, res) => {
    //Requerimiento 7- Ordenamiento
    const {values} = req.query;
    if(values == "asc") return res.send(orderValues("asc"));
    if(values == "desc") return res.send(orderValues("desc"));

    //Requerimeinto 6 - Paginacion
    if (req.query.page){
        const {page} = req.query;
        return res.send({joyas: HATEOASV2().slice(page * 2 - 2, page * 2)});
    }
    res.send({joyas: HATEOASV2()});
  });
  
  router.get('/joyas/:id', (req,res)=>{
      const id = req.params.id;
      res.send(joya(id));
  });
  
  //Requerimiento 3 - Filtrar por categoria
  router.get('/api/v2/category/:cat', (req,res)=>{
    const {cat} = req.params;
    categoria(cat)?
    res.send({
      cant: filtroByCategory(cat).length,
      joyas: filtroByCategory(cat),
    
    }):res.status(404).send({
        error: "404 Not Found",
        message: "Categoria no existe",
    })


  })
  
  //Requerimiento 4 - Filtrado por campos
  router.get('/api/v2/joyas/:id', (req, res)=>{
    const {id} = req.params;
    const {fields} = req.query;
    if (fields) return res.send({joya: fieldsSelect(joya(id), fields.split(","))});
    
     //Requerimiento 5 - payload, JSON con errores
        joya(id) 
        ? res.send({
            joya:joya(id),
            })
        : res.status(404).send({
            error: "404 Not Found",
            message: "No existe una Joya con ese ID",
        });
  });

  module.exports = router;