import { Grid, Typography } from "@mui/material";

import {
  Edit, FormTab,
  ImageField, ImageInput,
  LinearProgress,
  ListButton,
  NumberInput,
  ReferenceInput,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity
} from "react-admin";

import Poster from "./Poster";
import ShowPdf from "./ShowPdf";

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

const type = [
  { id: "Home Slider", name: "Home Slider" },
  { id: "About Slider", name: "About Slider" },
];

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

const RegulasiEdit = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab label="File" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload file" />
          <div className="mb-1">
            <ShowPdf />
          </div>
          <ImageInput
            source="Imageupdate"
            label="Pilih file yang Sesuai"
            maxSize={20000000}
            placeholder={
              <p>Letakan file disini, file harus kurang dari 20 MB</p>
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
            <Grid item xs={12} sm={12} >
              <ReferenceInput source="ResearchScope" reference="admin/researchscope" fullWidth
                page={1}
                perPage={100}
              >
                <SelectInput variant="filled" label="Ruang Lingkup" optionText="Name" optionValue="id" fullWidth />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Title"
                label="Judul"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                variant="filled"
                source="Year"
                label="Tahun"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Executor"
                label="Pelaksana"
                isRequired
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Abstract"
                label="Abstrak"
                isRequired
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="FollowUp"
                label="Tindak Lanjut"
                isRequired
                fullWidth
                multiline
                rows={3}
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

export default RegulasiEdit;
