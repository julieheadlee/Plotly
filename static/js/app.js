// Use D3 fetch to read the JSON file

d3.json("data/samples.json").then((importedData) => {
    // need the names for the drop down
    names = importedData.names;
    //console.log(names);
    //console.log(importedData);

    let dropdown = document.getElementById('selDataset');
    dropdown.length = 0;

    let option;
    for (let i = 0; i < names.length; i++) {
      option = document.createElement('option');
      option.text = names[i];
      dropdown.add(option);
    }    

    dropdown.selectedIndex = 0;
});
