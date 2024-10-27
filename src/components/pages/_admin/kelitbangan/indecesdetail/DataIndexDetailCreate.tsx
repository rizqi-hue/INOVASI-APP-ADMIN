import { Grid, Typography } from "@mui/material";
import {
  Create,
  FormTab,
  ImageField,
  ImageInput,
  LinearProgress,
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

  if (!values.label) {
    errors.label = "ra.validation.required";
  }

  if (!values.Status) {
    errors.Status = "ra.validation.required";
  }

  if (!values.data) {
    errors.data = "ra.validation.required";
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

const DataIndexDetailCreate = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { identity } = useGetIdentity();
  const [create] = useCreate();

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {

    create(
      "indecesdetail",
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

          redirect("/indecesdetail");
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
        <FormTab
          label="resources.products.tabs.details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <ReferenceInput source="DataIndexId" reference="admin/indeces">
                <SelectInput variant="filled" fullWidth optionText={"Title"} optionValue="id" />
              </ReferenceInput>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="label"
                label="Label (Tahun atau indikator lainnya)"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="data"
                label="Data"
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


export default DataIndexDetailCreate;
