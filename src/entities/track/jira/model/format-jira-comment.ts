export const formatJiraComment = (comment?: string) =>
  comment
    ? {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: comment,
              },
            ],
          },
        ],
      }
    : undefined;
