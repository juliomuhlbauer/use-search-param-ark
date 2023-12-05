"use client";

import { useSearchParams } from "next/navigation";
import { Container, Stack } from "styled-system/jsx";
import { select as selectStyles } from "styled-system/recipes";

import { useRouter } from "next/navigation";
import { Heading } from "~/components/ui";

import { Portal, normalizeProps, useMachine } from "@zag-js/react";
import * as select from "@zag-js/select";
import { CITIES } from "cities";
import { useId } from "react";
import { css, cx } from "styled-system/css";

const items = CITIES.map((city) => {
  return {
    label: city.city,
    value: city.city,
  };
});

export default function SearchParamClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCity = searchParams.get("city");

  console.log("search param value:", selectedCity);

  const collection = select.collection({
    items: items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      value: selectedCity ? [selectedCity] : undefined,
      onValueChange: ({ value }) => {
        const cityValue = value[0];

        console.log("changed to:", cityValue);
        const params = new URLSearchParams(searchParams);

        params.set("city", cityValue);

        router.push(`/search-param-zag?${params.toString()}`);
      },
    })
  );

  const api = select.connect(state, send, normalizeProps);

  const classes = selectStyles();

  return (
    <Container>
      <Stack>
        <h1>Search Param</h1>

        <Heading>{selectedCity}</Heading>

        <div {...api.rootProps} className={classes.root}>
          <div {...api.controlProps} className={classes.control}>
            <label {...api.labelProps} className={classes.label}>
              Label
            </label>
            <button {...api.triggerProps} className={classes.trigger}>
              {api.valueAsString || "Select a city"}
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
      </Stack>
    </Container>
  );
}
