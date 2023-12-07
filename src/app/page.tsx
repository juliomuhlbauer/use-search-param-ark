"use client";
import { Container } from "styled-system/jsx";
import { Heading } from "~/components/ui";

export default function Home() {
  return (
    <Container py={{ base: "12", md: "16" }} maxW="7xl">
      <Heading>Search Params Examples</Heading>
    </Container>
  );
}
