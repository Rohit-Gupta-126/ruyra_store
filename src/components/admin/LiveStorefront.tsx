"use client";

import React from "react";
import { Editor, Frame } from "@craftjs/core";
import { resolver } from "./UserComponents";

interface LiveStorefrontProps {
  data: string;
}

export default function LiveStorefront({ data }: LiveStorefrontProps) {
  return (
    <Editor resolver={resolver} enabled={false}>
      <Frame data={data} />
    </Editor>
  );
}
