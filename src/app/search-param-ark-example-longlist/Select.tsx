"use client";
import { Portal, Select } from "@ark-ui/react";
import { COUNTRIES } from "countries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Stack } from "styled-system/jsx";

export const MySelect = () => {
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

      <SelectWithoutItems items={items} />
    </Stack>
  );
};

function SelectWithoutItems({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const value = searchParams.get("country");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    console.log("search param value:", value);
  }, [value]);

  // console.log(value);

  return (
    <div>
      <Select.Root
        items={items}
        value={value ? [value] : []}
        onValueChange={(details) => {
          const countryValue = details.value[0];

          console.log("changed to:", countryValue);

          router.push(
            pathname + "?" + createQueryString("country", countryValue)
          );
        }}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a city" />
          </Select.Trigger>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content style={{ backgroundColor: "white" }}>
              <Select.ItemGroup id="city">
                {items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <p>Search: {value}</p>
      <button
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString("country", items[0].value)}`
          );
        }}
      >
        Set country to {items[0].label}
      </button>
      <button
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString("country", items[1].value)}`
          );
        }}
      >
        Set country to {items[1].label}
      </button>
    </div>
  );
}
