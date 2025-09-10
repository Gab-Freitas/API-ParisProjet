import {Body, Post, Controller, Get, Param, Delete, Query} from '@nestjs/common';
import { BookService } from './book.service';

import {Book, ISBN} from './Book'

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    getAllorByAuthor(@Query('author') author : string): Book[] {
        if (author !== undefined) {
            return this.bookService.getBooksOf(author)
        }
        else
            return this.bookService.getAllBooks();
    }

    @Get(':isbn')
    getWithISBN(@Param('isbn') isbn : ISBN): Book | undefined {
        return this.bookService.getBook(isbn);
    }

    @Delete(':isbn')
    deleteBookByISBN(@Param('isbn')isbn: ISBN): void {
        this.bookService.deleteBookByISBN(isbn);
        console.log("Book deleted!");
    }

    @Post()
    createBook(@Body() book: Book) {
        this.bookService.addBook(book);
        return book;
    }
}
