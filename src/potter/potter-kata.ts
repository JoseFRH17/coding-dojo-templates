//https://codingdojo.org/kata/Potter/

export const DISCOUNTS: Record<number, number> = {
  2: 1 - 0.05,
  3: 1 - 0.1,
  4: 1 - 0.2,
  5: 1 - 0.25,
};

export type BooksOrder = number[];

export type BooksAmountByTitle = Record<string, number>;

const EMPTY_CART = 0;

export class PotterKata {
  private bookPrice = 8;
  private totalPrice = 0;

  private readonly SMALLEST_SUBGROUP_SIZE = 2;

  constructor() {}

  calculateTotalPrice(books: BooksOrder): number {
    if (books.length === EMPTY_CART) {
      return this.totalPrice;
    }

    const areBooksEqual = this.checkIfBooksAreEqual(books);
    const booksLength = books.length;

    if (areBooksEqual) {
      return booksLength * this.bookPrice;
    }

    const booksAmountByTitle: BooksAmountByTitle =
      this.convertBooksToBookObject(books);
    const subGroups =
      this.calculateSubGroupsFromBooksAmountByTitle(booksAmountByTitle);

    console.log(subGroups);

    subGroups.forEach(
      (group) => (this.totalPrice += this.calculateSubGroupPrice(group))
    );

    return this.totalPrice;
  }

  private calculateSubGroupPrice(subGroup: number): number {
    return subGroup * this.bookPrice * DISCOUNTS[subGroup];
  }

  private checkIfBooksAreEqual(books: BooksOrder): boolean {
    const booksSet = new Set(books);

    return booksSet.size === 1;
  }

  public convertBooksToBookObject(books: BooksOrder): BooksAmountByTitle {
    const book: BooksAmountByTitle = {};
    books.forEach((element) => (book[element] = (book[element] || 0) + 1));
    return book;
  }

  public calculateSubGroupsFromBooksAmountByTitle(
    booksAmount: BooksAmountByTitle
  ): number[] {
    //Tipos de subgrupos Tamaño 5 4 3 2
    const result: number[] = [];
    const keysSize = Object.keys(booksAmount).length;

    while (this.getSubGroupSize(booksAmount) >= this.SMALLEST_SUBGROUP_SIZE) {
      const subGroupSize = this.getSubGroupSize(booksAmount);
      result.push(subGroupSize);
      this.decreaseBookAmountEntries(subGroupSize, booksAmount);
    }

    return result;
  }

  private getSubGroupSize(booksAmount: BooksAmountByTitle): number {
    return Object.values(booksAmount).filter((value) => value > 0).length;
  }

  private decreaseBookAmountEntries(
    subGroupSize: number,
    booksAmount: BooksAmountByTitle
  ) {
    while (subGroupSize > 0) {
      const bookValue = booksAmount[subGroupSize];
      if (bookValue) booksAmount[subGroupSize] = bookValue - 1;
      subGroupSize--;
    }
  }
}
