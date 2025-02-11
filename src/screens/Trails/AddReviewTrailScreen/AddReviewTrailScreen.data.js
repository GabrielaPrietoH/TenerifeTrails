import * as Yup from "yup";

export function initialValues() {
    return {
        title: "",
        comment: "",
        rating: 3,
    }
};

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required("El titulo es obbligatorio"),
        comment: Yup.string().required("El comentario es obbligatorio"),
        rating: Yup.number().required("La calificación e obligatoria"),
    });
}