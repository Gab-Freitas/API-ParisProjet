import { Controller, Get, Param, Post, Body, Put, Patch, Delete} from '@nestjs/common';
import { ParisService } from './paris.service';
import { Paris } from './Paris';

@Controller('paris')
export class ParisController {
    constructor(private readonly parisService: ParisService) {}

    @Get()
    findAll(): Partial<Paris>[] {
        return this.parisService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Paris {
        return this.parisService.findOne(id);
    }

    @Post()
    create(@Body() paris: Paris): Paris {
        return this.parisService.create(paris);
    }

    @Post('search')
    search(@Body('query') query: string): Paris[] {
        return this.parisService.search(query);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updated: Paris): Paris {
        return this.parisService.update(id, updated);
    }

    @Patch(':id')
    updatePartial(@Param('id') id: string, @Body() partial: Partial<Paris>): Paris {
        return this.parisService.updatePartial(id, partial);
    }

    @Delete(':id')
    remove(@Param('id') id: string): void {
        return this.parisService.remove(id);
    }

    /*
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

     */
}
