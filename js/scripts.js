const joyas = require('../data/joyas');
const arrayJoyas= joyas.results;

const HATEOAS = () => arrayJoyas;

const HATEOASV1 = () =>
  arrayJoyas.map((g) =>{
    return {
      name: g.name,
      href: `http://localhost:3000/joyas/${g.id}`,
    };
  });

  const HATEOASV2 = () =>
  arrayJoyas.map((g) =>{
    return {
      joya: g.name,
      src: `http://localhost:3000/joyas/${g.id}`,
    };
  });

  const joya = (id) =>{
    return arrayJoyas.find((g)=> g.id == id);
  };

  const categoria = (cat) =>{
    return arrayJoyas.find((g)=> g.category == cat);
  };

  const filtroByCategory = (category) =>{
      return arrayJoyas.filter((g)=> g.category === category);
  };

  const fieldsSelect = (joya, fields) =>{
      for (propiedad in joya){
          if(!fields.includes(propiedad)) delete joya[propiedad];
      }
      return joya;
  };

  const orderValues = (order)=>{
      return order == "asc" ? arrayJoyas.sort((a,b) => (a.value > b.value ? 1 : -1)) 
      : 
      order == "desc" ? arrayJoyas.sort((a,b) => (a.value < b.value ? 1 : -1))
      : false
  }


  module.exports = {HATEOAS, HATEOASV1, HATEOASV2, joya, filtroByCategory, fieldsSelect, orderValues, categoria, arrayJoyas} 
