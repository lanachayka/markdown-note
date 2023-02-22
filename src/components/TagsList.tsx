import { Stack, Badge } from "react-bootstrap";
import { Tag } from "../types";

type Props = {
    tags: Tag[];
    stackClassName?: string;
};

export const TagsList: React.FC<Props> = ({ tags, stackClassName }) => {
  return (
    <>
      {tags.length > 0 && (
        <Stack
          gap={1}
          direction="horizontal"
          className={`flex-wrap ${stackClassName}`}
        >
          {tags.map((tag) => (
            <Badge key={tag.id} className="text-truncate">
              {tag.label}
            </Badge>
          ))}
        </Stack>
      )}
    </>
  );
};
