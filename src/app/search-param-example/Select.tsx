"use client";
import { Portal } from "@ark-ui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Select } from "~/components/ui/select";

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
      <p>Search: {value}</p>
      <Button
        onClick={() => {
          router.push(pathname + "?" + createQueryString("country", "uk"));
        }}
      >
        Set Country to UK
      </Button>
      <Button
        onClick={() => {
          router.push(pathname + "?" + createQueryString("country", "fr"));
        }}
      >
        Set Country to FR
      </Button>
    </div>
  );
};
