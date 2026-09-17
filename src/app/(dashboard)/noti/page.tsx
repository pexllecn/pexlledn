import type { Metadata } from "next";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DynamicIsland from "./components/DynamicIsland";

export const metadata: Metadata = {
  title: "Dynamic Island",
  description:
    "A Dynamic Island with eight activities and four motion profiles, where every morph is derived from the geometry of the two states rather than hand-tuned.",
};

const NOTES: { title: string; body: string }[] = [
  {
    title: "The morph is derived, not tabulated",
    body: "The original keys its spring off a lookup table — \"timer-ring\" gets bounce 0.35, scale 0.7, y -7.5. Three views need six entries; eight need fifty-six. Here the numbers come out of the two footprints instead: the diagonal ratio sets the scale, the height delta sets the drift, and the size of the change sets the bounce. Fitted against the hand-tuned originals, the curves land on every one of them within a few hundredths.",
  },
  {
    title: "Bigger changes bounce less",
    body: "Bounce falls as the morph grows, from about 0.52 down to 0.26. That is the right way round physically — something light crossing a short distance can ring, something heavy crossing the screen should settle. It is also what the hand-tuned table did, which is a good sign the instinct behind it was sound.",
  },
  {
    title: "Expanding is not a special case",
    body: "Tapping the island runs the same computeMorph as switching activity — the only difference is which two footprints go in. A tall expansion gets a longer, calmer spring than a short one for exactly the reason idle→music does, and nobody tuned that separately. Springs also make it interruptible: collapse mid-expand and it reverses from wherever it actually is, rather than finishing first.",
  },
  {
    title: "The activity keeps running while it grows",
    body: "Compact and expanded are different React trees, so a tap unmounts one and mounts the other. Holding the countdown in component state would restart it at the exact moment the user is watching most closely. The live values sit outside React instead, so the timer reads the same second on both sides of the morph — a real timer does not reset because you looked at it.",
  },
  {
    title: "Footprints are measured, not declared",
    body: "Each view ships a rough estimate, then reports its real untransformed box the first time it renders. After one visit apiece the physics is running on actual geometry, so adding an activity takes no tuning at all — it only has to exist.",
  },
  {
    title: "Blur is doing real work",
    body: "Without it you see two distinct objects overlapping during the handoff. The blur bridges them, so the eye reads one thing changing shape rather than two things swapping. It scales with the size of the morph, because a small change needs less help, and it stays under 6px — heavy blur is expensive, particularly in Safari.",
  },
  {
    title: "Exit is faster than enter",
    body: "The outgoing copy clears at roughly half the morph's duration while the shape is still settling. The user has already decided by the time it starts; the old state's job is to get out of the way, not to linger over the new one.",
  },
  {
    title: "Reduced motion still explains itself",
    body: "With the system setting on, the island crossfades: no travel, no overshoot, no blur. The opacity change survives because it is what tells you one state became another. Reduced motion means gentler, not absent.",
  },
];

export default function Page() {
  return (
    <ContentLayout title="Dynamic Island">
      <main>
        <div className="px-4 pb-36 sm:px-6">
          <div className="mx-auto w-full max-w-4xl">
            <PageHeader title="Dynamic Island">
              Eight activities, five of them expandable on tap, four motion
              profiles, and a morph computed from the geometry of the two
              states rather than looked up in a table.
            </PageHeader>

            <DynamicIsland />

            <section className="mt-16">
              <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
                What makes it feel physical
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
