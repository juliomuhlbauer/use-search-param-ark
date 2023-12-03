"use client";

import { useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { CITIES } from "cities";
import { useRouter } from "next/navigation";
import { Select } from "~/components/radix/select";
import { Heading } from "~/components/ui";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

export default function SearchParamClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCity = searchParams.get("city") || "";

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

        <Select.Root
          value={selectedCity}
          onValueChange={(value) => {
            console.log("changed to:", value);
            const params = new URLSearchParams(searchParams);

            params.set("city", value);

            router.push(`/search-param-radix?${params.toString()}`);
          }}
        >
          <Select.Trigger aria-label="City">
            <Select.Value placeholder="Select a city" />
          </Select.Trigger>
          <Select.Content maxH={300}>
            {items.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Stack>
    </Container>
  );
}
