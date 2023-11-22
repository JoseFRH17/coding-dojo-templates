import { BooksAmountByTitle, BooksOrder, PotterKata } from "./potter-kata";

// Hay 5 libros Cada libro ->  8€
// Compras 2 libros diferentes -> 5% total
// Compras 3 libros diferentes -> 10% total
// Compras 4 diferentes -> 20%
// Compras 5 diferentes -> 25%

// 2 copias iguales => 16 € (no hay descuento)
// 2 copias 1er libro 1 2º libro -> ((8 + 8) * 0,05) + 8€

// 2 copias 1º 2 copias 2º 2 copias 3º 1 copia 4º y 1 copia 5º
// (1º + 2º + 3º + 4º ) * 0.8
// (1º + 2º + 3º + 5º ) * 0.8
// 25.6 * 2 => 51,20

// (1º + 2º + 3º + 4º + 5º) 25% 5 * 8 * 0.75 => 30
// (1º + 2º + 3º ) 10% 3 * 8 * 0.9 => 21.60
// 51,60

// Test cases
// Comprar 0 libros

// Comprar 1º libros
// Comprar 2º libros
// Comprar 3º libros
// Comprar 4º libros
// Comprar 3 copias 1º libro

// Comprar 1º 2º 8 + 8 * 0.95 -> 15,2
// Comprar 1º 2º 3º 8 + 8 + 8 * 0.9 -> 21.6
// Comprar 1º 2º 3º 4º -> 25.6
// Comprar 1º 2º 3º 4º 5º -> 30

// Compras 2 copias 1º

describe("Potter kata shopping kart", () => {
  let potterKata: PotterKata;

  beforeEach(() => {
    potterKata = new PotterKata();
  });

  // Constants for expected values
  const NO_DISCOUNT = 8;
  const TWO_BOOK_DISCOUNT = 15.2;
  const THREE_BOOKS_DISCOUNT = 21.6;
  const COMPLEX_SCENARIO_1 = 36.8;
  const COMPLEX_SCENARIO_2 = 44.8;
  const OPTIMIZED_SCENARIO = 51.2;
  const LONG_BOOK_LIST_SCENARIO = 141.2;

  describe("Calculate total price", () => {
    it("Should be a total price of 0 with zero books given", () => {
      expect(potterKata.calculateTotalPrice([])).toBe(0);
    });

    it.each([
      [[1], NO_DISCOUNT],
      [[1, 1, 1], NO_DISCOUNT * 3],
    ])(
      "Should not apply any discount when the books are the same",
      (books, price) => {
        expect(potterKata.calculateTotalPrice(books)).toBe(price);
      }
    );

    it.each([
      [[1, 2], TWO_BOOK_DISCOUNT],
      [[1, 2, 3], THREE_BOOKS_DISCOUNT],
    ])(
      "Should apply corresponding discount when books are different",
      (books, price) => {
        expect(potterKata.calculateTotalPrice(books)).toBe(price);
      }
    );

    it("Should calculate total price with different book groupings", () => {
      const books = [1, 1, 2, 2, 3];
      expect(potterKata.calculateTotalPrice(books)).toBe(COMPLEX_SCENARIO_1);
    });

    it("Should calculate total price with combination of groupings and without", () => {
      const books = [1, 1, 1, 2, 2, 3]; // [3,2,1][1,2][1] =>[3,2,1]
      expect(potterKata.calculateTotalPrice(books)).toBe(COMPLEX_SCENARIO_2);
    });

    it("Should calculate optimized total price with combination of groupings and without", () => {
      const books = [1, 1, 2, 2, 3, 3, 4, 5];
      expect(potterKata.calculateTotalPrice(books)).toBe(OPTIMIZED_SCENARIO);
    });

    it("Should calculate optimized total price with a large number of books", () => {
      const books = [
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5,
      ];
      expect(potterKata.calculateTotalPrice(books)).toBe(
        LONG_BOOK_LIST_SCENARIO
      );
    });
  });

  describe("Convert Books Array to Books Object", () => {
    it("Should map the book array to Book object", () => {
      const books: BooksOrder = [1, 2, 3];
      const result: BooksAmountByTitle = {
        "1": 1,
        "2": 1,
        "3": 1,
      };
      expect(potterKata.convertBooksToBooksAmountByTitle(books)).toStrictEqual(
        result
      );
    });
  });
});
