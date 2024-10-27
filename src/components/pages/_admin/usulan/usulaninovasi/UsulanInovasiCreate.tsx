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
  { id: "Dalam Proses", name: "Dalam Proses" },
  { id: "Verifikasi", name: "Verifikasi" },
  { id: "Tidak Diakomodir", name: "Tidak Diakomodir" },
];

// const lang = [
//   { id: "id", name: "Indonesia" },
//   { id: "en", name: "Inggris" },
// ];

const UsulanInovasiCreate = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { identity } = useGetIdentity();
  const [create] = useCreate();

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {

    create(
      "usulanpenelitian",
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

          redirect("/usulanpenelitian");
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
        <FormTab path="tor" label="Tor" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload TOR" />
          <ImageInput
            source="Tor"
            label="Pilih file yang Sesuai"
            accept="application/pdf"
            maxSize={100000000}
            placeholder={
              <p>Letakan file disini, gambar harus kurang dari 100 MB</p>
            }
          >
            <ImageField
              source="src"
              title="title"
            />
          </ImageInput>

        </FormTab>
        <FormTab path="icp" label="Icp" sx={{ maxWidth: "40em" }}>
          <SectionTitle label="Upload ICP" />
          <ImageInput
            source="Icp"
            label="Pilih file yang sesuai"
            maxSize={100000000}
            accept="application/pdf"
            placeholder={
              <p>Letakan file disini, gambar harus kurang dari 100 MB</p>
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
                source="IdentificationProblem"
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
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Name"
                label="Nama"
                isRequired
                fullWidth
              />
            </Grid>
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


export default UsulanInovasiCreate;
