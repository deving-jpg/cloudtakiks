import clsx from "clsx";
import { Reveal, RevealText } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <span className={clsx("eyebrow", center && "justify-center")}>
          <span className="h-px w-6 bg-brand-cyan" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="display mt-5 text-4xl text-content md:text-6xl">
        <RevealText text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg leading-relaxed text-content/60 md:text-xl">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
