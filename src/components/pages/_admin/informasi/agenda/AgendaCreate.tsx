import { Grid, Typography } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { useState } from "react";
import {
  Create,
  DateTimeInput,
  FormTab,
  ImageField,
  ImageInput,
  LinearProgress,
  SelectInput,
  TabbedForm,
  TextInput,
  useCreate,
  useGetIdentity,
  useGetList,
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

const UseGetProvince = (filterValues: any) => {

  const { data: referensi } = useGetList("admin/province", {
    pagination: { perPage: 50, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    province: referensi,
  };
};

const UseGetRegency = (filterValues: any) => {

  const { data: referensi } = useGetList("admin/regency", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    regency: referensi,
  };
};

const UseGetSubdistrict = (filterValues: any) => {

  const { data: referensi } = useGetList("admin/subdistrict", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    subdistrict: referensi,
  };
};

const UseGetVillage = (filterValues: any) => {

  const { data: referensi } = useGetList("admin/village", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    village: referensi,
  };
};

const AgendaCreate = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const { identity } = useGetIdentity();
  const [create] = useCreate();

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedSubdistric, setSelectedSubdistrict] = useState("");
  const { province } = UseGetProvince({});
  const { regency } = UseGetRegency({ ProvinceId: selectedProvince || "a" });
  const { subdistrict } = UseGetSubdistrict({ RegencyId: selectedRegency || "a" });
  const { village } = UseGetVillage({ SubdistrictId: selectedSubdistric || "a" });

  if (!identity) return <LinearProgress />;

  const handleSubmit = (data: any) => {

    Object.assign(data, { Type: "AGENDA" })

    create(
      "event/agenda",
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

          redirect("/event/agenda");
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
              <RichTextInput
                source="Content"
                label="Deskripsi"
              />
            </Grid>
          </Grid>
          <SectionTitle label="(Optional) Kegiatan diselenggarakan pada : " />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                variant="filled"
                label="Diselenggarakan pada :"
                source="StartEventDate"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                variant="filled"
                label="Sampai dengan"
                source="EndEventDate"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Location"
                label="Lokasi atau tempat kegiatan"
                fullWidth
              />
            </Grid>
          </Grid>
          <SectionTitle label="(Optional) Alamat Lengkap" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>

              <TextInput variant="filled" source="Address" label="Jalan :" isRequired fullWidth />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <SelectInput
                variant="filled"
                size="small"
                label="Provinsi"
                source="ProvinceId"
                optionText="Name"
                optionValue="id"
                choices={province || []}
                onChange={(v: any) => {
                  setSelectedProvince(v.target.value)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <SelectInput
                variant="filled"
                size="small"
                label="Kota / Kabupaten"
                source="RegencyId"
                optionText="Name"
                optionValue="id"
                choices={regency || []}
                onChange={(v: any) => {
                  setSelectedRegency(v.target.value)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <SelectInput
                variant="filled"
                size="small"
                label="Kecamatan"
                source="SubdistrictId"
                optionText="Name"
                optionValue="id"
                choices={subdistrict || []}
                onChange={(v: any) => {
                  setSelectedSubdistrict(v.target.value)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ marginTop: "-6px" }}>
              <SelectInput
                variant="filled"
                size="small"
                label="Desa"
                source="VillageId"
                optionText="Name"
                optionValue="id"
                choices={village || []}
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


export default AgendaCreate;
