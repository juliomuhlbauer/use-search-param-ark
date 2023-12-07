"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { Heading } from "~/components/ui/heading";

import * as Select from "@ariakit/react/select";
import { COUNTRIES } from "countries";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import "./style.css";

export default function AriaKitExample() {
  const [itemsSize, setItemsSize] = useState(10);

  const items = COUNTRIES.slice(0, itemsSize);

  return (
    <Stack>
      <label>Items size: {itemsSize}</label>
      <input
        type="range"
        max={COUNTRIES.length}
        value={itemsSize}
        onChange={(e) => setItemsSize(Number(e.target.value))}
      />

      <AriaKitSelect items={items} />
    </Stack>
  );
}

function AriaKitSelect({
  items,
}: {
  items: {
    label: string;
    value: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedCountry = searchParams.get("country");

  console.log(selectedCountry);

  useEffect(() => {
    console.log("search param value:", selectedCountry);
  }, [selectedCountry]);

  return (
    <Container>
      <Stack>
        <h1>Search Param</h1>

        <Heading>{selectedCountry}</Heading>

        <Select.SelectProvider
          value={selectedCountry || undefined}
          setValue={(value) => {
            const countryValue = Array.isArray(value) ? value[0] : value;
            console.log("changed to:", countryValue);

            router.push(`${pathname}?country=${countryValue}`);
          }}
        >
          <Select.Select className="button" />
          <Select.SelectPopover gutter={4} sameWidth className="popover">
            {items.map((item) => (
              <Select.SelectItem
                key={item.value}
                className="select-item"
                value={item.value}
              />
            ))}
          </Select.SelectPopover>
        </Select.SelectProvider>

        <Stack>
          {items.map((item) => (
            <Button
              key={item.value}
              onClick={() => {
                router.push(`${pathname}?country=${item.value}`);
              }}
            >
              Change to {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
