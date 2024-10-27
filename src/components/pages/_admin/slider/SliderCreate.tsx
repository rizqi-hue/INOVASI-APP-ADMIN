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
  useGetIdentity,
  Labeled,
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Title) {
    errors.title = "ra.validation.required";
  }

  if (!values.Status) {
    errors.status = "ra.validation.required";
  }

  if (!values.Content) {
    errors.content = "ra.validation.required";
  }

  return errors;
};

const status = [
  { id: "Draft", name: "Draft" },
  { id: "Publish", name: "Publish" },
];

const type = [
  { id: "Beranda", name: "Beranda" },
  { id: "Selayang Pandang", name: "Selayang Pandang" },
];

const lang = [
  { id: "id", name: "Indonesia" },
  { id: "en", name: "Inggris" },
];

const SliderCreate = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Create>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="Image"
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
            <Grid item xs={12} sm={8}>
              <Labeled label="Judul Slider" fullWidth>
                <TextInput source="Title" label="Judul" isRequired fullWidth />
              </Labeled>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Labeled label="Deskripsi" fullWidth>
                <TextInput source="Content" label="Deskripsi" isRequired fullWidth />
              </Labeled>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="Status"
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
                source="Type"
                label="Type"
                choices={type}
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

export default SliderCreate;
