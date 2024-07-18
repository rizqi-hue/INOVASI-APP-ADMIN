import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";

export default function UserTable(props: any) {
  return (
    <Datagrid
      optimized
      rowClick="edit"
      sx={{
        "& .column-groups": {
          md: { display: "none" },
          lg: { display: "table-cell" },
        },
      }}
    >
      <TextField source="name" />
      <TextField source="email" />
      <DateField source="created_at" />
      {/* <BooleanField source="commentable" /> */}
    </Datagrid>
  );
}
