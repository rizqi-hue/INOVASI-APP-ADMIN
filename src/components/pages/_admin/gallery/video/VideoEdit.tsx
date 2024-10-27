import { Grid } from "@mui/material";

import {
  Edit, FormTab,
  LinearProgress,
  ListButton,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity
} from "react-admin";

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

const VideoEdit = (props: any) => {
  const { identity } = useGetIdentity();

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab
          label="Data"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput
                variant="filled"
                source="Link"
                label="Link Youtube"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput
                variant="filled"
                source="Title"
                label="Judul"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput
                variant="filled"
                source="Content"
                label="Deskripsi"
                multiline
                rows={3}
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput
                variant="filled"
                source="Category"
                label="Categori"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput
                variant="filled"
                source="Tag"
                label="Tag"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
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
            {/* <Grid item xs={12} sm={4}>
              <SelectInput
                source="lang"
                label="Bahasa"
                choices={lang}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid> */}
          </Grid>
        </FormTab>

      </TabbedForm>
    </Edit>
  );
};

export default VideoEdit;
