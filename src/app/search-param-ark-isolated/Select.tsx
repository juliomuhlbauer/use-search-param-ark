"use client";

import { Portal } from "@ark-ui/react";
import { CITIES } from "cities";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { memo } from "react";
import { Select } from "~/components/ui";

const items = CITIES.map((city) => {
  return {
    label: city.city,
    value: city.city,
  };
});

interface SelectComponentProps {
  value: string | null;
  setValue: (value: string) => void;
}

function SelectWithoutMemo({ value }: SelectComponentProps) {
  console.log("value updated:", value);

  return (
    <Select.Root
      positioning={{ sameWidth: true }}
      width="2xs"
      items={items}
      value={value ? [value] : []}
      // onValueChange={({ value }) => {
      //   console.log("changed to:", value[0]);
      //   const params = new URLSearchParams(searchParams);

      //   params.set("city", value[0]);

      //   router.push(`/search-param?${params.toString()}`);
      // }}
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
  );
}

function arePropsEqual(
  oldProps: SelectComponentProps,
  newProps: SelectComponentProps
) {
  const isEqual = oldProps.value === newProps.value;

  console.log(
    "OldValue:",
    oldProps.value,
    "NewValue:",
    newProps.value,
    isEqual
  );

  return isEqual;
}

export const SelectComponent = memo(SelectWithoutMemo, arePropsEqual);
