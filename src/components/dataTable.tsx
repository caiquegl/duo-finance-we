"use client"; // If used in Pages Router, is no need to add this line
import * as React from "react";
import { Table, TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export function DataTable({ ...rest }: TableProps<any>) {
  return (
    <Table
      pagination={{
        size: "small",
        showSizeChanger: true,
        showTotal: (a, b) => `Exibindo ${b[1]} de ${a} de registros`,
      }}
      {...rest}
      style={{
        backgroundColor: "#252E30",
        // borderRadius: "5px",
        // padding: "15px",
        // height: "100%",
      }}
      rowClassName="table-row"
    />
  );
}
