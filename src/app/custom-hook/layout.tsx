"use client";

import { Container, Stack } from "styled-system/jsx";

import { Portal } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { CITIES } from "cities";
import { Heading, Select } from "~/components/ui";
import { useQuery } from "~/use-query";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

export default function SearchParamClientPage() {
  const [searchParams, setSearchParams] = useQuery();
  // const router = useRouter();

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

        <Select.Root
          positioning={{ sameWidth: true }}
          width="2xs"
          items={items}
          value={selectedCity ? [selectedCity] : []}
          onValueChange={({ value }) => {
            console.log("changed to:", value[0]);
            // const params = new URLSearchParams(searchParams);

            // params.set("city", value[0]);

            // router.push(`/no-ssr?${params.toString()}`);

            setSearchParams({
              city: value[0],
            });
          }}
        >
          <Select.Label>City</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a city" />
              <ChevronsUpDownIcon />
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content overflow="auto" h="fit-content" maxH={300}>
                {items.map((item) => (
                  <Select.Item key={item.value} item={item} py={4}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Stack>
    </Container>
  );
}
