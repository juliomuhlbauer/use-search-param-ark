"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";

import { Heading } from "~/components/ui/heading";

import { Portal, normalizeProps, useMachine } from "@zag-js/react";
import * as select from "@zag-js/select";
import { COUNTRIES } from "countries";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { css, cx } from "styled-system/css";
import { Button } from "~/components/ui/button";

import { select as selectStyles } from "styled-system/recipes";

export default function AriaKitExample() {
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

      <ZagSelect items={items} />
    </Stack>
  );
}

function ZagSelect({
  items,
}: {
  items: {
    label: string;
    value: string;
  }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedCountry = searchParams.get("country");

  console.log(selectedCountry);

  useEffect(() => {
    console.log("search param value:", selectedCountry);
  }, [selectedCountry]);

  return (
    <Container>
      <Stack>
        <h1>Search Param</h1>

        <Heading>{selectedCountry}</Heading>

        <Select
          key={selectedCountry}
          items={items}
          value={selectedCountry || undefined}
          setValue={(value) => {
            router.push(`${pathname}?country=${value}`);
          }}
        />

        <Stack>
          {items.map((item) => (
            <Button
              key={item.value}
              size="sm"
              variant="outline"
              onClick={() => {
                router.push(`${pathname}?country=${item.value}`);
              }}
            >
              Change to {item.label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

const classes = selectStyles();

function Select({
  items = [],
  value,
  setValue,
}: {
  items: {
    label: string;
    value: string;
  }[];
  value: string | undefined;
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
    })
    // {
    //   context: {
    //     value: value ? [value] : undefined,
    //   },
    // }
  );

  const api = select.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps} className={classes.root}>
      <div {...api.controlProps} className={classes.control}>
        <label {...api.labelProps} className={classes.label}>
          Label
        </label>
        <button {...api.triggerProps} className={classes.trigger}>
          {api.valueAsString || "Select a city"}

          <ChevronsUpDownIcon />
        </button>
      </div>

      <Portal>
        <div {...api.positionerProps} className={classes.positioner}>
          <ul
            {...api.contentProps}
            className={cx(
              css({
                overflow: "auto",
                h: "fit-content",
                maxH: 300,
              }),
              classes.content
            )}
          >
            {items.map((item) => (
              <li
                key={item.value}
                {...api.getItemProps({ item })}
                className={cx(
                  css({
                    py: 2,
                  }),
                  classes.item
                )}
              >
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
