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

describe("Potter kata shopping kart", () => {
  let potterKata: PotterKata;

  beforeEach(async () => {
    potterKata = new PotterKata();
  });

  describe("Calculate total price", () => {
    it("Should be a total price of 0 with zero books given", () => {
      expect(potterKata.calculateTotalPrice([])).toBe(0);
    });

    it.each([
      [[1], 8],
      [[1, 1, 1], 24],
    ])(
      "Should not aplly any discount when the books are the same",
      (books, price) => {
        expect(potterKata.calculateTotalPrice(books)).toBe(price);
      }
    );

    it.each([
      [[1, 2], 15.2],
      [[1, 2, 3], 21.6],
      [[1, 2, 3, 4], 25.6],
      [[1, 2, 3, 4, 5], 30],
    ])(
      "Should apply corresponding discount when books are different",
      (books, price) => {
        expect(potterKata.calculateTotalPrice(books)).toBe(price);
      }
    );

    it("Should calculate total price with different book agroupations", () => {
      const books = [1, 1, 2, 2, 3]; //[1,2,3][1,2] =>
      expect(potterKata.calculateTotalPrice(books)).toBe(36.8);
    });

    it("Should calculate total price with combination of agroupations and without", () => {
      const books = [1, 1, 1, 2, 2, 3]; //[1,2,3][1,2][1]
      expect(potterKata.calculateTotalPrice(books)).toBe(44.8);
    });

    it("Should calculate optimized total price with combination of agroupations and without", () => {
      const books = [1, 1, 2, 2, 3, 3, 4, 5]; //[1,2,3,4] [1,2,3,5] <=> [1,2,3,4,5][1,2,3]
      expect(potterKata.calculateTotalPrice(books)).toBe(51.2);
    });

    it("Should calculate optimized total price with combination of agroupations and without", () => {
      const books = [
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5,
      ];
      expect(potterKata.calculateTotalPrice(books)).toBe(141.2);
    });
  });

  describe("Convert Books Array to Books Object", () => {
    it("Should map the book array to Book object ", () => {
      const books: BooksOrder = [1, 2, 3];
      const result: BooksAmountByTitle = {
        "1": 1,
        "2": 1,
        "3": 1,
      };
      expect(potterKata.convertBooksToBookObject(books)).toStrictEqual(result);
    });
  });
});

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
