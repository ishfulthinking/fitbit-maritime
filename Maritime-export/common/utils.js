// Add zero in front of numbers < 10.
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Return the first three letters of the current day of the week.
export function seizeTheDay(dateIn)
{ 
  switch(dateIn.getDay()) {
    case(0):
      return "SUN";
      break;
    case(1):
      return "MON";
      break;
    case(2):
      return "TUE";
      break;
    case(3):
      return "WED";
      break;
    case(4):
      return "THU";
      break;
    case(5):
      return "FRI";
      break;
    case(6):
      return "SAT";
      break;
    default:
      return "NUL";
  }
}
// Like above, return the first three letters of the current month.
export function seizeTheMonth(dateIn)
{ 
  switch(dateIn.getMonth()) {
    case(0):
      return "JAN";
      break;
    case(1):
      return "FEB";
      break;
    case(2):
      return "MAR";
      break;
    case(3):
      return "APR";
      break;
    case(4):
      return "MAY";
      break;
    case(5):
      return "JUN";
      break;
    case(6):
      return "JUL";
      break;
    case(7):
      return "AUG";
      break;
    case(8):
      return "SEP";
      break;
    case(9):
      return "OCT";
      break;
    case(10):
      return "NOV";
      break;
    case(11):
      return "DEC";
      break;
    default:
      return "NUL";
  }
}

// Return a color String for the appropriate battery percentage.
export function getBatteryColor(percentage)
{
  if (percentage >= 50)
    return "fb-green";
  else if (percentage >= 33)
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
    return (distance * ((units === "us") ? 0.000621371 : 0.001)).toFixed(2);
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
    return "img_hrplus32.png";
  else if (zone === "cardio" || zone === "peak")
    return "img_hrmax32.png";
  else
    return "img_hr32.png";
}
