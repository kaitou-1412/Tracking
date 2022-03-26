declare const Promise: any;

let startTime: number;
let endTime: number;
let time: number = null;

let startCoord;
let endCoord;
let distance: number;

let speed: number;

const toggle = () => { document.getElementsByTagName("button")[0].textContent = (document.getElementsByTagName("button")[0].textContent === "Start") ? "End" : "Start" };

const currLocation = (divId) => {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
    function success(pos) {
      let crd = pos.coords;
      if(divId === "startLocation") {
        startCoord = crd;
      } else {
        endCoord = crd;
      }
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);      
}

const refresh = async () => {
  currLocation("startLocation");
  await new Promise(resolve => setTimeout(resolve, 1000));
  currLocation("endLocation");
}

// Convert from degrees to radians
const degreesToRadians = (degrees) => {
  var radians = (degrees * Math.PI)/180;
  return radians;
}

// Function takes two objects, that contain coordinates to a starting and destination location.
const calcDistance = (startingCoords, destinationCoords) => {
  let startingLat = degreesToRadians(startingCoords.latitude);
  let startingLong = degreesToRadians(startingCoords.longitude);
  let destinationLat = degreesToRadians(destinationCoords.latitude);
  let destinationLong = degreesToRadians(destinationCoords.longitude);

  // Radius of the Earth in kilometers
  let radius = 6371;

  // Haversine equation
  let distanceInKilometers = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
  Math.cos(startingLat) * Math.cos(destinationLat) *
  Math.cos(startingLong - destinationLong)) * radius;

  let distanceInMeters = distanceInKilometers*1000;
  return distanceInMeters;
}

const calcRealTimeDistance = async (startingCoords) => {
  let totalDist = 0;
  while(document.getElementsByTagName("button")[0].textContent !== "Start") {
    await new Promise(resolve => setTimeout(resolve, 5000));
    currLocation("endLocation");
    let destinationCoords = endCoord;
    // document.getElementById("debug").textContent = `${(new Date()).getSeconds()}, ${startCoord.latitude}, ${startCoord.longitude}, ${endCoord.latitude}, ${endCoord.longitude}`;
    totalDist += calcDistance(startingCoords, destinationCoords);
    document.getElementById("debug2").textContent = `Current Distance: ${totalDist.toFixed(2)} m`;
    startingCoords = destinationCoords;
  }
  return totalDist;
}


const timer = async () => {
  toggle();
  if(document.getElementsByTagName("button")[0].textContent === "End") {
      await refresh();
      startTime = Date.parse((new Date()).toString());
      currLocation("startLocation");
      distance = await calcRealTimeDistance(startCoord);
  } else {
      endTime = Date.parse((new Date()).toString());
      time = (endTime - startTime)/1000;
      await new Promise(resolve => setTimeout(resolve, 5000));
      document.getElementById("debug2").textContent = "";
      document.getElementById("startLocation").textContent = `Distance: ${distance.toFixed(2)} m`;
      document.getElementById("time").textContent = `Time: ${time} s`;
      speed = distance/time;
      document.getElementById("endLocation").textContent = `Speed: ${speed.toFixed(2)} m/s`;
  }
    
}
  