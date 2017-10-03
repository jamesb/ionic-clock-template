import document from "document";
import { memory } from "system"

function consoleMem() {
  console.log(`JavaScript memory: used=${memory.js.used}, peak=${memory.js.peak}, total=${memory.js.total}`)
  console.log(`Native memory: used=${memory.native.used}, peak=${memory.native.peak}, total=${memory.native.total}`)
}

var $memoryPressure = null;

function updateMemoryMonitor() {
  switch(memory.monitor.pressure) {
    case 'normal':
      if ($memoryPressure != null) $memoryPressure.style.fill = 'green';
      break;
    case 'high':
      if ($memoryPressure != null) $memoryPressure.style.fill = 'orange';
      break;
    case 'critical':
      if ($memoryPressure != null) $memoryPressure.style.fill = 'red';
      break;
    default:
      if ($memoryPressure != null) $memoryPressure.style.fill = 'yellow';
      break;
  }
}

function memoryPressure_init() {
    $memoryPressure = document.getElementById('memoryPressure');
    if ($memoryPressure != null) $memoryPressure.r = 20;
    memory.monitor.onmemorypressurechange = () => {
    updateMemoryMonitor();
  };
}

export {consoleMem, $memoryPressure, memoryPressure_init, updateMemoryMonitor};
