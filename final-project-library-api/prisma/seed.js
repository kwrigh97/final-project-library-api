import prisma from '../src/config/db.js';
import bcrypt from 'bcrypt';

async function main() {
    await prisma.$queryRaw`TRUNCATE "Loan", "BookAuthor", "Book", "Author", "User" RESTART IDENTITY;`;
    const libPassword = await bcrypt.hash('libpassword123', 10);
    const memPassword = await bcrypt.hash('memberpassword', 10);

    const librarian = await prisma.user.create({
        data: {
            name: 'Alice Johnson',
            email: 'alicej@library.com',
            passwordHash: libPassword,
            role: 'librarian',
        },
    });

    const member = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@member.com',
            passwordHash: memPassword,
            role: 'member',
        },
    });

    const author1 = await prisma.author.create({
        data: {name: 'Suzanne Collins'},
    });

    const author2 = await prisma.author.create({
        data: {name: 'S. E. Hinton'},
    });

    const book1 = await prisma.book.create({
        data: {
            title: 'Hunger Games',
            isbn: '1234',
            publishedYear: 2008,
            copiesTotal: 10,
        },
    });

    const book2 = await prisma.book.create({
        data: {
            title: 'The Outsiders',
            isbn: '5678',
            publishedYear: 1967,
            copiesTotal: 5,
        },
    });

    await prisma.loan.create({
        data: {
            bookId: book1.id,
            userId: member.id,
            loanedAt: new Date(),
            dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), //Automatically makes the due date 2 weeks from loan date
        },
    });

    await prisma.bookAuthor.createMany({
        data: [
            {
                bookId: book1.id,
                authorId: author1.id,
            },
            {
                bookId: book2.id,
                authorId: author2.id,
            },
        ],
    });

    console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });