import * as Yup from "yup";

export function initialValues() {
    return {
        email: '',
        password: '',
        repeatPassword: '',
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("El email no es correcto")
            .required("El email es obligatorio"),
        
        password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
            .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
            .matches(/[0-9]/, "La contraseña debe contener al menos un número")
            .matches(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial (@, $, !, %, etc.)")
            .required("La contraseña es obligatoria"),

        repeatPassword: Yup.string()
            .required("Repetir la contraseña es obligatorio")
            .oneOf([Yup.ref('password')], "Las contraseñas no son iguales"),
    });
}
