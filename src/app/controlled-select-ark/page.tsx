"use client";

import { Container, Stack } from "styled-system/jsx";

import { Portal } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { CITIES } from "cities";
import { useState } from "react";
import { Button, Heading, Select } from "~/components/ui";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

export default function SearchParamClientPage() {
  const [city, setCity] = useState<string | undefined>("Taubaté");

  console.log("value updated:", city);

  const items = CITIES.map((city) => {
    return {
      label: city.city,
      value: city.city,
    };
  });

  return (
    <Container>
      <Stack>
        <Heading>{city}</Heading>

        <Button variant="outline" onClick={() => setCity(CITIES[0].city)}>
          Change to {CITIES[0].city}
        </Button>

        <Button variant="outline" onClick={() => setCity(CITIES[1].city)}>
          Change to {CITIES[1].city}
        </Button>

        <Select.Root
          positioning={{ sameWidth: true }}
          width="2xs"
          items={items}
          value={city ? [city] : []}
          onValueChange={({ value }) => {
            console.log("changed to:", value[0]);
            setCity(value[0]);
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
