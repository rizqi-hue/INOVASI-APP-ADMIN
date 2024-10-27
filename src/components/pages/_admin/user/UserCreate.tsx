import { Box, Typography } from "@mui/material";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  ReferenceInput,
  useCreate,
  useRedirect,
  useNotify,
} from "react-admin";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.FullName) {
    errors.FullName = "ra.validation.required";
  }

  if (!values.Password) {
    errors.Password = "ra.validation.required";
  }

  if (!values.ConfirmPassword) {
    errors.ConfirmPassword = "ra.validation.required";
  }

  if (values.Password && values.Password !== values.ConfirmPassword) {
    errors.ConfirmPassword = "resources.customers.errors.password_mismatch";
  }
  return errors;
};



const UserCreate = (props: any) => {

  const [create, { isLoading, error }] = useCreate();
  const redirect = useRedirect();
  const notify = useNotify();

  const handleSumbit = (data: any) => {

    create(
      "users",
      {
        data: {
          Email: data.Email,
          PhoneNumber: data.PhoneNumber,
          NomorIdentitasPegawai: data.NomorIdentitasPegawai,
          FullName: data.FullName,
          Password: data.Password,
          ConfirmPassword: data.ConfirmPassword,
          PrivilegeId: data.PrivilegeId,
        },
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

          redirect("/users")

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
    <Create {...props}>
      <SimpleForm
        defaultValues={{}}
        sx={{ maxWidth: 500 }}
        validate={validateForm}
        onSubmit={handleSumbit}
      >
        <SectionTitle label="Data Diri" />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="FullName" label="Nama Lengkap" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="NomorIdentitasPegawai" label="NIP" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="Email" label="Email" fullWidth />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput
              source="PhoneNumber"
              label="No Hp"
              fullWidth
            />
          </Box>
        </Box>
        <SectionTitle label="Akses" />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <ReferenceInput label="Pilih Hak Akses" source="PrivilegeId" reference="admin/privilege" fullWidth
            page={1}
            perPage={25}
            sort={
              { field: "Name", order: 'ASC' }
            }
          >
            <SelectInput label="Pilih Hak Akses" optionText="Name" fullWidth />
          </ReferenceInput>
        </Box>
        <SectionTitle label="Password" />
        <Box display={{ xs: "block", sm: "flex" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="Password" fullWidth isRequired />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="ConfirmPassword" fullWidth isRequired />
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};


export default UserCreate;
