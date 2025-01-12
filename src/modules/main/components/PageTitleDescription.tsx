"use client";

import { usePathname } from "@/modules/translations/i18n/routing";
import React from "react";
import {
  getPageDescription,
  getPageTitle,
} from "../utils/get-title-description";

export const PageTitleDescription = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-xl">{getPageTitle(pathname)}</h2>
      <p className="text-sm text-gray-500">{getPageDescription(pathname)}</p>
    </div>
  );
};
