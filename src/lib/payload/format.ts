export function toPayloadArray(values: string[]) {
  return values.map((value) => ({ interest: value }));
}

export function toTagArray(values: string[]) {
  return values.map((value) => ({ tag: value }));
}

export function plainTextToLexical(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    root: {
      children: (paragraphs.length ? paragraphs : [""]).map((paragraph) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: paragraph,
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1
    }
  };
}
