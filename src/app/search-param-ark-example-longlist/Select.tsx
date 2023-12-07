"use client";
import { Portal, Select } from "@ark-ui/react";
import { CITIES } from "cities";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const items = CITIES.map((city) => {
  return {
    label: city.city,
    value: city.city,
  };
});

export const MySelect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const value = searchParams.get("city");

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

  return (
    <div>
      <Select.Root
        items={items}
        value={value ? [value] : []}
        onValueChange={(details) => {
          const cityValue = details.value[0];
          router.push(pathname + "?" + createQueryString("city", cityValue));
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
            pathname + "?" + createQueryString("city", CITIES[0].city)
          );
        }}
      >
        Set city to {CITIES[0].city}
      </button>
      <button
        onClick={() => {
          router.push(
            pathname + "?" + createQueryString("city", CITIES[1].city)
          );
        }}
      >
        Set city to {CITIES[1].city}
      </button>
    </div>
  );
};
