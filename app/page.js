import Client from "./client";

export default async function Page() {
  const dataFromRSC = await Promise.resolve("svelte");
  return <Client data={dataFromRSC} />;
}
