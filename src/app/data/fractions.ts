/**
 * Interface définissant une fraction
 */
export interface Fraction {
    /**
     * Formatte prioritairement la fraction en string "[-] entier si c'est possible
     * ou en string "[-]numérateur/dénominateur" si la forme la plus simple est une fraction
     */
    toString(): string;

    /**
     * Renvoie la forme simplifié de la fraction.
     * La forme irréductible.
     */
    simplify(): Fraction;

    /**
     * Accesseur pour obtenir le nominateur
     */
    numérateur(): number;

    /**
     * Accesseur pour obtenir le dénominateur
     */
    dénominateur(): number;

    /**
     * Multiplie la fraction par f.
     * Renvoie le résultat sous forme simplifié.
     * Renvoie une nouvelle fraction, résultat de cette multiplication
     * La fraction reste inchangée.
     * @param f La fraction avec laquelle on va multiplier. Reste inchangée.
     */
    multiply(f: Fraction): Fraction;

    /**
     * Divise la fraction par f.
     * Renvoie le résultat sous forme simplifié.
     * Renvoie une nouvelle fraction, résultat de cette division
     * La fraction reste inchangée.
     * @param f La fraction avec laquelle on va diviser. Reste inchangée.
     */
    divide(f: Fraction): Fraction;

    /**
     * Ajoute la fraction f à la fraction courante.
     * Renvoie le résultat sous forme simplifié.
     * Renvoie une nouvelle fraction, résultat de cette addition
     * La fraction reste inchangée.
     * @param f La fraction que l'on va ajouter. Reste inchangée.
     */
    add(f: Fraction): Fraction;

    substract(f: Fraction): Fraction;
}

/**
 * Définition de l'exception à lever lorsqu'on tente de construire une fraction mal formée
 */
export const illFormedException = new Error("ILL FORMED fraction, should be of the form Z/Z")

export class Fraction implements Fraction {

    private readonly numerateur: number;
    private readonly denominateur: number;
    private readonly simplified : boolean;

    constructor(numerateur: number, denominateur: number, simplified = false) {

        if (!Number.isInteger(numerateur) || !Number.isInteger(denominateur) || denominateur === 0) throw illFormedException;
        this.numerateur = numerateur;
        this.denominateur = denominateur;
        this.simplified = simplified;
    }

    dénominateur(): number {
        return this.denominateur;
    }

    numérateur(): number {
        return this.numerateur;
    }

    toString(): string {
        return  (this.simplified && this.denominateur === 1) ? `${this.numerateur}` : `${this.seriN(this.numerateur)}/${this.seriN(this.denominateur)}`
    }

    // Sérialise un entier Z, met les parenthèses si négatif
    seriN(n: number): string {
        return n >= 0 ? `${n}` : `(${n})`
    } 

    simplify(): Fraction {
        
        const s = Math.sign(this.numerateur) * Math.sign(this.denominateur)
        const N = Math.abs(this.numerateur);
        const D = Math.abs(this.denominateur);

        const pgcd = euclide(N, D);

        const n = N / pgcd
        const d = D / pgcd

        return new Fraction(s * n, d, true)
    }

    multiply(f: Fraction): Fraction {
        return new Fraction(this.numerateur * f.numerateur, this.denominateur * f.denominateur);
    }

    divide(f: Fraction): Fraction {
        return new Fraction(this.numerateur * f.denominateur, this.denominateur * f.numerateur);
    }
    
    add(f: Fraction): Fraction {
        return new Fraction(this.numerateur * f.denominateur + f.numerateur * this.denominateur, this.denominateur * f.denominateur);
    }

    substract(f: Fraction): Fraction {
        if(this.denominateur === f.denominateur) return new Fraction(this.numerateur - f.numerateur, this.denominateur);
        else return new Fraction(this.numerateur * f.denominateur - f.numerateur * this.denominateur, this.denominateur * f.denominateur);
    }
}


/**
 * Calcule le PGCD de deux entiers positifs
 * A compléter pour prendre en charge les nombres non entier positifs.
 * @param a Un entier positif
 * @param b Un entier positif
 * @returns Le PGCD de a et b
 */
function euclide(a: number, b: number) {

    while (a !== b) {a > b ? a = a - b : b = b - a}
    return a
}
