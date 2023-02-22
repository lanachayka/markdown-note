import { NoteForm } from "../components";
import { useNote } from "../hooks";
import { NoteData, Tag } from "../types";

type Props = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const EditNote: React.FC<Props> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  const { title, id, markdown, tags } = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={title}
        markdown={markdown}
        tags={tags}
        onSubmit={(data) => onSubmit(id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};
