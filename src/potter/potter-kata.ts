//https://codingdojo.org/kata/Potter/

export enum discounts {
  TWO = 1 - 0.05,
  THREE = 1 - 0.1,
  FOUR = 1 - 0.2,
  FIVE = 1 - 0.25,
}

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

    // [{tañoSubgrupo: x, descuento:  y}]

    return booksLength * this.bookPrice * discounts.TWO;
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
  ) {
    //Tipos de subgrupos Tamaño 5 4 3 2
    const result: number[] = [];
    const keysSize = Object.keys(booksAmount).length;

    switch (keysSize) {
      case 5:
        result.push(keysSize);
        Object.entries(booksAmount).forEach(
          ([key, value]) => (booksAmount[key] = value - 1)
        );
        break;
      case 4:
        break;
      case 3:
        break;
      case 2:
        break;
    }
    const sizeFiveSubGroup = Object.keys(booksAmount).length === 5;
    result.push(5);
  }

  //precio =>  longitud del array/subgrupo * 8 * (Descuento)
}
