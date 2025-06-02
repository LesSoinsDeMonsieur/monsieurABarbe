"use client";

import { useState } from "react";
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type RemovableLabelProps = {
  label: string;
  path?: string;
  onDelete?: (id: number) => void;
  onNewDelete?: (name: string) => void;
};

export default function RemovableLabel({
  label,
  onDelete,
  onNewDelete,
  path,
}: RemovableLabelProps) {
  return (
    <Chip
      label={
        path ? (
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}${path}`}
            target="blank"
            style={{ color: "black" }}
          >
            {label}
          </a>
        ) : (
          label
        )
      }
      onDelete={onDelete ?? onNewDelete}
      deleteIcon={<CloseIcon />}
      color="default"
      variant="outlined"
      sx={{ fontSize: "14px" }}
      style={{ display: "flex", width: "auto" }}
    />
  );
}
