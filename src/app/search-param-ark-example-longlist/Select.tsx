"use client";
import { Portal, Select } from "@ark-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const items = [
  { label: "Germany", value: "de" },
  { label: "Brazil", value: "br" },
  { label: "United States", value: "us" },
  { label: "France", value: "fr" },
  { label: "China", value: "cn" },
  { label: "India", value: "in" },
  { label: "Japan", value: "jp" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Italy", value: "it" },
  { label: "Australia", value: "au" },
  { label: "Spain", value: "es" },
  { label: "Mexico", value: "mx" },
  { label: "South Korea", value: "kr" },
  { label: "Russia", value: "ru" },
  { label: "Netherlands", value: "nl" },
  { label: "Switzerland", value: "ch" },
  { label: "Sweden", value: "se" },
  { label: "Norway", value: "no" },
  { label: "Denmark", value: "dk" },
  { label: "Finland", value: "fi" },
  { label: "Portugal", value: "pt" },
  { label: "Argentina", value: "ar" },
  { label: "Turkey", value: "tr" },
  { label: "Belgium", value: "be" },
  { label: "Austria", value: "at" },
  { label: "Poland", value: "pl" },
  { label: "South Africa", value: "za" },
  { label: "Singapore", value: "sg" },
  { label: "New Zealand", value: "nz" },
  { label: "Ireland", value: "ie" },
  { label: "Greece", value: "gr" },
  { label: "Chile", value: "cl" },
  { label: "Colombia", value: "co" },
  { label: "Peru", value: "pe" },
  { label: "Malaysia", value: "my" },
  { label: "Philippines", value: "ph" },
  { label: "Thailand", value: "th" },
  { label: "Vietnam", value: "vn" },
  { label: "Egypt", value: "eg" },
  { label: "Saudi Arabia", value: "sa" },
  { label: "United Arab Emirates", value: "ae" },
  { label: "Nigeria", value: "ng" },
  { label: "Kenya", value: "ke" },
  { label: "Morocco", value: "ma" },
  { label: "Israel", value: "il" },
  { label: "Pakistan", value: "pk" },
  { label: "Bangladesh", value: "bd" },
  { label: "Indonesia", value: "id" },
  { label: "Iran", value: "ir" },
  { label: "Iraq", value: "iq" },
  { label: "Lebanon", value: "lb" },
  { label: "Jordan", value: "jo" },
  { label: "Qatar", value: "qa" },
  { label: "Kuwait", value: "kw" },
  { label: "Oman", value: "om" },
  { label: "Bahrain", value: "bh" },
  { label: "Cyprus", value: "cy" },
  { label: "Estonia", value: "ee" },
  { label: "Latvia", value: "lv" },
  { label: "Lithuania", value: "lt" },
  { label: "Czech Republic", value: "cz" },
  { label: "Slovakia", value: "sk" },
  { label: "Hungary", value: "hu" },
  { label: "Romania", value: "ro" },
  { label: "Bulgaria", value: "bg" },
  { label: "Croatia", value: "hr" },
  { label: "Slovenia", value: "si" },
  { label: "Bosnia and Herzegovina", value: "ba" },
  { label: "Montenegro", value: "me" },
  { label: "North Macedonia", value: "mk" },
  { label: "Serbia", value: "rs" },
  { label: "Albania", value: "al" },
  { label: "Kosovo", value: "xk" },
  { label: "Ukraine", value: "ua" },
  { label: "Belarus", value: "by" },
  { label: "Moldova", value: "md" },
  { label: "Georgia", value: "ge" },
  { label: "Armenia", value: "am" },
  { label: "Azerbaijan", value: "az" },
  { label: "Kazakhstan", value: "kz" },
  { label: "Uzbekistan", value: "uz" },
  { label: "Turkmenistan", value: "tm" },
  { label: "Kyrgyzstan", value: "kg" },
  { label: "Tajikistan", value: "tj" },
  { label: "Afghanistan", value: "af" },
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
    console.log("search param value:", value);
  }, [value]);

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
            pathname + "?" + createQueryString("country", items[0].value)
          );
        }}
      >
        Set country to {items[0].label}
      </button>
      <button
        onClick={() => {
          router.push(
            pathname + "?" + createQueryString("country", items[1].value)
          );
        }}
      >
        Set country to {items[1].label}
      </button>
    </div>
  );
};
