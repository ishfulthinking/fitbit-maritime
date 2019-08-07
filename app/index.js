import clock from "clock";
import document from "document";
import { battery } from "power";
import { user } from "user-profile";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { preferences, units } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";

let background = document.getElementById("background");

let dayText = document.getElementById("dayInfoText");
let dateText = document.getElementById("dateInfoText");
let timeText = document.getElementById("timeText");
let meridText = document.getElementById("meridText");

let batteryLine = document.getElementById("battery");

let clockLineLU = document.getElementById("clockLineLU");
let clockLineLM = document.getElementById("clockLineLM");
let clockLineLD = document.getElementById("clockLineLD");
let clockLineRU = document.getElementById("clockLineRU");
let clockLineRM = document.getElementById("clockLineRM");
let clockLineRD = document.getElementById("clockLineRD");

let heartIcon = document.getElementById("heartIcon");
let hrLabel = document.getElementById("heartText");

let stepsText = document.getElementById("stepsText");
 let stepsArc = document.getElementById("stepsArc");
let distanceText = document.getElementById("distanceText");
 let distanceArc = document.getElementById("distanceArc");
let caloriesText = document.getElementById("caloriesText");
 let caloriesArc = document.getElementById("caloriesArc");
let activityText = document.getElementById("activityText");
 let activityArc = document.getElementById("activityArc");

let loaded = false;

clock.granularity = "minutes";
clock.ontick = (evt) =>
{
  let todayDate = evt.date;
  let hours = todayDate.getHours();
  let minutes = todayDate.getMinutes();
  
  updateDate(todayDate)
  updateTime(hours, minutes);
  updateData();
}

function updateDate(todayDate)
{
  dayText.text = util.seizeTheDay(todayDate.getDay());
  dateText.text = (todayDate.getDate() + " " + util.seizeTheMonth(todayDate.getMonth()));
}

function updateTime(hours, minutes)
{
  if (preferences.clockDisplay == "12h")
  {
    meridText.text = (hours < 12) ? "AM" : "PM";
    hours = hours % 12 || 12;
    // For visually long times like 12:00, the meridian text may intersect.
    // Adjust its x-value based on the hour digits.
    meridText.x = (String(hours).length == 1) ? -12 : 4;
  }
  else
  {
    meridText.text = "";
    hours = util.zeroPad(hours);
  }
  minutes = util.zeroPad(minutes);
  
  timeText.text = `${hours}:${minutes}`;
}

function updateData()
{
  updateGoals();
  updateBattery();
}

function updateGoals()
{
  stepsText.text = today.local.steps || 0;
  stepsArc.sweepAngle = util.getGoalArc(today.local.steps, goals.steps);
  
  // Get the user's distance traveled and multiply it by the right scale (miles or kilometers).
  distanceText.text = util.calculateDistance(today.local.distance, units.distance);
  distanceArc.sweepAngle = util.getGoalArc(today.local.distance, goals.distance);
  
  caloriesText.text = today.local.calories || 0;
  caloriesArc.sweepAngle = util.getGoalArc(today.local.calories, goals.calories);
  
  activityText.text = today.local.activeMinutes || 0;
  activityArc.sweepAngle = util.getGoalArc(today.local.activeMinutes, goals.activeMinutes);
}

// Heart rate monitoring/animation functions.
let hrm = new HeartRateSensor();
hrm.start();

hrm.onreading = function() {
  hrLabel.text = hrm.heartRate || "--";
  const hrZone = user.heartRateZone(hrm.heartRate);
  heartIcon.href = util.getHeartZone(hrZone);
}

function updateBattery()
{
  // The battery line's left side starts at -50, so we have to adjust the endpoint of the line's right side by -50.
  batteryLine.x2 = Math.floor(battery.chargeLevel) - 50;
  batteryLine.style.fill = util.getBatteryColor(battery.chargeLevel);
}

/* --- Color customization settings --- */
// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    drawLines(color);
  }
};

function drawLines(color)
{
  console.log("Filling lines!");
  background.style.fill = color;
  
  clockLineLU.style.fill = color;
  clockLineLM.style.fill = color;
  clockLineLD.style.fill = color;
  clockLineRU.style.fill = color;
  clockLineRM.style.fill = color;
  clockLineRD.style.fill = color;
  
  dayText.style.fill = color;
  dateText.style.fill = color;
  
  heartIcon.style.fill = color;
  hrLabel.style.fill = color;
}