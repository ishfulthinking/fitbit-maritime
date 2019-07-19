// Add zero in front of numbers < 10.
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Return the first three letters of the current day of the week.
export function seizeTheDay(today)
{
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  if (today == null)
    return "NUL";
  
  return days[today];
}

// Like above, return the first three letters of the current month.
export function seizeTheMonth(month)
{
  let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  if (month == null)
    return "NUL";
  
  return months[month];
}

// Return a color String for the appropriate battery percentage.
export function getBatteryColor(percentage)
{
  if (percentage >= 50)
    return "fb-green";
  else if (percentage >= 34)
    return "fb-mint";
  else if (percentage >= 17)
    return "fb-peach";
  else
    return "fb-red";
}

// Return distance multiplied by the right scale, based on user's units.
export function calculateDistance(distance, units)
{
  if (distance == undefined)
    return 0;
  else
    return (distance * ((units === "us") ? 0.000621371 : 0.001)).toFixed(1);
}

export function getGoalArc(goalProgress, goalEnd)
{
  if (goalProgress == undefined)
    return 0;
  else if (goalProgress >= goalEnd)
    return 360;
  else
    return 360 * (goalProgress/goalEnd);
}

// Return correct heart icon's filename based on current user hr zone.
export function getHeartZone(zone)
{
  if (zone === "fat-burn")
    return "heart/burn.png";
  else if (zone === "cardio" || zone === "peak")
    return "heart/peak.png";
  
  return "heart/resting.png";
}
