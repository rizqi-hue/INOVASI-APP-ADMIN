import { Grid, Typography } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  Create,
  DateInput, FormTab,
  ImageField, ImageInput, LinearProgress,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetIdentity
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.title) {
    errors.title = "ra.validation.required";
  }

  if (!values.start_date) {
    errors.start_date = "ra.validation.required";
  }

  if (!values.end_date) {
    errors.end_date = "ra.validation.required";
  }

  if (!values.content) {
    errors.content = "ra.validation.required";
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

const LowonganCreate = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Create>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="image"
            label="Pilih Gambar yang Sesuai"
            maxSize={20000000}
            placeholder={
              <p>Letakan Gambar Disini, Gambar harus kurang dari 20 MB</p>
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
              <TextInput source="Title" label="Judul" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput
                source="start_date"
                label="Dibuka pada :"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput
                source="end_date"
                label="Berakhir pada :"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>

          <SectionTitle label="Jenis Pekerjaan" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <TextInput source="job_level" label="Job Level" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput
                source="job_function"
                label="Job Function"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput
                source="job_type"
                label="Job Type"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <RichTextInput source="content" label="" />
            </Grid>
          </Grid>


          <SectionTitle label="Status" />
          <Grid container columnSpacing={2}>
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
            <Grid item xs={12} sm={4}>
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
          </Grid>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};

export default LowonganCreate;