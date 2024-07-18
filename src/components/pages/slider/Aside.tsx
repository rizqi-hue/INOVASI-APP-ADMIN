import { CheckOutlined, PriorityHighOutlined, PublishedWithChangesOutlined } from "@mui/icons-material";
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
            label={<><CheckOutlined style={{ width: '18px', paddingRight: '5px' }} />Publish</>}
            value={{
              status: "Publish",
            }}
          />
          <FilterListItem
            label={<><PriorityHighOutlined style={{ width: '18px', paddingRight: '5px' }} />Draft</>}
            value={{
              status: "Draft",
            }}
          />
        </FilterList>

        <FilterList label="Type" icon={<PublishedWithChangesOutlined style={{ color: 'GrayText' }} />}>
          <FilterListItem
            label={<><CheckOutlined style={{ width: '18px', paddingRight: '5px' }} />Beranda</>}
            value={{
              Type: "Beranda",
            }}
          />
          <FilterListItem
            label={<><PriorityHighOutlined style={{ width: '18px', paddingRight: '5px' }} />Selayang Pandang</>}
            value={{
              Type: "Selayang Pandang",
            }}
          />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
