import { illFormedException, Fraction } from "./fractions";


describe("Instanciations de fractions impossibles", () => {
    it("shouldn't be possible to build the fraction 3/0", () => {
        expect(() => new Fraction(3, 0)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction NaN/2", () => {
        expect(() => new Fraction(NaN, 2)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction 7/NaN", () => {
        expect(() => new Fraction(7, NaN)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction 3/Infinity", () => {
        expect(() => new Fraction(3, Infinity)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction Infinity/8", () => {
        expect(() => new Fraction(Infinity, 8)).toThrow(illFormedException)
    });

});

describe("Instanciations de fractions possibles", () => {
    it("should be possible to build the fraction 3/2", () => {
        const f = new Fraction(3, 2);
        expect(f.numérateur()).toEqual(3);
        expect(f.dénominateur()).toEqual(2)
    });

    it("should be possible to build the fraction (-2)/(-5) from (-2)/(-5)", () => {
        const f = new Fraction(-2, -5);
        expect(f.numérateur()).toEqual(-2);
        expect(f.dénominateur()).toEqual(-5)
        expect(f.toString()).toEqual("(-2)/(-5)")
    });

    it("should be possible to build the fraction 2/(-5) from (2)/(-5)", () => {
        const f = new Fraction(2, -5);
        expect(f.numérateur()).toEqual(2);
        expect(f.dénominateur()).toEqual(-5)
        expect(f.toString()).toEqual("2/(-5)")
    });

    it("should be possible to build the fraction 3/(-7) from 3/(-7)", () => {
        const f = new Fraction(3, -7);
        expect(f.numérateur()).toEqual(3);
        expect(f.dénominateur()).toEqual(-7)
        expect(f.toString()).toEqual("3/(-7)")
    });

    it("should be possible to build the fraction (-5)/(-1) from (-5)/(-1), should serialized to '(-5)/(-1)'", () => {
        const f = new Fraction(-5, -1);
        expect(f.numérateur()).toEqual(-5);
        expect(f.dénominateur()).toEqual(-1)
        expect(f.toString()).toEqual("(-5)/(-1)")
    });

    it("should be possible to build the fraction 12/(-9) from (12)/(-9)", () => {
        const f = new Fraction(12, -9);
        expect(f.numérateur()).toEqual(12);
        expect(f.dénominateur()).toEqual(-9)
        expect(f.toString()).toEqual("12/(-9)")
    });

    it("should be possible to build the fraction (-3)/2", () => {
        const f = new Fraction(-3, 2);
        expect(f.numérateur()).toEqual(-3);
        expect(f.dénominateur()).toEqual(2)
        expect(f.toString()).toEqual("(-3)/2")
    });

    it("should be possible to build the fraction 5/1", () => {
        const f = new Fraction(5, 1);
        expect(f.numérateur()).toEqual(5);
        expect(f.dénominateur()).toEqual(1)
        expect(f.toString()).toEqual("5/1")
    });

});

describe("Simplification de fractions", () => {
    it("should be possible to simplify (-2)/(-5) into 2/5", () => {
        const f = new Fraction(-2, -5).simplify();
        expect(f.numérateur()).toEqual(2);
        expect(f.dénominateur()).toEqual(5)
        expect(f.toString()).toEqual("2/5")
    });

    it("should be possible to simplify (-2)/5 into (-2)/5", () => {
        const f = new Fraction(-2, 5).simplify();
        expect(f.numérateur()).toEqual(-2);
        expect(f.dénominateur()).toEqual(5)
        expect(f.toString()).toEqual("(-2)/5")
    });

    it("should be possible to simplify 3/(-7) into (-3)/7", () => {
        const f = new Fraction(3, -7).simplify();
        expect(f.numérateur()).toEqual(-3);
        expect(f.dénominateur()).toEqual(7)
        expect(f.toString()).toEqual("(-3)/7")
    });

    it("should be possible to simplify 256/(-64) into -4", () => {
        const f = new Fraction(256, -64).simplify();
        expect(f.numérateur()).toEqual(-4);
        expect(f.dénominateur()).toEqual(1)
        expect(f.toString()).toEqual("-4")
    });

})


describe("Multiplication de fractions", () => {
    it("should be possible to multiply 3/2 by 4/5 and get 12/10", () => {
        const f32 = new Fraction(3, 2);
        const f45 = new Fraction(4, 5);
        const f65 = f32.multiply(f45);
        expect(f65.numérateur()).toEqual(12)
        expect(f65.dénominateur()).toEqual(10)
        
        expect(f32.toString()).withContext("La fraction sur laquelle on appelle la multiplication reste inchangée").toEqual("3/2")
        expect(f45.toString()).withContext("Le paramètre de la multiplication rete inchangé").toEqual("4/5")
    });

    it("should be possible to multiply 3/2 by 4/5 and get 6/5", () => {
        const f32 = new Fraction(3, 2);
        const f45 = new Fraction(4, 5);
        const f65 = f32.multiply(f45).simplify();
        expect(f65.numérateur()).toEqual(6)
        expect(f65.dénominateur()).toEqual(5)
    });
});

describe("Division de fractions", () => {
    it("should be possible to divide 3/2 by 4/5 and get 15/8", () => {
        const f32 = new Fraction(3, 2);
        const f45 = new Fraction(4, 5);
        const f65 = f32.divide(f45);
        expect(f65.numérateur()).toEqual(15)
        expect(f65.dénominateur()).toEqual(8)
    });
    
});

describe("Addition de fractions", () => {
    it("should be possible to add 3/2 to 4/5 and get 23/10", () => {
        const f32 = new Fraction(3, 2);
        const f45 = new Fraction(4, 5);
        const f65 = f32.add(f45);
        expect(f65.numérateur()).toEqual(23)
        expect(f65.dénominateur()).toEqual(10)
    });

    it("should be possible to add 4/5 to 4/5 and get 8/5", () => {
        const f45 = new Fraction(4, 5);
        const f65 = f45.add(f45).simplify();
        expect(f65.numérateur()).toEqual(8)
        expect(f65.dénominateur()).toEqual(5)  
    });
    
});

describe("Soustraction de fractions", () => {
    it("should be possible to substract 10/2 to 6/2 and get 4/2", () => {
        const f102 = new Fraction(10, 2);
        const f62 = new Fraction(6, 2);
        const f42 = f102.substract(f62);
        expect(f42.numérateur()).toEqual(4);
        expect(f42.dénominateur()).toEqual(2);
    }); 
});