import { useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { readPicked, type Picked } from "@/components/pick-game";

/**
 * "Choose a folder" and "Choose an HTML file", for **Bring in a game** and the lobby's **Open a
 * game**, and what they pick, read (src/components/pick-game.ts).
 */
export function PickGameButtons({
  disabled,
  onPicked,
}: {
  disabled?: boolean;
  onPicked: (picked: Picked) => void | Promise<void>;
}) {
  const folderInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const picked = async (list: FileList | null) => {
    if (!list?.length) return;
    try {
      const read = await readPicked(list);
      if (!Object.keys(read.files).length) {
        toast.error("There's nothing there that could be part of a game.");
        return;
      }
      await onPicked(read);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      if (folderInput.current) folderInput.current.value = "";
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          type="button"
          disabled={disabled}
          onClick={() => folderInput.current?.click()}
        >
          Choose a folder
        </Button>
        <Button
          size="sm"
          type="button"
          variant="secondary"
          disabled={disabled}
          onClick={() => fileInput.current?.click()}
        >
          Choose an HTML file
        </Button>
      </div>
      <input
        ref={folderInput}
        type="file"
        aria-label="Game folder"
        className="hidden"
        // A folder picker: the browser reads every file in it.
        {...({ webkitdirectory: "", directory: "" } as Record<string, string>)}
        multiple
        onChange={(e) => void picked(e.target.files)}
      />
      <input
        ref={fileInput}
        type="file"
        aria-label="Game file"
        accept=".html,.htm"
        className="hidden"
        onChange={(e) => void picked(e.target.files)}
      />
    </>
  );
}
