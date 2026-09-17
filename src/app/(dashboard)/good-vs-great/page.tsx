import type { Metadata } from "next";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import AppStoreCards from "./app-store-cards";

export const metadata: Metadata = {
  title: "Good vs Great animations",
  description:
    "A list that morphs into a detail card, with the spring derived from how far the shape actually travels.",
};

export default function Page() {
  return (
    <ContentLayout title="Good vs Great animations">
      <main>
        <div className="px-4 pb-36 sm:px-6">
          <div className="mx-auto w-full max-w-3xl pt-8">
            <p className="text-sm font-medium text-muted-foreground">Module 4</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              Good vs Great animations
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              At this point in the course we know what differentiates a good
              animation from a bad one, and we know how to code them. In this
              module we&rsquo;ll explore both the theory and practice on a
              deeper level.
            </p>

            <div className="mt-10">
              <AppStoreCards />
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Tap a row to expand it. Tap away, or press Escape, to fold it back.
            </p>

            <section className="mt-16">
              <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
                What makes this one great rather than good
              </h2>
              <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {NOTES.map((note) => (
                  <div key={note.title}>
                    <h3 className="mb-1.5 text-base font-medium text-foreground">
                      {note.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {note.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </ContentLayout>
  );
}

const NOTES: { title: string; body: string }[] = [
  {
    title: "The card is the row",
    body: "Icon, title, tagline and Get button each carry a shared layout id, so opening a card moves the very elements you tapped rather than cross-fading one panel over another. That is the whole difference between a detail view that teleports and one that came from somewhere.",
  },
  {
    title: "The spring is derived, not picked",
    body: "How fast the card opens comes out of how far the row has to travel to become it — the same computeMorph the Dynamic Island uses, on the same restrained profile. A long description opens more calmly than a short one, and nobody tuned that per app.",
  },
  {
    title: "Only the description fades",
    body: "It is the one element with no counterpart in the row, so it is the one element that has nothing to morph from. It waits a beat for the shape to start opening — arriving together makes the two read as unrelated — and leaves faster than it came, so it never lingers over a card that is already shrinking.",
  },
  {
    title: "The row holds its place",
    body: "While a row is busy being a card, a spacer of the same height keeps the list from collapsing underneath it. Without that the card animates home to a position that moved while it was open, which reads as a glitch even when nobody can say why.",
  },
  {
    title: "Interruptible in both directions",
    body: "Springs animate from wherever the element actually is, so tapping away mid-open reverses from the current frame instead of finishing the opening first. Escape does the same thing from the keyboard.",
  },
  {
    title: "Dim to focus, don't replace",
    body: "The scrim darkens and slightly blurs the list rather than hiding it. The card still reads as one of those rows, opened — not as a different screen that happens to describe the same app.",
  },
];
