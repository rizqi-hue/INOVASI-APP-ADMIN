import { Grid } from "@mui/material";
import {
  Create, FormTab, LinearProgress, SelectInput,
  TabbedForm, TextInput, useGetIdentity
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.name) {
    errors.name = "ra.validation.required";
  }

  if (!values.lang) {
    errors.lang = "ra.validation.required";
  }

  return errors;
};

const status = [
  { id: "Draft", name: "Draft" },
  { id: "Publish", name: "Publish" },
];

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const BussinesLineCreate = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Create>
      <TabbedForm validate={validateForm}>
       
        <FormTab
          label="resources.products.tabs.details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput source="name" label="Nama" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <SelectInput
                source="lang"
                label="Bahasa"
                choices={lang}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <SelectInput
                source="status"
                label="Status"
                choices={status}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid>
          </Grid>
           
        </FormTab>
        
      </TabbedForm>
    </Create>
  );
};

export default BussinesLineCreate;
