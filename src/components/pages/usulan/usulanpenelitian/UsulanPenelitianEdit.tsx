import { Box, Grid, Typography } from "@mui/material";

import {
  Edit, FormTab,
  ImageField, ImageInput,
  LinearProgress,
  ListButton,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity
} from "react-admin";

import { RichTextInput } from 'ra-input-rich-text';
import Poster from "./Poster";
import ShowICP from "./ShowICP";
import ShowTOR from "./ShowTOR";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Title) {
    errors.Title = "ra.validation.required";
  }

  if (!values.Status) {
    errors.Status = "ra.validation.required";
  }

  return errors;
};

const status = [
  { id: "Dalam Proses", name: "Dalam Proses" },
  { id: "Verifikasi", name: "Verifikasi" },
  { id: "Tidak Diakomodir", name: "Tidak Diakomodir" },
];

const PostEditActions = () => (
  <Toolbar>
    <ListButton />
  </Toolbar>
);

const UsulanPenelitianEdit = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="Tor" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <ShowTOR />
          </div>
          <SectionTitle label="Upload TOR" />
          <ImageInput
            source="Torupdate"
            label="Pilih file yang Sesuai"
            maxSize={100000000}
            placeholder={
              <p>Letakan file disini, file harus kurang dari 100 MB</p>
            }
          >
            <ImageField
              source="src"
              title="title"
            />
          </ImageInput>
        </FormTab>
        <FormTab path="icp" label="Icp" sx={{ maxWidth: "40em" }}>
          <div className="mb-1">
            <ShowICP />
          </div>
          <SectionTitle label="Upload ICP" />
          <ImageInput
            source="Icpupdate"
            label="Pilih file yang sesuai"
            maxSize={100000000}
            accept="application/pdf"
            placeholder={
              <p>Letakan file disini, file harus kurang dari 100 MB</p>
            }
          >
            <ImageField
              source="src"
              title="title"
            />
          </ImageInput>
        </FormTab>
        <FormTab
          label="resources.products.tabs.details"
          path="details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Title"
                label="Judul"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="ProblemIdentification"
                label="Identifikasi Masalah"
                isRequired
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Purpose"
                label="Tujuan"
                isRequired
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Instansi"
                label="Instansi"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput
                variant="filled"
                source="Email"
                label="Email"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                variant="filled"
                source="PhoneNumber"
                label="PhoneNumber"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                variant="filled"
                source="Status"
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
    </Edit>
  );
};

const SectionTitle = ({ label }: { label: string }) => {

  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};

export default UsulanPenelitianEdit;
