//https://codingdojo.org/kata/Potter/
export const DISCOUNTS: Record<number, number> = {
  2: 1 - 0.05,
  3: 1 - 0.1,
  4: 1 - 0.2,
  5: 1 - 0.25,
};

export type BooksOrder = number[];
export type BooksAmountByTitle = Record<string, number>;

export class PotterKata {
  private bookPrice = 8;
  private totalPrice = 0;
  private readonly MIN_SUBGROUP_SIZE = 2;

  constructor() {}

  calculateTotalPrice(books: BooksOrder): number {
    if (books.length === 0) {
      return this.totalPrice;
    }

    if (this.checkIfBooksAreEqual(books)) {
      return books.length * this.bookPrice;
    }

    return this.calculatePriceOfBookGroupings(books);
  }

  private calculatePriceOfBookGroupings(books: BooksOrder): number {
    const booksAmountByTitle: BooksAmountByTitle =
      this.convertBooksToBookObject(books);
    const subGroups =
      this.calculateSubGroupsFromBooksAmountByTitle(booksAmountByTitle);

    subGroups.forEach(
      (group) => (this.totalPrice += this.calculateSubGroupPrice(group))
    );

    if (this.getSubGroupSize(booksAmountByTitle)) {
      this.totalPrice += 8;
    }

    return this.totalPrice;
  }

  private calculateSubGroupPrice(subGroup: number): number {
    return subGroup * this.bookPrice * DISCOUNTS[subGroup];
  }

  private checkIfBooksAreEqual(books: BooksOrder): boolean {
    return new Set(books).size === 1;
  }

  public convertBooksToBookObject(books: BooksOrder): BooksAmountByTitle {
    const book: BooksAmountByTitle = {};

    for (const element of books) {
      book[element] = (book[element] || 0) + 1;
    }

    return book;
  }

  public calculateSubGroupsFromBooksAmountByTitle(
    booksAmount: BooksAmountByTitle
  ): number[] {
    const result: number[] = [];

    while (this.getSubGroupSize(booksAmount) >= this.MIN_SUBGROUP_SIZE) {
      const subGroupSize = this.getSubGroupSize(booksAmount);
      result.push(subGroupSize);
      this.decreaseBookAmountEntriesBySubgroupSize(subGroupSize, booksAmount);
    }

    this.optimizeSubgroups(result);

    return result;
  }

  private optimizeSubgroups(subgroups: number[]): void {
    const lastIndex = subgroups.length - 1;

    if (subgroups[lastIndex - 1] === 5 && subgroups[lastIndex] === 3) {
      subgroups[lastIndex - 1] = 4;
      subgroups[lastIndex] = 4;
    }
  }

  private getSubGroupSize(booksAmount: BooksAmountByTitle): number {
    return Object.values(booksAmount).filter((value) => value > 0).length;
  }

  private decreaseBookAmountEntriesBySubgroupSize(
    subGroupSize: number,
    booksAmount: BooksAmountByTitle
  ): void {
    let startingIndex = 5;

    while (subGroupSize > 0 && startingIndex > 0) {
      if (booksAmount[startingIndex]) {
        booksAmount[startingIndex]--;
        subGroupSize--;
      }
      startingIndex--;
    }
  }
}
