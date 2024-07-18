import { Grid, Typography } from "@mui/material";
import {
  Create,
  FormTab,
  ImageField,
  ImageInput,
  LinearProgress,
  NumberInput,
  ReferenceInput,
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

const ResearchCreate = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { identity } = useGetIdentity();
  const [create] = useCreate();

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {

    create(
      "researchresult",
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

          redirect("/researchresult");
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
          <SectionTitle label="Upload File" />
          <ImageInput
            source="Image"
            label="Pilih file yang Sesuai"
            maxSize={20000000}
            accept={"application/pdf"}
            placeholder={
              <p>Letakan file Disini, file harus kurang dari 20 MB</p>
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
              <ReferenceInput source="ResearchScope" reference="researchscope" fullWidth
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


export default ResearchCreate;
