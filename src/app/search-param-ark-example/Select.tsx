"use client";
import { Portal, Select } from "@ark-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const items = [
  {
    label: "Germany",
    value: "de",
  },
  {
    label: "United Kingdom",
    value: "uk",
  },
  {
    label: "France",
    value: "fr",
  },
  {
    label: "Nigeria",
    value: "ng",
  },
  {
    label: "Spain",
    value: "es",
  },
];

export const MySelect = () => {
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
    console.log("searchParams", value);
  }, [value]);

  return (
    <div>
      <Select.Root
        items={items}
        value={value ? [value] : []}
        onValueChange={(details) => {
          const cityValue = details.value[0];
          router.push(pathname + "?" + createQueryString("country", cityValue));
        }}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a Country" />
          </Select.Trigger>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content style={{ backgroundColor: "white" }}>
              <Select.ItemGroup id="framework">
                <Select.ItemGroupLabel htmlFor="framework">
                  Frameworks
                </Select.ItemGroupLabel>
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
          router.push(pathname + "?" + createQueryString("country", "uk"));
        }}
      >
        Set Country to UK
      </button>
      <button
        onClick={() => {
          router.push(pathname + "?" + createQueryString("country", "fr"));
        }}
      >
        Set Country to FR
      </button>
    </div>
  );
};
