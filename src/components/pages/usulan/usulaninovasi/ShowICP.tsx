import { Card, Link, Typography } from '@mui/material';
import { useRecordContext } from 'react-admin';

function ShowICP() {
  const record = useRecordContext<any>();
  if (!record) return null;

  return (
    <Card sx={{ display: "inline-block" }}>
      <Link href={`${import.meta.env.VITE_BASEURL}/images/usulan/${record.Icp}`} underline="always">
        <Typography>klik untuk download file {record.Icp}</Typography>
      </Link>
      {/* <iframe src={`${import.meta.env.VITE_BASEURL}/images/information/${record.File}`} width="100%" height="500px" /> */}
    </Card>

  );
}

export default ShowICP