import { Card, CardMedia, Link, Typography } from "@mui/material";
import { useRecordContext } from "react-admin";


const BusinessProfileFile = () => {
  const record = useRecordContext<any>();
  if (!record) return null;
  return (
    <Card sx={{ display: "inline-block" }}>
      <Link href={`${import.meta.env.VITE_BASEURL}/images/inovation/${record.BusinessProfile}`} underline="always">
        <Typography>klik untuk download file {record.BusinessProfile}</Typography>
      </Link>
    </Card>
  );
};

export default BusinessProfileFile;
