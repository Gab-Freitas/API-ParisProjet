import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {Book, ISBN} from './Book'
import { readFile } from 'fs/promises';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, Observable} from "rxjs";
import {AxiosError, AxiosResponse} from "axios";

@Injectable()
export class BookService implements OnModuleInit {

    constructor(private readonly httpService: HttpService) {}

    private readonly logger = new Logger(BookService.name);

    async findAll(): Promise<Book[]> {
        const { data } = await firstValueFrom(
            this.httpService.get<Book[]>('https://api.npoint.io/fbb2a6039fc21e320b30').pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

private books: Book[] = [];

    async onModuleInit() {
        const data = await readFile('src/dataset.json', 'utf8')
        const localData : Book[] = JSON.parse(data);

        const remoteData : Book[]  = await this.findAll();

        localData.forEach(book => {
            this.addBook(book);
        });

        remoteData.forEach(book => {
            this.addBook(book);
        });
        console.log(`${this.books.length} Books loaded successfully`);
    }

    addBook(book: Book): void {
        if (this.books.some(b => b === book)) {}
        else this.books.push(book);
    }

    removeBook(book: Book): void {
        if (this.books.some(b => b === book)) {this.books.pop()}
    }

    getBook(isbn: ISBN): Book | undefined {
        let found = (this.books.find(b => b.isbn === isbn));
        if(found !== undefined) {
            return found;
        }
        else return undefined;
    }

    deleteBookByISBN(isbn: ISBN): void {
        let found = (this.books.find(b => b.isbn === isbn));
        if(found !== undefined) {this.removeBook(found)}
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
