// in src/comments.js
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  EditButton,
  RaRecord,
  RecordContextProvider,
  TextField,
  useListContext,
  useTranslate,
} from "react-admin";

interface MobileGridProps {
  data?: RaRecord[];
}

const MobileGrid = (props: MobileGridProps) => {
  const { data, isLoading } = useListContext();
  const translate = useTranslate();
  if (isLoading || data.length === 0) {
    return null;
  }
  return (
    <Box margin="0.5em">
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Card sx={{ margin: "0.5rem 0" }}>
            <CardHeader
              title={
                <>
                  #
                  <TextField source="ref.content" variant="body1" />
                </>
              }
              titleTypographyProps={{ variant: "body1" }}
              action={<EditButton />}
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2" gutterBottom>
                <TextField source="content" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <TextField source="status" />
              </Typography>
            </CardContent>
          </Card>
        </RecordContextProvider>
      ))}
    </Box>
  );
};

MobileGrid.defaultProps = {
  data: {},
  ids: [],
};

export default MobileGrid;
