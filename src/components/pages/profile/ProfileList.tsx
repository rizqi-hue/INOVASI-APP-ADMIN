import { useMediaQuery, Theme, Box, Typography, Button, Grid } from "@mui/material";
import {
  useGetIdentity,
  Form,
  useGetOne,
  TextInput,
  PasswordInput,
  Loading,
  SimpleForm,
  Create,
  useNotify,
  useUpdate,
} from "react-admin";
// import api from "../../../services/axios";
import SendIcon from "@mui/icons-material/Send";

interface FormValues {
  id?: string;
  FullName?: string;
  Email?: string;
  NewPassword?: string;
  PhoneNumber?: string;
}

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;

  if (!values.PhoneNumber) {
    errors.PhoneNumber = "ra.validation.required";
  }

  if (!values.FullName) {
    errors.FullName = "ra.validation.required";
  }

  if (values.NewPassword && values.NewPassword !== values.NewConfirmPassword) {
    errors.NewConfirmPassword = "resources.customers.errors.password_mismatch";
  }

  return errors;
};

const ProfileList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  const notify = useNotify();
  const [update] = useUpdate();
  const { identity } = useGetIdentity();

  const { data, isLoading, error } = useGetOne("users", {
    id: identity?.id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>ERROR</p>;
  }

  // const [update, { isLoading, error }] = useUpdate();
  const handleSubmit = (form: FormValues) => {

    update(
      "users",
      {
        id: identity?.id.toString(),
        data: {
          id: identity?.id.toString(),
          FullName: form.FullName,
          Email: form.Email,
          PhoneNumber: form.PhoneNumber,
          NewPassword: form.NewPassword
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

    // api.put(`/users/${identity?.id.toString()}`, { ...da, id: identity?.id.toString() }).then((res) => {
    //   notify(`Profile berhasil dirubah`, { type: "success", undoable: true });
    // });
  };

  return (
    <Box sx={{ width: "40em" }}>
      <Create>
        <Form
          defaultValues={data}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          <Box sx={{ backgroundColor: "#fff", marginTop: "10px", padding: "10px" }}>
            <SectionTitle label="Data Diri" />
            <Box height={10} />
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  source="Email"
                  label="Email"
                  isRequired
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  source="PhoneNumber"
                  label="No Hp"
                  isRequired
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  source="FullName"
                  label="Nama Lengkap"
                  isRequired
                  fullWidth
                />
              </Grid>
            </Grid>
            <SectionTitle label="Password" />
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
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Simpan
            </Button>
          </Box>
        </Form>
      </Create>
    </Box>
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

export default ProfileList;
