// Use D3 fetch to read the JSON file
function init() {
  d3.json("data/samples.json").then((importedData) => {
    // need the names for the drop down
    var names = Object.values(importedData.names);
    var metadata = Object.values(importedData.metadata);
    var samples = Object.values(importedData.samples);

    let dropdown = document.getElementById('selDataset');

    let option;
    for (let i = 0; i < names.length; i++) {
      option = document.createElement('option');
      option.text = names[i];
      dropdown.add(option);
    }
    getSampleData(names[0], metadata);
    getPlots(names[0], samples);
  })
};

function optionChanged() {
  d3.json("data/samples.json").then((importedData) => {

    var metadata = Object.values(importedData.metadata);
    var samples = Object.values(importedData.samples);

    // Select the input value from the form
    var id = d3.select("#selDataset").node().value;

    // build the metadata box
    getSampleData(id, metadata);

    // Build the bar chart with the new person
    getPlots(id,samples);
  });
};

function getSampleData(id, metadata) {

  //filter to the record of the id selected
  let record = metadata.filter(function (f) {
    return f.id == id;
  })
  
  getGauge(record[0].wfreq);
  // get the data from that record
  var id = "ID: " + record[0].id;
  var ethnicity = "Ethnicity: " + record[0].ethnicity;
  var gender = "Gender: " + record[0].gender;
  var age = "Age: " + record[0].age;
  var location = "Location: " + record[0].location;
  var bbtype = "Bbtype: " + record[0].bbtype;
  var wfreq = "Wfreq: " + record[0].wfreq;

  // build datastring to use for demo box
  var demographics = new Array(id, ethnicity, gender, age, location, bbtype, wfreq);
  
  // build the demographic info box
  var demo = d3.select("#sample-metadata");
  demo.html("");
  var demoLine = demo.selectAll("div")
    .data(demographics)
    .enter()
    .append("div").append("b")
    .text(function(d) {
      return d;
    });
  
};

function getPlots(id, samples) {
  //filter to the record of the id selected

  let record = samples.filter(function (f) {
    return f.id == id;
  });  

  
  // get the data from the record
  var otu_ids = record[0].otu_ids.slice(0,10).reverse();
  var sample_values = record[0].sample_values.slice(0,10).reverse();
  var otu_labels = record[0].otu_labels.slice(0,10).reverse();
  var all_otu_ids = record[0].otu_ids;
  var all_sample_values = record[0].sample_values;
  var all_otu_labels = record[0].otu_labels;
  
    // create full ids for the bacteria samples for the chart
  otu_full_ids = [];
  otu_ids.forEach(function(otu_id) {
    otu_full_ids.push("OTU " + otu_id)
  })

  // create bar chart trace
  var traceBar = [{
      x: sample_values,
      y: otu_full_ids,
      text: otu_labels,
      orientation: "h",
      type: 'bar'
  }];

  Plotly.newPlot('bar', traceBar);

  // create bubble chart trace
  var traceBubble = [{
    x: all_otu_ids,
    y: all_sample_values,
    text: all_otu_labels,
    mode: 'markers',
    marker: {
      color: all_otu_ids,
      size: all_sample_values
    }
  }];
  
  var layout = {
    height: 600,
    width: 800,
    xaxis: { 
      title: {
        text: 'OTU_ID'
      }
    }
  }
  
  Plotly.newPlot('bubble', traceBubble, layout);

};

function getGauge(wfreq) {
//  The Gauge chart

  var traceGauge = [
    {
      type: "indicator",
      value: wfreq,
      title: {text: "Scrubs per Week"},
      delta: { reference: 7 },
      gauge: { axis: { visible: false, range: [0, 7] } },
      mode: "gauge+number"
    },
  ];
  
  var layoutGauge = {
    width: 600,
    height: 600,
  };
  
  Plotly.newPlot('gauge', traceGauge, layoutGauge);
};
init();