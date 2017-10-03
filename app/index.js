import clock from "clock";
import document from "document";
import { display } from "display";
import { preferences } from "user-settings";

import { hr_init } from "../common/hr_sensor";
import * as memory from "../common/memory";
import * as util from "../common/utils";

var DEBUG = false;

// Keep the screen on
if (DEBUG) { display.autoOff = false;  display.on = true; }
if (DEBUG) { memory.memoryPressure_init();  memory.updateMemoryMonitor() }

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the elements we need.
let lblTime = document.getElementById("lblTime");
let lblAmPm = document.getElementById("lblAmPm");
let imgBpm = document.getElementById("imgBpm");
imgBpm.href = "../resources/heart_grayscale.png"
let lblBpm = document.getElementById("lblBpm");

// This function updates the label on the display that shows when data was last updated.
function updateBPM() {
  let heartRate = hrm.heartRate;
  if (heartRate == null) heartRate = "--";
  if (DEBUG) { console.log("Current heart rate: " + heartRate); }
  lblBpm.innerText = heartRate;
}

// Update the <text> element with the current time
function updateClock() {
  let today = new Date();
  let hours = "--";
  let mins = "--";
  let ampm = "";
  if (today != null) {
    hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
      if (hours < 12) ampm = "AM"; else ampm = "PM";
      if (hours === 0) hours = 12;
      if (hours > 12)  hours -= 12;
    } else {
      hours = util.zeroPad(hours);
    }
    mins = util.zeroPad(today.getMinutes());
  }
    
  lblTime.innerText = `${hours}:${mins}`;
  lblAmPm.innerText = ampm;
}

// Update the clock every tick event
clock.ontick = () => updateClock();

// Heart rate sensor initialization
let hrm = hr_init(updateBPM);

// Don't start with a blank screen
updateClock();
updateBPM();

