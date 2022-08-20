//Use the D3 library to read in `samples.json` from the provided url and create a horizontal bar chart

function buildCharts(patientID) {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  
  
  d3.json(url).then((samplesData => {
       console.log(samplesData);
    let samples = samplesData.samples;
    let metadata = samplesData.metadata;
    let filmetadata = metadata[0];
    let filSample = samples[0];
    let sample_values = filSample.sample_values;
    let otu_ids = filSample.otu_ids;
    let otu_labels = filSample.otu_labels;


    // horizontal bar chart and dropdown menu 
      var bartracedata = [{
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h',
        marker: {
          color: 'rgb(10, 300, 400)'
        },
      }]
      var layout = {
        title: "Top 10 OTU",
      };
      Plotly.newPlot('bar', bartracedata, layout);

      //bubble chart
       var bubblechart = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: '.'
      }
    }];
    var bubblechartlayout = {
      xaxis: { title: "OTU IDs" }
    };

  Plotly.newPlot('bubble', bubblechart, bubblechartlayout);}

  ))
}












function optionChanged(patientID) {
  console.log(patientID);
  buildCharts(patientID);
  demography(patientID);
}
buildCharts(1601);

function demography(patientID) {

  var demobox = d3.select("#sample-metadata");
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  d3.json(url).then(samplesData => {
      var metadata = samplesData.metadata
      var filmetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

  })
}


function Dashboard() {
  var dropdown = d3.select("#selDataset")
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

  d3.json(url).then(samplesData => {
      var patientIDs = samplesData.names;
      patientIDs.forEach(patientID => {
          dropdown.append("option").text(patientID).property("value", patientID)
      })
      buildCharts(patientIDs[0]);
      demography(patientIDs[0]);
  });
};

Dashboard();

