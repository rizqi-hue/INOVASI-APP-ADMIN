import { CheckOutlined, Close, Loop, PublishedWithChangesOutlined, WarningOutlined } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { FilterList, FilterListItem, FilterLiveSearch } from "react-admin";

const Aside = () => {
  return (
    <Card
      sx={{
        display: { xs: "none", md: "block" },
        order: -1,
        width: "15em",
        mr: 2,
        alignSelf: "flex-start",
        boxShadow: "none",
        // background: "gray"
      }}
    >
      <CardContent >
        <FilterLiveSearch source="Title" />

        <FilterList label="resources.blogs.filters.status" icon={<PublishedWithChangesOutlined style={{ color: 'GrayText' }} />}>
          <FilterListItem
            label={<><Loop style={{ width: '18px', paddingRight: '5px' }} />Dalam Proses</>}
            value={{
              Status: "Dalam Proses",
            }}
          />
          <FilterListItem
            label={<><CheckOutlined style={{ width: '18px', paddingRight: '5px' }} />Verifikasi</>}
            value={{
              Status: "Verifikasi",
            }}
          />
          <FilterListItem
            label={<><Close style={{ width: '18px', paddingRight: '5px' }} />Tidak Diakomodir</>}
            value={{
              Status: "Tidak Diakomodir",
            }}
          />
        </FilterList>

      </CardContent>
    </Card>
  );
};

export default Aside;
