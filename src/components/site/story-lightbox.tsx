import { useState } from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import storyVideoAsset from "@/assets/kavolith-founder-story.mp4.asset.json";

/**
 * Secondary "Watch our story" trigger + video lightbox.
 * Video: founder intro, 70s, vertical 1080×1920 — letterboxed with
 * object-contain inside the 16:9 player frame.
 */
const STORY_VIDEO_SRC: string | null = storyVideoAsset.url;

export function StoryLightbox() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg px-2 py-3 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-accent-soft text-accent">
          <Play className="h-3 w-3" aria-hidden />
        </span>
        Watch our story
      </button>


      <DialogContent className="max-w-3xl border-border bg-surface p-2 sm:p-3">
        <DialogTitle className="px-2 pt-1 text-base">Our story</DialogTitle>
        <DialogDescription className="px-2 text-[13px] text-muted-foreground">
          A short introduction from the founder of Kavolith Group.
        </DialogDescription>

        <div className="mt-2 aspect-video w-full overflow-hidden rounded-lg border border-border bg-ink">
          {STORY_VIDEO_SRC ? (
            <video
              className="h-full w-full object-cover"
              src={STORY_VIDEO_SRC}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Video slot ready
              </span>
              <p className="max-w-sm px-6 text-[13px] leading-relaxed text-muted-foreground">
                The founder intro video will play here as soon as the file is added.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
