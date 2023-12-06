import { Container, Stack } from "styled-system/jsx";

import { ChangeRoute } from "./ChangeRoute";
import { SelectSearchParam } from "./SelectSearchParam";

export default function SearchParamClientPage({
  searchParams,
}: {
  searchParams?: {
    city?: string;
  };
}) {
  return (
    <Container>
      <Stack>
        <ChangeRoute />

        <SelectSearchParam />
      </Stack>
    </Container>
  );
}
