import { Grid, Typography } from "@mui/material";

import {
  DateTimeInput,
  Edit, FormTab,
  ImageField, ImageInput,
  LinearProgress,
  ListButton,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity,
  useNotify,
  useRedirect,
  useUpdate
} from "react-admin";

import { RichTextInput } from "ra-input-rich-text";
import Poster from "./Poster";
import { useParams } from "react-router";

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


const NewsEdit = (props: any) => {
  const { identity } = useGetIdentity();
  const [update, { isLoading, error }] = useUpdate();
  const redirect = useRedirect();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {
    if (!id) {
      notify("Data tidak ditemukan", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        type: "error",
      });

      return
    }

    update(
      "event/news",
      {
        id: parseInt(id),
        data: {
          id: parseInt(id),
          Title: data.Title,
          Content: data.Content,
          StartEventDate: data.StartEventDate,
          Status: data.Status,
          Imageupdate: data.Imageupdate,
          Type: data.Type
        }
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

          redirect("/event/news")

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
    <Edit>
      <TabbedForm
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload Gambar" />
          <div className="mb-1">
            <Poster />
          </div>
          <ImageInput
            source="Imageupdate"
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
              <RichTextInput
                source="Content"
                label="Deskripsi"
              />
            </Grid>
          </Grid>
          <SectionTitle label="Kegiatan diselenggarakan pada : " />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                variant="filled"
                label="Diselenggarakan pada :"
                source="StartEventDate"
                fullWidth
                required
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

export default NewsEdit;
