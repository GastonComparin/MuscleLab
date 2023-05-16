export const validate = (field, value, ) => {
    let errors = {};
  
    switch (field) {
      case "name":
        if (!value) {
          errors.name = "El nombre es obligatorio.";
        } else if (/[^a-zA-Z ]/.test(value)) {
          errors.name = "El nombre solo puede contener letras.";
        } else if (value.length < 3) {
          errors.name = "El nombre debe tener al menos 3 caracteres.";
        }
        break;
  
      case "effort":
        if (!value) {
          errors.effort = "La intensidad es obligatoria";
        } else if (!/^[1-5]$/.test(value)) {
          errors.effort = "La intensidad debe ser un numero entero entre 1 y 5";
        }
        break;
  
      case "description":
        if (!value) {
          errors.description = "La descripción es obligatoria";
        } else if (!/^.{0,200}$/.test(value)) {
          errors.description =
            "La descripción no debe ser mayor a 200 caracteres";
        }
        break;
  
      case "shortDescription":
        if (!value) {
          errors.shortDescription = "La descripción es obligatoria";
        } else if (!/^.{0,50}$/.test(value)) {
          errors.shortDescription =
            "La descripción no debe ser mayor a 50 caracteres";
        }
        break;
  
      case "goals":
        if (!value) {
          errors.goals = "Los objetivos son obligatorios";
        }
        break;
  
      default:
        // Si el campo no coincide con ningún caso, agregamos una propiedad vacía al objeto de errores
        errors[field] = "";
    }
    
    return errors;
  };
  