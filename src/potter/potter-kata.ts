//https://codingdojo.org/kata/Potter/

export enum discounts {
  TWO = 1 - 0.05,
  THREE = 1 - 0.1,
  FOUR = 1 - 0.2,
  FIVE = 1 - 0.25,
}

export type Books = number[];

const EMPTY_CART = 0;

export class PotterKata {
  private bookPrice = 8;
  private totalPrice = 0;

  constructor() {}

  calculateTotalPrice(books: Books): number {
    if (books.length === EMPTY_CART) {
      return this.totalPrice;
    }

    const areBooksEqual = this.checkIfBooksAreEqual(books);
    const booksLength = books.length;

    if (areBooksEqual) {
      return booksLength * this.bookPrice;
    }

    return booksLength * this.bookPrice * discounts.TWO;
  }

  private checkIfBooksAreEqual(books: Books): boolean {
    const booksSet = new Set(books);

    return booksSet.size === 1;
  }

  //precio =>  longitud del array/subgrupo * 8 * (Descuento)
}
