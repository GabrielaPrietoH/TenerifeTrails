import * as Yup from "yup";

export function initialValues() {
    return {
        email: '',
        password: '',
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("El email no es correcto")
            .required("El email es obligatorio"),
        password: Yup.string()
            .min(5, "La contraseña debe tener al menos 5 caracteres")
            .required("La contraseña es obligatoria"),
    });
}
