//https://codingdojo.org/kata/Potter/

import { inflateRaw } from "zlib";

export enum discounts {
  TWO = 1 - 0.05,
  THREE = 1 - 0.1,
  FOUR = 1 - 0.2,
  FIVE = 1 - 0.25,
}

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

    return this.calculateSubGroupPrice(subGroups[0]);
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

    switch (keysSize) {
      case 5:
      case 4:
      case 3:
      case 2:
        result.push(keysSize);
        this.decreaseBookAmountEntries(5, booksAmount);
        break;
    }

    return result;
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
