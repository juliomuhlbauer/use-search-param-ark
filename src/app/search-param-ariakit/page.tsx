"use client";

import { useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { CITIES } from "cities";
import { useRouter } from "next/navigation";
import { Heading } from "~/components/ui";

import * as Ariakit from "@ariakit/react";
import "./style.css";

export default function SearchParamClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCity = searchParams.get("city");

  console.log("search param value:", selectedCity);

  const items = CITIES.map((city) => {
    return {
      label: city.city,
      value: city.city,
    };
  });

  return (
    <Container>
      <Stack>
        <h1>Search Param</h1>

        <Heading>{selectedCity}</Heading>

        <Ariakit.SelectProvider
          value={selectedCity || undefined}
          setValue={(value) => {
            const cityValue = Array.isArray(value) ? value[0] : value;
            console.log("changed to:", cityValue);
            const params = new URLSearchParams(searchParams);

            params.set("city", cityValue);

            router.push(`/search-param-ariakit?${params.toString()}`);
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
