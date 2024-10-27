import { Card, CardMedia } from "@mui/material";
import { useRecordContext } from "react-admin";


const Poster = () => {
  const record = useRecordContext<any>();
  if (!record) return null;
  return (
    <Card sx={{ display: "inline-block" }}>
      <CardMedia
        component="img"
        image={`${import.meta.env.VITE_BASEURL}/images/divisi/${record.image}`}
        alt=""
        sx={{ maxWidth: "10em", maxHeight: "15em" }}
      />
    </Card>
  );
};

export default Poster;
