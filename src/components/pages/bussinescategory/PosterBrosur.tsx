import { Card, CardMedia } from "@mui/material";
import { useRecordContext } from "react-admin";

const PosterBrosur = () => {
  const record = useRecordContext<any>();
  if (!record) return null;

  return (
    <Card sx={{ display: "inline-block" }}>
      <div className="border-b-2 p-2">
        Nama File :  {record.brosur}
      </div>
    </Card>
  );
};

export default PosterBrosur;
