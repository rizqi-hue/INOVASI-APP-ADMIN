import { Grid, Typography } from "@mui/material";

import {
  DateInput,
  Edit, FormTab,
  ImageField, ImageInput,
  LinearProgress,
  ListButton,
  ReferenceInput,
  SelectArrayInput,
  SelectInput, TabbedForm,
  TextInput,
  Toolbar, useGetIdentity,
  useGetList,
  usePermissions
} from "react-admin";

import { useState } from "react";
import BudgetFile from "./BudgetFile";
import BusinessProfileFile from "./BusinessProfileFile";
import { getData } from "../../../../utils/storage";
import jwtDecode from "jwt-decode";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Name) {
    errors.Name = "ra.validation.required";
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

const UseGetMainAffairs = (filterValues: any) => {

  const { data: referensi } = useGetList("datathematic", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    mainaffair: referensi,
  };
};

const UseGetOtherAffairs = (filterValues: any) => {

  const { data: referensi } = useGetList("datathematic", {
    pagination: { perPage: 500, page: 1 },
    sort: { field: "Name", order: "ASC" },
    filter: { ...filterValues },
  });

  return {
    otheraffair: referensi,
  };
};

const RegulasiEdit = (props: any) => {
  const token = getData("AccessToken")

  let decoded = {
    "sub": "",
    "role": [],
    "iat": 0,
    "exp": 0,
    "type": ""
  };

  if (token) {
    decoded = jwtDecode(token);
  }

  const { permissions } = usePermissions();

  const { identity } = useGetIdentity();

  const [selectedMainAffair, setSelectedMainAffair] = useState("");

  const { mainaffair } = UseGetMainAffairs({});
  const { otheraffair } = UseGetOtherAffairs({ RefParent: selectedMainAffair || "-" });

  if (!identity) return <LinearProgress />;

  return (
    <Edit>
      <TabbedForm validate={validateForm}>
        <FormTab
          label="Inovasi"
          sx={{ maxWidth: "40em" }}
        >
          {permissions ? (
            !permissions.includes("Admin") ? (
              <>
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
                      disabled
                      defaultValue={"Draft"}
                    />
                  </Grid>
                </Grid>
                <SectionTitle label="Dibuat oleh :" />
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} sm={12}>
                    <ReferenceInput label="Dibuat oleh :" source="MadeBy" reference="users" fullWidth
                      page={1}
                      perPage={1000}
                      sort={
                        { field: "FullName", order: 'ASC' }
                      }
                    >
                      <SelectInput disabled defaultValue={parseInt(decoded.sub.toString())} label="Dibuat oleh :" optionText="FullName" fullWidth />
                    </ReferenceInput>
                  </Grid>
                </Grid>
              </>
            ) : null
          ) : null}

          {permissions ? (
            permissions.includes("Admin") ? (
              <>
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
                <SectionTitle label="Dibuat oleh :" />
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} sm={12}>
                    <ReferenceInput label="Dibuat oleh :" source="MadeBy" reference="users" fullWidth
                      page={1}
                      perPage={1000}
                      sort={
                        { field: "FullName", order: 'ASC' }
                      }
                    >
                      <SelectInput label="Dibuat oleh :" optionText="FullName" fullWidth />
                    </ReferenceInput>
                  </Grid>
                </Grid>
              </>
            ) : null
          ) : null}
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
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <ReferenceInput source="Step" reference="datastep" fullWidth
                page={1}
                perPage={25}
              >
                <SelectInput label="Tahapan Inovasi" optionText="Name" optionValue="Ref" fullWidth />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReferenceInput source="Initiator" reference="datainitiator" fullWidth
                page={1}
                perPage={25}
              >
                <SelectInput label="Inisiator Inovasi Daerah" optionText="Name" optionValue="Ref" fullWidth />
              </ReferenceInput>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                source="Digital"
                label="Jenis Inovasi"
                choices={[
                  { id: "Digital", name: "Digital" },
                  { id: "Non Digital", name: "Non Digital" },
                ]}
                optionText="name"
                optionValue="id"
                fullWidth
                isRequired
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReferenceInput source="Form" reference="dataform" fullWidth
                page={1}
                perPage={25}
              >
                <SelectInput label="Bentuk Inovasi Daerah" optionText="Name" optionValue="Ref" fullWidth />
              </ReferenceInput>
            </Grid>
          </Grid>
          <SectionTitle label="Tematik" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12} >
              <SelectInput
                label="Tematik"
                source="Thematic"
                optionText="Name"
                optionValue="Ref"
                choices={mainaffair || []}
                onChange={(v: any) => {
                  setSelectedMainAffair(v.target.value)
                }}
                fullWidth
              />
            </Grid>
            {
              otheraffair && otheraffair.length > 0 && (
                <Grid item xs={12} sm={12}>
                  <SelectInput
                    label="Detil Tematik"
                    source="ThematicDetail"
                    optionText="Name"
                    optionValue="Ref"
                    choices={otheraffair || []}
                    fullWidth
                  />
                </Grid>)
            }
          </Grid>

          <SectionTitle label="Urusan Pemerintahan" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12} >
              <ReferenceInput source="MainAffairs" reference="dataaffair" fullWidth
                page={1}
                perPage={100}
              >
                <SelectInput label="Urusan Utama" optionText="Name" optionValue="Ref" fullWidth />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={12}>
              <ReferenceInput source="OtherRelatedMatters" reference="dataaffair" fullWidth
                page={1}
                perPage={100}
              >
                <SelectArrayInput label="Urusan lain yang beririsan" optionText="Name" optionValue="Ref" fullWidth />
              </ReferenceInput>
            </Grid>
          </Grid>

          <SectionTitle label="Waktu" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={6} >
              <DateInput
                source="TrialTime"
                label="Waktu Uji Coba"
                isRequired
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput
                source="DeploymentTime"
                label="Waktu Penerapan"
                isRequired
                fullWidth
              />
            </Grid>
          </Grid>

          <SectionTitle label="Rancang Bangun" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Design"
                label="Rancang Bangun"
                isRequired
                fullWidth
                multiline
                rows={10}
              />
            </Grid>
          </Grid>
          <SectionTitle label="Tujuan Inovasi Dearah" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Objective"
                label="Tujuan"
                isRequired
                fullWidth
                multiline
                rows={10}
              />
            </Grid>
          </Grid>
          <SectionTitle label="Manfaat yang diperoleh" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Benefit"
                label="Manfaat"
                isRequired
                fullWidth
                multiline
                rows={10}
              />
            </Grid>
          </Grid>
          <SectionTitle label="Hasil Inovasi" />
          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextInput
                variant="filled"
                source="Result"
                label="Hasil"
                isRequired
                fullWidth
                multiline
                rows={10}
              />
            </Grid>
          </Grid>

          <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
              <BudgetFile />
              <SectionTitle label="Anggaran (Jika diperlukan)" />
              <ImageInput
                source="Budgetupdate"
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
            </Grid>
            <Grid item xs={12} sm={12}>
              <BusinessProfileFile />
              <SectionTitle label="Profil Bisnis (Jika ada)" />
              <ImageInput
                source="BusinessProfileupdate"
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

export default RegulasiEdit;
