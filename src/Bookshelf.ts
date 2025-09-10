import type { Book } from './Book';

export class Bookshelf {

    private books: Book[] = [];

    addBook(book: Book): void {
        if (this.books.some(b => b === book)) {}
        else this.books.push(book);
    }

    getBook(isbn: string): Book | undefined {
        let found = (this.books.find(b => b.isbn === isbn));
        if(found !== undefined) {
            return found;
        }
        else return undefined;
    }

    getBooksOf(author: string) : Book[] {
        return this.books.filter(b => b.author === author);
    }

    getAllBooks() : Book[] {
        return this.books.sort((a: Book, b: Book) => a.title.localeCompare(b.title));
    }

    getTotalNumberOfBooks() : number {
        return this.books.length;
    }

    getBooksPublishedAfter(aDate: string) : Book[] {
        return this.books
            .filter(b => b.date.localeCompare(aDate) > 0)
            .sort((a, b) => b.date.localeCompare(a.date));;
    }


}