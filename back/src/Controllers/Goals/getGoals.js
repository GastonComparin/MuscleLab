const { Goals } = require('../../db')

const getGoals = async () => {
    let loaded = await Goals.findAll();
    
    if (loaded.length===0) {
        let goals = [
            'Adelgazar',
            'Ganar masa muscular',
            'Definicion muscular',
            'Competencia',
            'Recuperacion de lesiones',
            'Rutina saludable',
            'Mejorar la resistencia',
            'Desarrollar flexibilidad',
            'Mejorar la postura',
            'Desarrollar equilibrio cuerpo/mente',
            'Ganar velocidad y potencia',
        ];
        goals.forEach(async (t) => {
            await Goals.findOrCreate({ where: { name: t } });
        });
        let DbGoals= await Goals.findAll();
        return DbGoals;
    }else{
        let DbGoals = await Goals.findAll();
        return DbGoals;
    }
}

module.exports = getTypes;