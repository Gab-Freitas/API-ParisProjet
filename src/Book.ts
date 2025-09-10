export type ISBN = `978-${number}` | `979-${number}`;

export interface Book {
    isbn: ISBN;
    title: string;
    author: string;
    date: string;
}