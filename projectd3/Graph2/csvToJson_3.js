
var fs = require('fs');

fs.readFile('WDI_Data.csv', 'utf8', function(err, csv) {
  if(err) {
    return console.log(err);
  }


  var lines=csv.split("\r\n");


  var result = [];
  var resultfinal = [];

  var headers=lines[0].split(",");


  //remove double quotes
  for(var k=1; k<lines.length-1; k++){
    var obj = {};
    var currentline=lines[k].split(",");

    //remove double qoutes
    var cl = currentline[2];

    if(cl[0] === "\""){
      var run = 3;
      while(true){
        if(currentline[run][currentline[run].length-1] === "\""){
          currentline[2] = currentline[2].substr(1,currentline[2].length) + ", " + currentline[run].substr(0,currentline[run].length-1);

          break;
        }
        currentline[2] = currentline[2].substr(1,currentline[2].length) + ", " + currentline[run];
        ++run;
      }

      run = run + 1;
      var i = 3;
      while(run<currentline.length) {
        currentline[i] = currentline[run];
        ++i;
        ++run;
      }
      currentline.length = headers.length;
    }


    if(currentline[2] === "GDP (constant 2005 US$)" && currentline[1]==="IND"){
      for(i=0;i<currentline.length;++i)
        obj[headers[i]] = currentline[i];
       result.push(obj);
    }


  }

  var items = [];

  for(var i=0;i<55; ++i){
    var obj = {};
    var j = i + 1960;
    var s = "" + j;
    obj["year"] = s;
    var temp = parseFloat(result[0][s]);
    obj["gdp"] = temp;
    items.push(obj);
  }


  console.log(JSON.stringify(items,null,2));

  fs.writeFile('data3.json', JSON.stringify(items,null,2),  function(err) {
     if (err) {
         return console.error(err);
     }
     console.log("Data written successfully!");
   });

});
