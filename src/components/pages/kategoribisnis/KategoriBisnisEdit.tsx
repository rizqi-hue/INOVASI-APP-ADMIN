import { Grid } from "@mui/material";

import { Edit, FormTab, ImageField, ImageInput, LinearProgress, ListButton, SelectInput, TabbedForm, TextInput, Toolbar, useGetIdentity } from "react-admin";

// import { QRCodeSVG } from "qrcode.react";
import Poster from "./Poster";

export const validateForm = (values: Record<string, any>): Record<string, any> => {
  const errors = {} as any;

  if (!values.title) {
    errors.title = "ra.validation.required";
  }

  if (!values.status) {
    errors.status = "ra.validation.required";
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

const PostEditActions = () => (
  <Toolbar>
    <ListButton />
  </Toolbar>
);

const BlogEdit = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <Poster />
          </div>
          <ImageInput source="imageupdate" label="Pilih Gambar yang Sesuai" maxSize={20000000} placeholder={<p>Letakan Gambar Disini, Gambar harus kurang dari 20 MB</p>}>
            <ImageField source="imageupdate" title="title" />
          </ImageInput>
        </FormTab>
        <FormTab label="resources.products.tabs.details" path="details" sx={{ maxWidth: "40em" }}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="Title" label="Nama Contracting" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput source="content" label="Penjelasan Singkat" isRequired fullWidth />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <SelectInput source="status" label="Status" choices={status} optionText="name" optionValue="id" fullWidth isRequired />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput source="lang" label="Bahasa" choices={lang} optionText="name" optionValue="id" fullWidth isRequired />
            </Grid>
          </Grid>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default BlogEdit;
