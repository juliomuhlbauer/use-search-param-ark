"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Portal, normalizeProps, useMachine } from "@zag-js/react";
import * as select from "@zag-js/select";
import { COUNTRIES } from "countries";
import { useEffect, useId } from "react";
import { select as selectStyles } from "styled-system/recipes";

const items = COUNTRIES;

const classes = selectStyles();

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
        const countryValue = details.value[0];

        console.log("changed to:", countryValue);

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
    <div {...api.rootProps} className={classes.root}>
      <div {...api.controlProps} className={classes.control}>
        <label {...api.labelProps} className={classes.label}>
          Label
        </label>
        <button {...api.triggerProps} className={classes.trigger}>
          {api.valueAsString || "Select a country"}
        </button>
      </div>

      <Portal>
        <div {...api.positionerProps} className={classes.positioner}>
          <ul {...api.contentProps} className={classes.content}>
            {items.map((item) => (
              <li
                key={item.value}
                {...api.getItemProps({ item })}
                className={classes.item}
              >
                <span className={classes.itemText}>{item.label}</span>
                <span
                  {...api.getItemIndicatorProps({ item })}
                  className={classes.itemIndicator}
                >
                  ✓
                </span>
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
  const pathname = usePathname();
  const router = useRouter();

  const selectedCountry = searchParams.get("country");

  useEffect(() => {
    console.log("search param value:", selectedCountry);
  }, [selectedCountry]);

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
