"use client";

import { useSearchParams } from "next/navigation";
import { SelectComponent } from "./Select";

export function SelectSearchParam() {
  const searchParams = useSearchParams();

  const selectedCity = searchParams.get("city");

  console.log("search param value:", selectedCity);

  return <SelectComponent value={selectedCity} setValue={(value) => {}} />;
}
