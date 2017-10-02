let document = require("document");
import { HeartRateSensor } from "heart-rate";

export function hr_init(update_func) {
  console.log("HR sensor starting...");

  // Create a new instance of the HeartRateSensor object
  let sens_hr = new HeartRateSensor();

  // Begin monitoring the sensor
  sens_hr.start();

  // And update the display every .5s
  setInterval(update_func, 500);
  return sens_hr;
}

export function hr_destroy(sens_hr) {
  sens_hr.stop();
  console.log("HR sensor stopped.");
}
