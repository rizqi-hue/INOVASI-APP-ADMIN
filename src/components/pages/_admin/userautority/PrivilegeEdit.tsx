import { Box, Typography } from "@mui/material";
import {
  Edit,
  PasswordInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate
} from "react-admin";
import { useParams } from "react-router";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.Name) {
    errors.Name = "ra.validation.required";
  }

  return errors;
};

const PrivilegeEdit = (props: any) => {
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
      "privilege",
      {
        id: parseInt(id),
        data: {
          ...data,
          IsActive: data.IsActive ? true : false
        }
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

          redirect("/privilege")

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
        <SectionTitle label="Edit data" />
        <Box height={20} />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="Name" label="Nama Akses" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="Description" label="Penjelasan (Optional)" isRequired fullWidth />
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

  return (
    <p className="text-xs text-gray-400">
      {label}
    </p>
  );
};

export default PrivilegeEdit;
