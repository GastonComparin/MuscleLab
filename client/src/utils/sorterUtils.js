// Sorteadores básicos

const sortAtoZ = (array) => {
    return array.sort((a, b) => a.name.localeCompare(b.name));
}
const sortZtoA = (array) => {
    return array.sort((a, b) => b.name.localeCompare(a.name));
}
const sortHardestToEasiest = (array) => {
    return array.sort((a,b) => {
        if (parseInt(a.effort) < parseInt(b.effort)) return 1;
        if (parseInt(a.effort) > parseInt(b.effort)) return -1;
        return 0;
    })
}
const sortEasiestToHardest = (array) => {
    return array.sort((a,b) => {
        if (parseInt(a.effort) > parseInt(b.effort)) return 1;
        if (parseInt(a.effort) < parseInt(b.effort)) return -1;
        return 0;
    })
}


export { sortAtoZ, sortZtoA, sortHardestToEasiest, sortEasiestToHardest };