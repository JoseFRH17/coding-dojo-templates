import { PotterKata } from "./potter-kata";

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
  const potterKata = new PotterKata();

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

  it("Should apply 5% discount with 2º different books", () => {
    const books = [1, 2];
    expect(potterKata.calculateTotalPrice(books)).toBe(15.2);
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
