export class Wrapper {
  private static readonly EMPTY = "";
  private static readonly LINE_BREAK = "\n";

  public static wrap(text: string, columnWidth: number) {
    const isTextInvalid = text.length <= 0;
    const isColumnWidthInvalid = columnWidth <= 0;

    if (isTextInvalid) return Wrapper.EMPTY;

    if (isColumnWidthInvalid) return text;

    return this.splitText(text, columnWidth);
  }

  private static splitText(text: string, columnWidth: number) {
    let i = 0;
    let result = Wrapper.EMPTY;

    while (i < text.length) {
      result += text.substring(i, columnWidth + i);
      i += columnWidth;
      if (i < text.length) result += Wrapper.LINE_BREAK;
    }
    return result;
  }
}
