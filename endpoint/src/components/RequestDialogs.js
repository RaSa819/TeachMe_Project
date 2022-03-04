import * as React from "react";
import * as Yup from "yup";

import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    CssBaseline,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    TextField,
    Typography,
    makeStyles,
    withStyles
} from "@material-ui/core";
import { CheckboxWithLabel, Select } from "formik-material-ui";
import { DialogProvider, useDialog } from "react-mui-dialog";

import { Field } from "formik";

export default (openDialog) => {
   

    openDialog({
        title: "Send notifications ",
        contentText:
            "type want you need to notifice ",
        // Render formik fields in the dialog by specifying fields (below), each
        // key is used as the name of a field in the formik form. There is
        // a 1:1 mapping between the keys below and fields in the form.
        fields: {
            emailAddress: {
                // behind the scenes this packages gathers all the initialValue
                // values found in this "fields" object, constructs an
                // 'initialValues' object and passes that to the <Formik /> component
                initialValue: "",
                // for convenience we could omit 'label' and react-mui-dialog would use this
                // field's name for the label
                label: "Email Address",
                // These props are passed directly to the underlying
                // formik <Field /> component.
                fieldProps: { variant: "filled" },
            },
        },
        // optional validationSchema, defined just as you would with
        // formik, used to validate the fields.
        validationSchema: Yup.object({
            emailAddress: Yup.string()
                .required("This field is required")
                .email("Must be a valid email"),
        }),
        cancelButton: { children: "No Thanks" },
        submitButton: { children: "Subscribe" },
        // the keys of the fields object (above) are how you reference
        // values received by the form (as is typical with formik)
        onSubmit: async ({ emailAddress }) =>
            alert(`Added email [${emailAddress}] to the mailing list!`),
    });
}
