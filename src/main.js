import * as Plot from "@observablehq/plot";
import figure1 from "./assets/figure1.json";
import figure2 from "./assets/figure2.json";
import figure3 from "./assets/figure3.json";


function createOriginalPlot1() {  // make the creation of a plot a function to replace it when the screen resizes
  const plot_1 = Plot.plot({
    grid: true, // shows the grid in the plot
    inset: 10, // space away from axis values
    marginLeft: 60, // added a margin as the first plot has a value 200 000 and it would have been cut off
    x: { tickFormat: "" }, // changed the year values from 2,020 to 2020
    marks: [
      Plot.axisY({ label: "Mass of air emissions per annum in thousand tonnes of carbon dioxide equivalent (CO2e)" }), // specify the Y axis label
      Plot.lineY(figure1, { x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 3 }), // First line in the plot and the specified colour
      Plot.ruleX(figure1, Plot.pointerX({ x: "Year", py: "Manufacturing", stroke: "grey", strokeWidth: 3 })), // for interactiveness add a line when the mouse hovers or clicks on a point in the plot
      Plot.dot(figure1, Plot.pointerX({ x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 4 })), // add a dot on the point on the line for each line
      Plot.tip(figure1, Plot.pointerX({ // add information box with channels of all lines and their data points
        px: "Year",
        channels: { Year: d => `${d.Year}`, Manufacturing: "Manufacturing", "Consumer Expenditure": "Consumer expenditure", "Energy Sector": "Energy Sector", Transport: "Transport" },
        dy: -17,
        frameAnchor: "top-right" // show the information at the top right of the plot
      })),
      Plot.lineY(figure1, { x: "Year", y: "Consumer expenditure", stroke: "#04d712", strokeWidth: 3 }), // create the other lines and specify the colours for each
      Plot.dot(figure1, Plot.pointerX({ x: "Year", y: "Consumer expenditure", stroke: "#04d712", strokeWidth: 4 })),

      Plot.lineY(figure1, { x: "Year", y: "Energy Sector", stroke: "#a95ec5", strokeWidth: 3 }),
      Plot.dot(figure1, Plot.pointerX({ x: "Year", y: "Energy Sector", stroke: "#a95ec5", strokeWidth: 4 })),

      Plot.lineY(figure1, { x: "Year", y: "Transport", stroke: "#a30559", strokeWidth: 3 }),
      Plot.dot(figure1, Plot.pointerX({ x: "Year", y: "Transport", stroke: "#a30559", strokeWidth: 4 })),

    ],

  });
  return plot_1;
}



function ResizePlot1() {  // create a function for a variation of the first plot to replace when the screen size decreases

  const smallerData = figure1.filter(d => d.Year % 2 === 0); // filter data to have 2-year steps to make the trend less messy on smaller screens

  const smallerPlot = Plot.plot({ // create the variation of plot 1
    grid: true,
    inset: 10,
    marginLeft: 60,
    x: { tickFormat: "" },
    marks: [
      Plot.axisY({ label: "Mass of air emissions per annum in thousand tonnes of carbon dioxide equivalent (CO2e)", fontSize: 14 }),
      Plot.axisX({ fontSize: 12, tickFormat: "" }), // specify a font size to have the labels remain readable
      Plot.lineY(smallerData, { x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 3 }),
      Plot.ruleX(smallerData, Plot.pointerX({ x: "Year", py: "Manufacturing", stroke: "grey", strokeWidth: 3 })),
      Plot.dot(smallerData, Plot.pointerX({ x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 4 })),
      Plot.tip(smallerData, Plot.pointerX({
        px: "Year",
        channels: { Year: d => `${d.Year}`, Manufacturing: "Manufacturing", "Consumer Expenditure": "Consumer expenditure", "Energy Sector": "Energy Sector", Transport: "Transport" },
        dy: -17,
        fontSize: 14, // again specify fontsize
        frameAnchor: "top-right"
      })),
      Plot.lineY(smallerData, { x: "Year", y: "Consumer expenditure", stroke: "#04d712", strokeWidth: 3 }),
      Plot.dot(smallerData, Plot.pointerX({ x: "Year", y: "Consumer expenditure", stroke: "#04d712", strokeWidth: 4 })),

      Plot.lineY(smallerData, { x: "Year", y: "Energy Sector", stroke: "#a95ec5", strokeWidth: 3 }),
      Plot.dot(smallerData, Plot.pointerX({ x: "Year", y: "Energy Sector", stroke: "#a95ec5", strokeWidth: 4 })),

      Plot.lineY(smallerData, { x: "Year", y: "Transport", stroke: "#a30559", strokeWidth: 3 }),
      Plot.dot(smallerData, Plot.pointerX({ x: "Year", y: "Transport", stroke: "#a30559", strokeWidth: 4 })),
    ],
  });
  return smallerPlot;
}
const originalPlot1 = createOriginalPlot1();
// bind the plot to the html of the application with its id

