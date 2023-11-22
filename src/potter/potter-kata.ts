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

  public calculateTotalPrice(books: BooksOrder): number {
    if (books.length === 0) {
      return this.totalPrice;
    }

    if (this.areAllBooksEqual(books)) {
      return this.calculateEqualBooksPrice(books);
    }

    return this.calculatePriceForDifferentBooks(books);
  }

  public convertBooksToBooksAmountByTitle(
    books: BooksOrder
  ): BooksAmountByTitle {
    const booksAmountByTitle: BooksAmountByTitle = {};

    for (const book of books) {
      booksAmountByTitle[book] = (booksAmountByTitle[book] || 0) + 1;
    }

    return booksAmountByTitle;
  }

  private calculateEqualBooksPrice(books: BooksOrder): number {
    return books.length * this.bookPrice;
  }

  private calculatePriceForDifferentBooks(books: BooksOrder): number {
    const booksAmountByTitle = this.convertBooksToBooksAmountByTitle(books);
    const bookSubgroups = this.calculateSubGroupsFrom(booksAmountByTitle);

    bookSubgroups.forEach(
      (group) => (this.totalPrice += this.calculateSubGroupPrice(group))
    );

    if (this.hasRemainingBooks(booksAmountByTitle)) {
      this.totalPrice += 8;
    }

    return this.totalPrice;
  }

  private calculateSubGroupPrice(subGroup: number): number {
    return subGroup * this.bookPrice * DISCOUNTS[subGroup];
  }

  private areAllBooksEqual(books: BooksOrder): boolean {
    return new Set(books).size === 1;
  }

  private calculateSubGroupsFrom(booksAmount: BooksAmountByTitle): number[] {
    const subgroups: number[] = [];

    while (this.getSubGroupSize(booksAmount) >= this.MIN_SUBGROUP_SIZE) {
      const subGroupSize = this.getSubGroupSize(booksAmount);
      subgroups.push(subGroupSize);
      this.decreaseBookAmountEntriesBySubgroupSize(subGroupSize, booksAmount);
    }

    this.optimizeSubgroups(subgroups);

    return subgroups;
  }

  private optimizeSubgroups(subgroups: number[]): void {
    const lastIndex = subgroups.length - 1;

    if (this.shouldOptimizeSubgroups(subgroups, lastIndex)) {
      subgroups[lastIndex - 1] = 4;
      subgroups[lastIndex] = 4;
    }
  }

  private shouldOptimizeSubgroups(
    subgroups: number[],
    lastIndex: number
  ): boolean {
    return subgroups[lastIndex - 1] === 5 && subgroups[lastIndex] === 3;
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

  private hasRemainingBooks(booksAmount: BooksAmountByTitle): boolean {
    return this.getSubGroupSize(booksAmount) > 0;
  }
}
