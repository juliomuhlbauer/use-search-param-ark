"use client";

import { useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { Portal } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { CITIES } from "cities";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Heading } from "~/components/ui/heading";
import * as Select from "~/components/ui/new-select";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

const items = CITIES.map((city) => {
  return {
    label: city.city,
    value: city.city,
  };
});

export default function SearchParamClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCity = searchParams.get("city");

  useEffect(() => {
    console.log("search param value:", selectedCity);
  }, [selectedCity]);

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

            router.push(`/search-param?city=${value[0]}`);
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
