import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
import { today } from "user-activity";
import { goals } from "user-activity";
import { units } from "user-settings";
import * as util from "../common/utils";

const dayText = document.getElementById("dayInfoText");
const dateText = document.getElementById("dateInfoText");
const timeText = document.getElementById("timeText");
const meridText = document.getElementById("meridText");

const batteryLine = document.getElementById("battery");

const heartIcon = document.getElementById("heartIcon");
const hrLabel = document.getElementById("heartText");
      hrLabel.text = "--";

const stepsText = document.getElementById("stepsText");
  const stepsArc = document.getElementById("stepsArc");
const distanceText = document.getElementById("distanceText");
  const distanceArc = document.getElementById("distanceArc");
const caloriesText = document.getElementById("caloriesText");
  const caloriesArc = document.getElementById("caloriesArc");
const activityText = document.getElementById("activityText");
  const activityArc = document.getElementById("activityArc");

clock.granularity = "minutes";

// Update clock info every minute.
clock.ontick = (evt) =>
{ 
  const todayDate = evt.date;
  dayText.text = util.seizeTheDay(todayDate);
  dateText.text = (todayDate.getDate() + ' ' + util.seizeTheMonth(todayDate));
  
  const hours = todayDate.getHours();
  const mins = util.zeroPad(todayDate.getMinutes());
  
  if (preferences.clockDisplay == "12h")
  {
    meridText.text = (hours < 12) ? "AM" : "PM";
    hours = hours % 12 || 12;
    // For visually long times like 12:00, meridText may intersect. Adjust its based on the hour digits.
    meridText.x = (String(hours).length == 1) ? -12 : 0;
  }
  else
    hours = util.zeroPad(hours);
  
  timeText.text = `${hours}:${mins}`;
  
  updateBattery();
  updateGoals();
}

// Heart rate monitoring/animation functions.
let hrm = new HeartRateSensor();
hrm.start();

hrm.onreading = function() {
  hrLabel.text = hrm.heartRate || "--";
  const hrZone = user.heartRateZone(hrm.heartRate);
  heartIcon.href = util.getHeartZone(hrZone);
  if (hrm.heartRate != null)
    setInterval(heartbeatBig(), 60000 / hrm.heartRate);
}

/* ----- Helper Function Section -----*/

// Heartbeat helper functions.
function heartbeatBig()
{
  heartIcon.x = -4;
  heartIcon.y = -4;
  heartIcon.width = 32;
  heartIcon.height = 32;
  setTimeout(heartbeatSmall, 200);
}
function heartbeatSmall()
{
  heartIcon.x = -2;
  heartIcon.y = -2;
  heartIcon.width = 28;
  heartIcon.height = 28;
}

// Update battery line and color.
function updateBattery()
{
  // The battery line's left side starts at -50, so we have to adjust the endpoint of the line's right side by -50.
  batteryLine.x2 = Math.floor(battery.chargeLevel) - 50;
  batteryLine.style.fill = util.getBatteryColor(battery.chargeLevel);
}

// Update the stat texts and progress arcs based on user activity. If undefined, set to 0.
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
