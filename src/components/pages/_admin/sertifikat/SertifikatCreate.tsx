import { Grid } from "@mui/material";
import {
  Create,
  ImageInput,
  FormTab,
  ImageField,
  LinearProgress,
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

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.lang) {
    errors.lang = "ra.validation.required";
  }

  if (!values.type) {
    errors.type = "ra.validation.required";
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

const type = [
  { id: "Sertifikasi Complication", name: "Sertifikasi Complication" },
  { id: "Sertifikasi ISO", name: "Sertifikasi ISO" },
];

const BlogCreate = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Create>
      <TabbedForm validate={validateForm}>
        <FormTab label="Sertifikat" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="image"
            label="Pilih sertifikat yang Sesuai"

            maxSize={20000000}
            // multiple={true}
            placeholder={
              <p>Letakan sertifikat disini, gambar harus kurang dari 20 MB</p>
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
              <TextInput source="Title" label="Nama Sertifikat" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="type"
                label="Jenis Sertifikat"
                choices={type}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
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

export default BlogCreate;