const newPlot1 = ResizePlot1(); // call the function and create the filtered plot

if (window.innerWidth < 768) { // to make sure that, if the first device this page is opened on is <768px, the smaller plot is appended and else the original plot is
  document.querySelector("#plot1").append(newPlot1); // bind the plot to the html of the application with its id
} else {
  document.querySelector("#plot1").append(originalPlot1); // bind the plot to the html of the application with its id
}

window.addEventListener('resize', () => {  // create an event listener for when the window (screen) resizes
  if (window.innerWidth < 768) { // if statement for when the screen is smaller than 768px
    const existingPlot1 = document.querySelector("#plot1"); // for the existing plot, so the original plot
    existingPlot1.innerHTML = ''; // remove it
    existingPlot1.appendChild(newPlot1); // replace it with the new plot
  } else {
    const sizedPlot1 = document.querySelector("#plot1"); // else, so if the screen size is greater
    sizedPlot1.innerHTML = ''; // Remove existing plot, in this case the new one again
    sizedPlot1.appendChild(originalPlot1); // and replace it with the original plot
  }
});


// The steps for the first plot, its replacement and the event listener have been repeated for plot 2 and plot 3

function createOriginalPlot2() {
  const plot_2 = Plot.plot({
    grid: true,
    inset: 10,
    // since the values on the y axis are not great, the margin specification is not necessary
    x: { tickFormat: "" },
    marks: [
      Plot.axisY({ label: "Thousand tonnes CO2 equivalent/£ million" }),
      Plot.lineY(figure2, { x: "Year", y: "Agriculture, forestry and fishing", stroke: "#188ff2", strokeWidth: 3 }),
      Plot.ruleX(figure2, Plot.pointerX({ x: "Year", py: "Agriculture, forestry and fishing", stroke: "grey", strokeWidth: 3 })),
      Plot.dot(figure2, Plot.pointerX({ x: "Year", y: "Agriculture, forestry and fishing", stroke: "#188ff2", strokeWidth: 4 })),
      Plot.tip(figure2, Plot.pointerX({
        px: "Year",
        channels: { Year: d => `${d.Year}`, "Agriculture, forestry, fishing": "Agriculture, forestry and fishing", "Mining and quarrying": "Mining and quarrying", "Electricity, gas, etc.": "Electricity, gas, steam and air conditioning supply", "Water supply": "Water supply; sewerage, waste management and remediation activities" },
        dy: -17,
        frameAnchor: "top-right"
      })),
      Plot.lineY(figure2, { x: "Year", y: "Mining and quarrying", stroke: "#04d712", strokeWidth: 3 }),
      Plot.dot(figure2, Plot.pointerX({ x: "Year", y: "Mining and quarrying", stroke: "#04d712", strokeWidth: 4 })),

      Plot.lineY(figure2, { x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#a95ec5", strokeWidth: 3 }),
      Plot.dot(figure2, Plot.pointerX({ x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#a95ec5", strokeWidth: 4 })),

      Plot.lineY(figure2, { x: "Year", y: "Water supply; sewerage, waste management and remediation activities", stroke: "#a30559", strokeWidth: 3 }),
      Plot.dot(figure2, Plot.pointerX({ x: "Year", y: "Water supply; sewerage, waste management and remediation activities", stroke: "#a30559", strokeWidth: 4 })),

    ],
  });
  return plot_2;
}

function ResizePlot2() {

  const smallerData2 = figure2.filter(d => d.Year % 2 === 0);

  const smallerPlot2 = Plot.plot({
    grid: true,
    inset: 10,
    x: { tickFormat: "" },
    marks: [
      Plot.axisY({ label: "Thousand tonnes CO2 equivalent/£ million", fontSize: 14 }),
      Plot.axisX({ fontSize: 12, tickFormat: "" }),
      Plot.lineY(smallerData2, { x: "Year", y: "Agriculture, forestry and fishing", stroke: "#188ff2", strokeWidth: 3 }),
      Plot.ruleX(smallerData2, Plot.pointerX({ x: "Year", py: "Agriculture, forestry and fishing", stroke: "grey", strokeWidth: 3 })),
      Plot.dot(smallerData2, Plot.pointerX({ x: "Year", y: "Agriculture, forestry and fishing", stroke: "#188ff2", strokeWidth: 4 })),
      Plot.tip(smallerData2, Plot.pointerX({
        px: "Year",
        channels: { Year: d => `${d.Year}`, "Agriculture, forestry, fishing": "Agriculture, forestry and fishing", "Mining and quarrying": "Mining and quarrying", "Electricity, gas, etc.": "Electricity, gas, steam and air conditioning supply", "Water supply": "Water supply; sewerage, waste management and remediation activities" },
        dy: -17,
        fontSize: 14,
        frameAnchor: "top-right"
      })),
      Plot.lineY(smallerData2, { x: "Year", y: "Mining and quarrying", stroke: "#04d712", strokeWidth: 3 }),
      Plot.dot(smallerData2, Plot.pointerX({ x: "Year", y: "Mining and quarrying", stroke: "#04d712", strokeWidth: 4 })),

      Plot.lineY(smallerData2, { x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#a95ec5", strokeWidth: 3 }),
      Plot.dot(smallerData2, Plot.pointerX({ x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#a95ec5", strokeWidth: 4 })),

      Plot.lineY(smallerData2, { x: "Year", y: "Water supply; sewerage, waste management and remediation activities", stroke: "#a30559", strokeWidth: 3 }),
      Plot.dot(smallerData2, Plot.pointerX({ x: "Year", y: "Water supply; sewerage, waste management and remediation activities", stroke: "#a30559", strokeWidth: 4 })),
    ],
  });
  return smallerPlot2;
}

const originalPlot2 = createOriginalPlot2();

const newPlot2 = ResizePlot2();

if (window.innerWidth < 768) {
  document.querySelector("#plot2").append(newPlot2);
} else {
  document.querySelector("#plot2").append(originalPlot2);
}

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    const existingPlot2 = document.querySelector("#plot2");
    existingPlot2.innerHTML = '';
    existingPlot2.appendChild(newPlot2);
  } else {
    const sizedPlot2 = document.querySelector("#plot2");
    sizedPlot2.innerHTML = '';
    sizedPlot2.appendChild(originalPlot2);
  }
});


// repeat again for plot 3

function createOriginalPlot3() {
  const plot_3 = Plot.plot({
    grid: true,
    inset: 10,
    x: { tickFormat: "" },
    marks: [
      Plot.axisY({ label: "Percent (%)" }),
      Plot.lineY(figure3, { x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 3 }),
      Plot.ruleX(figure3, Plot.pointerX({ x: "Year", py: "Manufacturing", stroke: "grey", strokeWidth: 3 })),
      Plot.dot(figure3, Plot.pointerX({ x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 4 })),
      Plot.tip(figure3, Plot.pointerX({
        px: "Year",
        channels: { Year: d => `${d.Year}`, Manufacturing: "Manufacturing", "Electricity, gas, etc.": "Electricity, gas, steam and air conditioning supply", "Transport and storage": "Transport and storage", "Consumer expenditure": "Consumer expenditure" },
        dy: -17,
        frameAnchor: "top-left"
      })),
      Plot.lineY(figure3, { x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#04d712", strokeWidth: 3 }),
      Plot.dot(figure3, Plot.pointerX({ x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#04d712", strokeWidth: 4 })),

      Plot.lineY(figure3, { x: "Year", y: "Transport and storage", stroke: "#a95ec5", strokeWidth: 3 }),
      Plot.dot(figure3, Plot.pointerX({ x: "Year", y: "Transport and storage", stroke: "#a95ec5", strokeWidth: 4 })),

      Plot.lineY(figure3, { x: "Year", y: "Consumer expenditure", stroke: "#a30559", strokeWidth: 3 }),
      Plot.dot(figure3, Plot.pointerX({ x: "Year", y: "Consumer expenditure", stroke: "#a30559", strokeWidth: 4 })),
    ],
  });
  return plot_3;
}

function ResizePlot3() {
  const smallerData3 = figure3.filter(d => d.Year % 2 === 0);

  const smallerPlot3 = Plot.plot({
    grid: true,
    inset: 10,
    x: { tickFormat: "" },
    marks: [
      Plot.axisY({ label: "Percent (%)", fontSize: 14 }),
      Plot.axisX({ fontSize: 12, tickFormat: "" }),
      Plot.lineY(smallerData3, { x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 3 }),
      Plot.ruleX(smallerData3, Plot.pointerX({ x: "Year", py: "Manufacturing", stroke: "grey", strokeWidth: 3 })),
      Plot.dot(smallerData3, Plot.pointerX({ x: "Year", y: "Manufacturing", stroke: "#188ff2", strokeWidth: 4 })),
      Plot.tip(smallerData3, Plot.pointerX({
        px: "Year",
        channels: { Year: d => `${d.Year}`, Manufacturing: "Manufacturing", "Electricity, gas, etc.": "Electricity, gas, steam and air conditioning supply", "Transport and storage": "Transport and storage", "Consumer expenditure": "Consumer expenditure" },
        dy: -17,
        fontSize: 14,
        frameAnchor: "top-left"
      })),
      Plot.lineY(smallerData3, { x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#04d712", strokeWidth: 3 }),
      Plot.dot(smallerData3, Plot.pointerX({ x: "Year", y: "Electricity, gas, steam and air conditioning supply", stroke: "#04d712", strokeWidth: 4 })),

      Plot.lineY(smallerData3, { x: "Year", y: "Transport and storage", stroke: "#a95ec5", strokeWidth: 3 }),
      Plot.dot(smallerData3, Plot.pointerX({ x: "Year", y: "Transport and storage", stroke: "#a95ec5", strokeWidth: 4 })),

      Plot.lineY(smallerData3, { x: "Year", y: "Consumer expenditure", stroke: "#a30559", strokeWidth: 3 }),
      Plot.dot(smallerData3, Plot.pointerX({ x: "Year", y: "Consumer expenditure", stroke: "#a30559", strokeWidth: 4 })),
    ],
  });
  return smallerPlot3;
}

const originalPlot3 = createOriginalPlot3();

const newPlot3 = ResizePlot3();

if (window.innerWidth < 768) {
  document.querySelector("#plot3").append(newPlot3);
} else {
  document.querySelector("#plot3").append(originalPlot3);
}

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    const existingPlot3 = document.querySelector("#plot3");
    existingPlot3.innerHTML = '';
    existingPlot3.appendChild(newPlot3);
  } else {
    const sizedPlot3 = document.querySelector("#plot3");
    sizedPlot3.innerHTML = '';
    sizedPlot3.appendChild(originalPlot3);
  }
});







const timed_fetch = () => { // create function to re-fetch the data from the API constantly
  const api = "https://api.carbonintensity.org.uk/generation";

  fetch(api) // make request
    .then((res) => res.json())
    .then((body) => {
      const data = body.data.generationmix.map((entry) => { // map through each element and get the index
        return { fuel: entry.fuel, perc: entry.perc };
      });

      const live_visual = Plot.plot({ // use observable to create plot
        grid: true,
        marks: [
          Plot.axisY({ label: "Percent (%)" }), // specify y label
          Plot.axisX({ label: "" }), // because of font specification, delete x label as it overlabs with the fuel names
          // create bar chart, tip is true to have the interactive information box, and for aesthetics sorted the bars in descending size order
          Plot.barY(data, { x: "fuel", y: "perc", tip: true, fill: "fuel", sort: { x: "-y" } })],
      });

      live_visual.style.fontFamily = "Arial, sans-serif"; // Set the font style
      live_visual.style.fontSize = "14px"; // and the font size

      document.querySelector("#plot4").innerHTML = '';
      document.querySelector("#plot4").append(live_visual); // append the visualisation to the html of the site
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // in case there is an error
    })
    .finally(() => {
      console.log("Refresh every 5 minutes..."); // a debugging statement to see if the re-fetch works

      setTimeout(timed_fetch, 5 * 60 * 1000); // use setTimeout to re-fetch the live data every 5 minutes
    });
};

timed_fetch(); // call the function

