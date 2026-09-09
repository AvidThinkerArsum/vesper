import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Art } from "@/components/Art";
import { StayingIn } from "@/components/StayingIn";
import { Agenda } from "@/components/Agenda";
import { Pace } from "@/components/Pace";
import { Invitation } from "@/components/Invitation";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Art />
      <StayingIn />
      <Agenda />
      <Pace />
      <Invitation />
    </main>
  );
}
