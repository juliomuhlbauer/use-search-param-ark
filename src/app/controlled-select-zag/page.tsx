"use client";

import { Container, Stack } from "styled-system/jsx";
import { select as selectStyles } from "styled-system/recipes";

import { Button, Heading } from "~/components/ui";

import { Portal, normalizeProps, useMachine } from "@zag-js/react";
import * as select from "@zag-js/select";
import { CITIES } from "cities";
import { ChevronsUpDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { css, cx } from "styled-system/css";

const items = CITIES.map((city) => {
  return {
    label: city.city,
    value: city.city,
  };
});

function Select({
  value,
  setValue,
}: {
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
      // onValueChange: (details) => {
      //   const cityValue = details.value[0];

      //   console.log("changed to:", cityValue);

      //   setValue(details.value[0]);
      // },
    })
  );

  const api = select.connect(state, send, normalizeProps);

  const classes = selectStyles();

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

export default function SearchParamClientPage() {
  const [city, setCity] = useState<string | undefined>("Taubaté");

  console.log("value updated:", city);

  return (
    <Container maxW="lg">
      <Stack>
        <Heading>{city}</Heading>

        <Button variant="outline" onClick={() => setCity(CITIES[0].city)}>
          Change to {CITIES[0].city}
        </Button>

        <Button variant="outline" onClick={() => setCity(CITIES[1].city)}>
          Change to {CITIES[1].city}
        </Button>

        <Select value={city} setValue={setCity} />
      </Stack>
    </Container>
  );
}
