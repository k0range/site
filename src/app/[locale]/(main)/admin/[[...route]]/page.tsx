import { redirect } from "next/navigation";

export default async function Page(props: PageProps<'/[locale]/admin/[[...route]]'>) {
  const { route } = await props.params;

  redirect("/admin/" + ( route ?? ""))
}