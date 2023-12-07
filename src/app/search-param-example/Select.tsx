"use client";
import { CITIES } from "cities";
import { ChevronsUpDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Select } from "~/components/ui/select";

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
    console.log("searchParams", value);
  }, [value]);

  return (
    <div>
      <Select.Root
        positioning={{ sameWidth: true }}
        width="2xs"
        items={items}
        value={value ? [value] : []}
        onValueChange={({ value }) => {
          console.log("changed to:", value[0]);

          router.push(pathname + "?" + createQueryString("city", value[0]));
        }}
      >
        <Select.Label>City</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a city" />
            <ChevronsUpDownIcon />
          </Select.Trigger>
        </Select.Control>
        {/* <Portal>
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
        </Portal> */}
      </Select.Root>
      <p>Search: {value}</p>
      <Button
        onClick={() => {
          router.push(
            pathname + "?" + createQueryString("city", CITIES[0].city)
          );
        }}
      >
        Set City to {CITIES[0].city}
      </Button>
      <Button
        onClick={() => {
          router.push(
            pathname + "?" + createQueryString("city", CITIES[1].city)
          );
        }}
      >
        Set City to {CITIES[1].city}
      </Button>
    </div>
  );
};
