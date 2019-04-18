var exports = module.exports = {}

exports.Now = function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var HH = today.getHours();
  var MM = today.getMinutes();
  var SS = today.getSeconds(); 

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 

  if (HH < 10) {
    HH = '0' + HH;
  } 

  if (MM < 10) {
    MM = '0' + MM;
  } 

  if (SS < 10) {
    SS = '0' + SS;
  } 

  var now = dd + '/' + mm + '/' + yyyy + " " + HH + ":" + MM + ":" + SS;

  return now
}

exports.UpdateSetBuilder = function(model){
  var result = "";
  var len = Object.keys(model).length;
  var comma = len > 1 ? "," : "";
  
  for (const key in model) {
    let value = model[key]; 
    result = result + " " + key + " = '" + value + "' "  + comma
    // if (person.hasOwnProperty(key)) {
    //   //no a property from prototype chain     
    // }else{
    //   //property from protytpe chain
    // }
  }

  if(len > 1){
   result = result.replace(/.$/,"")
  }

  return result;
}