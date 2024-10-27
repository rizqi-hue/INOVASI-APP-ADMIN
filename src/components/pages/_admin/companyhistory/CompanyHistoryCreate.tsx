import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  Create,
  ImageInput,
  FormTab,
  ImageField,
  LinearProgress,
  NumberInput,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetIdentity,
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

  if (!values.content) {
    errors.content = "ra.validation.required";
  }

  if (!values.year) {
    errors.content = "ra.validation.required";
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

const BlogCreate = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Create>
      <TabbedForm validate={validateForm}>
        <FormTab label="Icon" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="image"
            label="Pilih icon yang Sesuai"
            maxSize={20000000}
            placeholder={
              <p>Letakan Icon Disini, Icon harus kurang dari 20 MB (png/jpeg)</p>
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
              <TextInput source="Title" label="Judul" isRequired fullWidth />
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
            <Grid item xs={12} sm={4}>
              <NumberInput source="year" label="Tahun" isRequired fullWidth />
            </Grid>
          </Grid>
        </FormTab>
        <FormTab
          label="resources.products.tabs.description"
          path="description"
          sx={{ maxWidth: "40em" }}
        >
          <RichTextInput source="content" label="" />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default BlogCreate;
