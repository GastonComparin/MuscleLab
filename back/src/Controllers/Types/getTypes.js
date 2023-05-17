const { ExercisesType } = require('../../db')

const getTypes = async () => {
    let loaded = await ExercisesType.findAll();
    
    if (loaded.length===0) {
        let types = [
            'Fuerza',
            'Cardio',
            'Flexibilidad',
            'Equilibrio',
            'Coordinación',
            'Velocidad',
            'Resistencia',
            'Agilidad',
            'Potencia',
            'Movilidad',
            'Estiramiento',
            'Relajación',
        ];
        types.forEach(async (t) => {
            await ExercisesType.findOrCreate({ where: { name: t } });
        });
        let Etypes= await ExercisesType.findAll();
        return Etypes;
    }else{
        let Etypes = await ExercisesType.findAll();
        return Etypes;
    }
}

module.exports = getTypes;