import { Grid, Typography } from "@mui/material";
import {
  Create,
  FormTab,
  ImageField,
  ImageInput,
  LinearProgress,
  SelectInput,
  TabbedForm,
  TextInput,
  useCreate,
  useGetIdentity,
  useNotify,
  useRedirect
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

const status = [
  { id: "Draft", name: "Draft" },
  { id: "Publish", name: "Publish" },
];

// const lang = [
//   { id: "id", name: "Indonesia" },
//   { id: "en", name: "Inggris" },
// ];

const SopCreate = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { identity } = useGetIdentity();
  const [create] = useCreate();

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {

    Object.assign(data, { Type: "SOP" })

    create(
      "information/sop",
      {
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

          redirect("/information/sop");
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
    <Create>
      <TabbedForm
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload Gambar" />
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
        <FormTab path="file" label="File" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload File" />
          <ImageInput
            source="File"
            label="Pilih file yang sesuai"
            maxSize={20000000}
            accept="application/pdf"
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
                source="Content"
                label="Deskripsi"
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


export default SopCreate;
