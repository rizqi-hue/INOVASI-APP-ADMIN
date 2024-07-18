import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import {
  Create, FormTab,
  ImageField, ImageInput, LinearProgress,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetIdentity,
  useGetList
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.project_name) {
    errors.project_name = "ra.validation.required";
  }

  if (!values.client) {
    errors.client = "ra.validation.required";
  }

  if (!values.status) {
    errors.status = "ra.validation.required";
  }

  // if (!values.bisnis_category) {
  //   errors.bisnis_category = "ra.validation.required";
  // }

  if (!values.lang) {
    errors.lang = "ra.validation.required";
  }

  if (!values.provinsi) {
    errors.provinsi = "ra.validation.required";
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

// const UseGetBussines = (filterValues: any) => {
//   const { data: referensi } = useGetList("bussines", {
//     pagination: { perPage: 200, page: 1 },
//     sort: { field: "createdAt", order: "DESC" },
//     filter: { ...filterValues },
//   });

//   return {
//     bussines: referensi,
//   };
// };

// const UseGetBussinesCategory = (filterValues: any) => {
//   const { data: referensi } = useGetList("bussinescategory", {
//     pagination: { perPage: 200, page: 1 },
//     sort: { field: "createdAt", order: "DESC" },
//     filter: { ...filterValues },
//   });

//   return {
//     bussinescategory: referensi,
//   };
// };

const ExperienceCreate = (props: any) => {
  const { identity } = useGetIdentity();
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedBussines, setSelectedBussines] = useState("");
  // const { bussines } = UseGetBussines({ lang: selectedLang || "a" });
  // const { bussinescategory } = UseGetBussinesCategory({ lang: selectedLang || "a", bisnis: selectedBussines || "a" });

  const onChangeLang = async (v: any) => {
    setSelectedLang(v.target.value);
  };

  const onChangeBussines = async (v: any) => {
    setSelectedBussines(v.target.value);
  };

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
                onChange={(v) => onChangeLang(v)}
              />
            </Grid>
          </Grid>

          <SectionTitle label="Detail Client" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <TextInput source="project_name" label="Nama Project" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput source="client" label="Klien" isRequired fullWidth />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <SelectInput
                source="bisnis"
                label="Jenis Bisnis"
                choices={bussines || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
                optionText="title"
                optionValue="id"
                fullWidth
                isRequired
                onChange={(v) => onChangeBussines(v)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="bisnis_category"
                label="Jenis Bisnis Kategori"
                choices={bussinescategory || [{ id: "", title: "Pilih bahasa terlebih dahulu" }]}
                optionText="title"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid> */}
          </Grid>

          <SectionTitle label="Wilayah" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={4}>
              <ReferenceInput label="Provinsi" source="provinsi" reference="indonesia/province" fullWidth
                page={1}
                perPage={25}

                sort={
                  { field: "name", order: 'ASC' }
                }
              >
                <SelectInput label="Provinsi" optionText="name" fullWidth />
              </ReferenceInput>
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

export default ExperienceCreate;
