import {
  DateInput,
  Edit,
  FormTab,
  ImageField,
  ImageInput,
  Labeled,
  LinearProgress,
  ListButton,
  SelectInput,
  SimpleForm,
  TabbedForm,
  TextInput,
  Toolbar,
  useGetIdentity,
  useNotify,
  useRedirect,
  useUpdate
} from "react-admin";

import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import Poster from "./Poster";

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

const ProjectEdit = (props: any) => {
  const [update] = useUpdate();
  const redirect = useRedirect();
  const notify = useNotify();

  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {

    update(
      "photocategory",
      {
        id: data.id,
        data: data
      },
      {
        onSuccess: () => {
          notify("Success", {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            type: "info",
          });
          redirect("/photocategory");
        },
        onError: (error: any) => {
          notify(error.message, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            type: "error",
          });
        },
      }
    );

  };
  return (
    <Edit {...props}>
      <SimpleForm sx={{ maxWidth: "40em" }} onSubmit={handleSubmit} validate={validateForm}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={8}>
            <Labeled label="Judul / Nama Kategori" fullWidth>
              <TextInput source="Title" label="Judul" isRequired fullWidth />
            </Labeled>
          </Grid>
        </Grid>
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
      </SimpleForm>
    </Edit>
  );
};


export default ProjectEdit;
