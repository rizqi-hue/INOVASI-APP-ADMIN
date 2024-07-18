import { Grid, Typography } from "@mui/material";
import {
  Create, FormTab,
  ImageField, ImageInput, LinearProgress,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetIdentity
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.content) {
    errors.content = "ra.validation.required";
  }

  if (!values.client) {
    errors.client = "ra.validation.required";
  }

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  if (!values.type_of_work) {
    errors.type_of_work = "ra.validation.required";
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



const FeedbackCreate = (props: any) => {
  const { identity } = useGetIdentity();
  // const [province, setProvince] = useState([]);

  // useEffect(() => {
  //   api.get("indonesia/province").then(res => {
  //     setProvince(res.data.data)
  //   });
  // }, [])

  if (!identity) return <LinearProgress />;
  return (
    <Create>
      <TabbedForm validate={validateForm}>
        <FormTab label="Gambar" sx={{ maxWidth: "40em" }}>
          <ImageInput
            source="image"
            label="Pilih Gambar yang Sesuai"
            maxSize={20000000}
            placeholder={
              <p>Letakan Gambar Disini, Gambar harus kurang dari 20 MB</p>
            }
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
        <FormTab
          label="resources.products.tabs.details"
          path="details"
          sx={{ maxWidth: "40em" }}
        >
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="content" label="Client Says" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput source="client" label="Klien" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ReferenceInput label="Jenis Pekerjaan" source="type_of_work" reference="kategoribisnis/experience/select" fullWidth
                page={1}
                perPage={25}

                sort={
                  { field: "title", order: 'ASC' }
                }
              >
                <SelectInput label="Jenis Pekerjaan" optionText="title" fullWidth />
              </ReferenceInput>
            </Grid>
          </Grid>

          <SectionTitle label="Status" />
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

export default FeedbackCreate;
