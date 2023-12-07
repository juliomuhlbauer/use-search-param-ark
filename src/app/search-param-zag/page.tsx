"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Portal, normalizeProps, useMachine } from "@zag-js/react";
import * as select from "@zag-js/select";
import { COUNTRIES } from "countries";
import { useEffect, useId } from "react";

const items = COUNTRIES;

function Select({
  value,
  setValue,
}: {
  value: string | null;
  setValue: (value: string) => void;
}) {
  const collection = select.collection({
    items: items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      value: value ? [value] : undefined,
      onValueChange: (details) => {
        const cityValue = details.value[0];

        console.log("changed to:", cityValue);

        setValue(details.value[0]);
      },
    }),
    {
      context: {
        value: value ? [value] : undefined,
      },
    }
  );

  const api = select.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps}>
      <div {...api.controlProps}>
        <label {...api.labelProps}>Label</label>
        <button {...api.triggerProps}>
          {api.valueAsString || "Select a country"}
        </button>
      </div>

      <Portal>
        <div {...api.positionerProps}>
          <ul {...api.contentProps}>
            {items.map((item) => (
              <li key={item.value} {...api.getItemProps({ item })}>
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>✓</span>
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </div>
  );
}

export default function SearchParamClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCountry = searchParams.get("country");

  useEffect(() => {
    console.log("search param value:", selectedCountry);
  }, [selectedCountry]);

  console.log(selectedCountry);

  return (
    <>
      <h1>{selectedCountry}</h1>

      <button
        onClick={() => {
          router.push(`${pathname}?country=${items[0].value}`);
        }}
      >
        Change to {items[0].label}
      </button>

      <button
        onClick={() => {
          router.push(`${pathname}?country=${items[1].value}`);
        }}
      >
        Change to {items[1].label}
      </button>

      <Select
        value={selectedCountry}
        setValue={(value) => {
          router.push(`${pathname}?country=${value}`);
        }}
      />
    </>
  );
}
