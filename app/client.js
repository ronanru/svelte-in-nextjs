"use client";
import { useEffect, useRef } from "react";
import Page from "./page.svelte";

export default function Client({ data }) {
  // fix double render in dev
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) return;
    const main = document.querySelector("main");
    const page = new Page({ target: main, props: { name: data } });
    isFirstRender.current = false;
  }, []);

  return <main></main>;
}
