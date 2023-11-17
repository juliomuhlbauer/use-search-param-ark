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
  const searchParam = useSearchParams();
  const router = useRouter();

  const selectedCity = searchParam.get("city");

  console.log(selectedCity);

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

        {/* {items.map((item) => (
          <Link key={item.value} href={`/search-param?framework=${item.value}`}>
            {item.label}
          </Link>
        ))} */}

        <Select.Root
          positioning={{ sameWidth: true }}
          width="2xs"
          items={items}
          onValueChange={({ value }) => {
            console.log(value);
            router.push(`/search-param?city=${value}`);
          }}
        >
          <Select.Label>City</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <ChevronsUpDownIcon />
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {items.map((item) => (
                  <Select.Item key={item.value} item={item}>
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
