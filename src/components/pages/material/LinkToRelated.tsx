import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useTranslate, useRecordContext } from "react-admin";
import { stringify } from "query-string";

// import { Category } from "../types";

interface Category {
  id: string;
}

const LinkToRelated = () => {
  const record = useRecordContext<Category>();
  const translate = useTranslate();
  if (!record) return null;
  return (
    <Button
      size="small"
      color="primary"
      component={Link}
      to={{
        pathname: "/products",
        search: stringify({
          filter: JSON.stringify({ category_id: record.id }),
        }),
      }}
      sx={{ display: "inline-flex", alignItems: "center" }}
    >
      Bisnis Detail
    </Button>
  );
};

export default LinkToRelated;
