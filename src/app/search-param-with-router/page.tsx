"use client";

import { useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { Portal } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { Heading, Select } from "~/components/ui";
import { CITIES } from "cities";
import { useRouter } from "next/navigation";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

export default function SearchParamClientPage() {
  const router = useRouter();

  // const selectedCity = searchParams.get("city");

  console.log("reender");

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

        {/* <Heading>{selectedCity}</Heading> */}

        <Select.Root
          positioning={{ sameWidth: true }}
          width="2xs"
          items={items}
          // defaultValue={selectedCity ? [selectedCity] : []}
          onValueChange={({ value }) => {
            console.log("changed to:", value[0]);
            const params = new URLSearchParams();

            params.set("city", value[0]);

            router.push(`/search-param-with-router?${params.toString()}`);
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
