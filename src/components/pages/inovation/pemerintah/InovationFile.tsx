import { Edit, UploadFile } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Grid, IconButton, Link, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Create, Datagrid, DateField, DateInput, ImageField, ImageInput, ListBase, SaveButton, SelectInput, SimpleForm, TextField, TextInput, Toolbar, useCreate, useGetList, useNotify, useRecordContext, useRedirect, useRefresh, useUpdate } from 'react-admin';
import Backdrop from '@mui/material/Backdrop';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;


  return errors;
};

const ToolbarActions = () => (
  <Toolbar>
    <SaveButton label='Simpan' />
  </Toolbar>
);

export const InovationFile = (props: { label: string }) => {
  const redirect = useRedirect();
  const refresh = useRefresh();
  const record = useRecordContext();

  // redirect('/inovation/pemerintah/' + record.id);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [create, isLoading] = useCreate();
  const notify = useNotify();

  const handleSubmit = (data: any) => {

    Object.assign(data, { Inovation: record.Inovation, IndicatorParameter: record.id })

    create(
      "inovationfile",
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

          refresh()
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
    <>
      <span style={{ textAlign: "center", marginBottom: "10pt" }}>
        {record.DataIndicator.SupportingData} <br />
      </span>

      <Button onClick={handleOpen} startIcon={<UploadFile></UploadFile>} label='Upload' />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <SectionTitle label='Data Pendukung :' />
          <DialogContentText id="alert-dialog-description">
            {record.DataIndicator.SupportingData}
          </DialogContentText>
          <Box height={20} />
          <SectionTitle label='Jenis File :' />
          <DialogContentText id="alert-dialog-description">
            {record.DataIndicator.SupportingDataType}
          </DialogContentText>
          <Create>
            <SimpleForm
              toolbar={<ToolbarActions />}
              onSubmit={handleSubmit}
              validate={validateForm}
            >
              <Grid container columnSpacing={2}>
                {
                  record.DataIndicator.SupportingDataType == "application/pdf" && (
                    <>
                      <Grid item xs={12} sm={12} >
                        <TextInput
                          variant="filled"
                          source="LetterNumber"
                          label="No Surat"
                          isRequired
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} >
                        <DateInput
                          variant="filled"
                          source="LetterDate"
                          label="Tanggal Surat / Dokumen"
                          isRequired
                          fullWidth
                        />
                      </Grid>
                    </>
                  )
                }

                <Grid item xs={12} sm={12} >
                  <TextInput
                    variant="filled"
                    source="About"
                    label="Tentang"
                    isRequired
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <SectionTitle label="Pilih Dokumen" />
                  {record.DataIndicator.SupportingDataType}
                  <ImageInput
                    source="Image"
                    label="Pilih file yang sesuai"
                    maxSize={100000000}
                    // accept=""
                    accept={record.DataIndicator.SupportingDataType}
                    placeholder={
                      <p>Letakan file disini, file harus kurang dari 100 MB</p>
                    }
                  >
                    <ImageField
                      source="src"
                      title="title"
                    />
                  </ImageInput>
                </Grid>
              </Grid>
            </SimpleForm>
          </Create>

          <ListBase resource="inovationfile" perPage={24} filter={{ Type: "PEMERINTAH DAERAH", Inovation: record.Inovation, IndicatorParameter: record.id }} sort={{ field: "createdAt", order: "DESC" }}>
            <div className="mx-3 md:mx-0">
              <Box >
                {/* <GridList /> */}
                <Datagrid optimized >
                  <TextField source="LetterNumber" label="No Surat" />
                  <DateField source="LetterDate" label="Tanggal Surat / Dokumen" />
                  <TextField source="About" label="Tentang" />
                  <DownloadFile label='File' />
                </Datagrid>
              </Box>
            </div>
          </ListBase>
        </DialogContent>
      </Dialog>
    </>
  )
}


export const DownloadFile = (props: { label: string }) => {
  const record = useRecordContext();
  return (
    <Link href={`${import.meta.env.VITE_BASEURL}/images/inovationfile/${record.File}`} underline="always">
      <Typography>Unduh File </Typography>
    </Link>
  )
}

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};


InovationFile.propTypes = {
  resource: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  onAddToPlaylist: PropTypes.func,
  showLove: PropTypes.bool,
}

InovationFile.defaultProps = {
  onAddToPlaylist: () => { },
  record: {},
  resource: 'song',
  showLove: true,
  addLabel: true,
}
