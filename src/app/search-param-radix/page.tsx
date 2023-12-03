"use client";

import { useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import * as Select from "@radix-ui/react-select";
import { CITIES } from "cities";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "~/components/ui";
import "./styles.css";

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
          <Select.Trigger className="SelectTrigger" aria-label="City">
            <Select.Value placeholder="Select a city" />
            <Select.Icon className="SelectIcon" />
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="SelectContent">
              <Select.ScrollUpButton className="SelectScrollButton">
                <ChevronUpIcon />
              </Select.ScrollUpButton>

              <Select.Viewport className="SelectViewport">
                {items.map((item) => (
                  <Select.Item
                    key={item.value}
                    value={item.value}
                    className="SelectItem"
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator className="SelectItemIndicator">
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>

              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </Stack>
    </Container>
  );
}
