"use client";

import { CITIES } from "cities";
import { useRouter } from "next/navigation";
import { Stack } from "styled-system/jsx";
import { Button } from "~/components/ui";

export function ChangeRoute() {
  const router = useRouter();

  return (
    <Stack>
      <Button
        variant="outline"
        onClick={() => {
          router.push(`/search-param-ark-isolated?city=${CITIES[0].city}`);
        }}
      >
        Change to {CITIES[0].city}
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          router.push(`/search-param-ark-isolated?city=${CITIES[1].city}`);
        }}
      >
        Change to {CITIES[1].city}
      </Button>
    </Stack>
  );
}
