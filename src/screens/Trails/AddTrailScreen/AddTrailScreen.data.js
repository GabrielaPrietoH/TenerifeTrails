import * as Yup from "yup";

export function initialValues() {
    return {
        name: "",
        location: { latitude: null, longitude: null }, // Inicializa como null
        distance: "",
        difficulty: "",
        description: "",
        images: [],
    };
}

export function validationSchema() {
    return Yup.object({
        name: Yup.string().required("El nombre del sendero es obligatorio"),
        location: Yup.object()
            .shape({
                latitude: Yup.number()
                    .nullable()
                    .min(-90, "La latitud debe ser mayor o igual a -90")
                    .max(90, "La latitud debe ser menor o igual a 90"),
                longitude: Yup.number()
                    .nullable()
                    .min(-180, "La longitud debe ser mayor o igual a -180")
                    .max(180, "La longitud debe ser menor o igual a 180"),
            })
            .nullable(), // Hace que el objeto location no sea obligatorio
        distance: Yup.number()
            .required("La distancia es obligatoria")
            .positive("La distancia debe ser un número positivo"),
        difficulty: Yup.string()
            .required("La dificultad es obligatoria")
            .oneOf(
                ["verde", "amarillo", "rojo"],
                "La dificultad debe ser 'verde', 'amarillo' o 'rojo'"
            ),
        description: Yup.string().required("La descripción del sendero es obligatoria"),
        images: Yup.array()
            .min(1, "Se requiere al menos una imagen")
            .required("Las imágenes son obligatorias"),
    });
}