import { Card, CardMedia, Link, Typography } from "@mui/material";
import { useRecordContext } from "react-admin";


const BudgetFile = () => {
  const record = useRecordContext<any>();
  if (!record) return null;
  return (
    <Card sx={{ display: "inline-block" }}>
      <Link href={`${import.meta.env.VITE_BASEURL}/images/inovation/${record.Budget}`} underline="always">
        <Typography>klik untuk download file {record.Budget}</Typography>
      </Link>
    </Card>
  );
};

export default BudgetFile;
