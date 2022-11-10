/*

  See if the used memory is approaching the limit using a ratio.
  return boolean.

*/

const checkForOomkill = (memUsage: number, memLimit: number):boolean => {
  const ratio = memUsage/memLimit;
  // 80% is hardcoded for now, possible to let user configure later
  if (ratio >= 0.8) {
      return true;
  }
  return false;
}

export default checkForOomkill;