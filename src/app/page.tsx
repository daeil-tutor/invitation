import { redirect } from "next/navigation";

// / — 첫 화면은 따로 없다. 들어오면 초대장 만들기 화면으로 보낸다.
export default function Home() {
  redirect("/create");
}
