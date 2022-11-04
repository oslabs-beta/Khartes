/*
See if the used memory is approaching the limit. 

return boolean

*/
// compare the two things that JP is writing, 
// we divide and check raatio, if it's above certain amount, 
// generate a differnt boolean

const checkForOomkill = (memUsage: number, memLimit: number) => {
    const ratio = memUsage/memLimit;
    // 80% is hardcoded for now, possible to let user configure later
    if (ratio >= 0.8) {
        return true;
    }
    return false;
}

export default checkForOomkill;