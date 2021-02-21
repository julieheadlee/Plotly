// Use D3 fetch to read the JSON file

d3.json("data/samples.json").then((importedData) => {
  // need the names for the drop down
  var names = Object.values(importedData.names);

  let dropdown = document.getElementById('selDataset');

  let option;
  for (let i = 0; i < names.length; i++) {
    option = document.createElement('option');
    option.text = names[i];
    dropdown.add(option);
  }    

});

function optionChanged() {
  d3.json("data/samples.json").then((importedData) => {
    // need the names for the drop down
    var names = Object.values(importedData.names);
    var metadata = Object.values(importedData.metadata);
    var samples = Object.values(importedData.samples);

    // Select the input value from the form
    var id = d3.select("#selDataset").node().value;

    // build the metadata box
    getSampleData(id, names, metadata);
  });

  // Build the plot with the new stock
  // buildPlot(stock);
};

function getSampleData(id, names, metadata) {

  console.log(names);
  console.log(metadata);
  //filter to the record of the id selected
  let record = metadata.filter(function (f) {
    return f.id == id;
  })
  console.log(record);
  
  // get the data from that record
  var id = "ID: " + record[0].id;
  var ethnicity = "Ethnicity: " + record[0].ethnicity;
  var gender = "Gender: " + record[0].gender;
  var age = "Age: " + record[0].age;
  var location = "Location: " + record[0].location;
  var bbtype = "Bbtype: " + record[0].bbtype;
  var wfreq = "Wfreq: " + record[0].wfreq;

  console.log("ID: " & id);
  // build datastring to use for demo box
  var demographics = new Array(id, ethnicity, gender, age, location, bbtype, wfreq);
  
  console.log(demographics);
  // build the demographic info box
  var demo = d3.select("#sample-metadata");
  var demoLine = demo.selectAll("div")
    .data(demographics)
    .enter()
    .append("div").append("b")
    .text(function(d) {
      return d;
    });

};

