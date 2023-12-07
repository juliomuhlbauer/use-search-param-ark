"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { Heading } from "~/components/ui/heading";

import * as Ariakit from "@ariakit/react";
import { COUNTRIES } from "countries";
import { useEffect, useState } from "react";
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

        <Ariakit.SelectProvider
          value={selectedCountry || undefined}
          setValue={(value) => {
            const countryValue = Array.isArray(value) ? value[0] : value;
            console.log("changed to:", countryValue);

            router.push(`${pathname}?country=${countryValue}`);
          }}
        >
          <Ariakit.Select className="button" />
          <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
            {items.map((item) => (
              <Ariakit.SelectItem
                key={item.value}
                className="select-item"
                value={item.value}
              />
            ))}
          </Ariakit.SelectPopover>
        </Ariakit.SelectProvider>
      </Stack>
    </Container>
  );
}
