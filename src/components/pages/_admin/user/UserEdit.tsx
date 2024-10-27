import { Box, Typography } from "@mui/material";
import {
  Edit,
  PasswordInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useTranslate,
  useUpdate
} from "react-admin";
import { useParams } from "react-router";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  // if (!values.PhoneNumber) {
  //   errors.PhoneNumber = "ra.validation.required";
  // }

  if (!values.FullName) {
    errors.FullName = "ra.validation.required";
  }

  if (values.NewPassword && values.NewPassword !== values.NewConfirmPassword) {
    errors.NewConfirmPassword = "resources.customers.errors.password_mismatch";
  }

  return errors;
};

const UserEdit = (props: any) => {
  const [update, { isLoading, error }] = useUpdate();
  const redirect = useRedirect();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();

  const handleSumbit = (data: any) => {

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
      "users",
      {
        id: parseInt(id),
        data: {
          id: parseInt(id),
          Email: data.Email,
          PhoneNumber: data.PhoneNumber,
          NomorIdentitasPegawai: data.NomorIdentitasPegawai,
          FullName: data.FullName,
          NewPassword: data.NewPassword,
          PrivilegeId: data.UserPrivilege[0].PrivilegeId,
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
    <Edit {...props}>
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
          <ReferenceInput label="Pilih Hak Akses" source="UserPrivilege[0].PrivilegeId" reference="admin/privilege" fullWidth
            page={1}
            perPage={25}
            sort={
              { field: "Name", order: 'ASC' }
            }
          >
            <SelectInput label="Pilih Hak Akses" optionText="Name" optionValue="id" fullWidth />
          </ReferenceInput>
        </Box>

        <SectionTitle label="Password (Optional)" />
        <SectionTitleDesc label="Isi password jika ingin menggati dengan password baru" />
        <Box height={10} />
        <Box display={{ xs: "block", sm: "flex" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="NewPassword" fullWidth isRequired />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <PasswordInput source="NewConfirmPassword" fullWidth isRequired />
          </Box>
        </Box>

      </SimpleForm>
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


const SectionTitleDesc = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <p className="text-xs text-gray-400">
      {label}
    </p>
  );
};

export default UserEdit;
