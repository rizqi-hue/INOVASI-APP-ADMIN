import React from "react";
import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  Create,
  ImageInput,
  FormTab,
  ImageField,
  LinearProgress,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Name) {
    errors.Name = "ra.validation.required";
  }

  if (!values.Status) {
    errors.Status = "ra.validation.required";
  }

  if (!values.Message) {
    errors.Message = "ra.validation.required";
  }

  if (!values.PhoneNumber) {
    errors.PhoneNumber = "ra.validation.required";
  }

  return errors;
};

const status = [
  { id: "Success", name: "Success" },
  { id: "Error", name: "Error" },
];

const MailCreate = (props: any) => {
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
            <Grid item xs={12} sm={8}>
              <p>Dikirim oleh</p> :
              <TextInput source="Name" label="Nama" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput source="PhoneNumber" label="No HP" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
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

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <RichTextInput source="Message" label="" />
            </Grid>
          </Grid>

        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default MailCreate;
