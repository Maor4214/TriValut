import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const bookService = {
  getBooks,
  query,
  getBook,
  addBook,
  updateBook,
  removeBook,
  getDefaultFilter,
  getEmptyBook,
}

///book model for refrence:
/*

{ "id": "OXeMG8wNskc", 
 "title": "metus hendrerit",
  "description": "placerat nisi sodales suscipit tellus",
   "thumbnail": "http://ca.org/books-photos/20.jpg",
   //  "listPrice": { "amount": 109, "currencyCode": "EUR",
   //  "isOnSale": false } }

*/

export function getBooks() {
  return storageService
    .query('books')
    .then((books) => {
      if (!books[0]) {
        console.log('no books, adding fake books')
        _createBooks()
      } else {
        console.log(books)
        return Promise.resolve(books)
      }
    })
    .catch((err) => console.log(err))
}

function query(filterBy = {}) {
  return storageService.query('books').then((books) => {
    if (!books[0]) {
      _createBooks()
    }

    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }

    if (filterBy.listPrice.amount) {
      books = books.filter(
        (book) => book.listPrice.amount >= filterBy.listPrice.amount
      )
    }

    if (filterBy.sortBy) {
      switch (filterBy.sortBy) {
        case 'title':
          books.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'titleDesc':
          books.sort((a, b) => b.title.localeCompare(a.title))
          break
        case 'priceLow':
          books.sort((a, b) => a.listPrice.amount - b.listPrice.amount)
          break
        case 'priceHigh':
          books.sort((a, b) => b.listPrice.amount - a.listPrice.amount)
          break
      }
    }

    return Promise.resolve(books)
  })
}
function addBook() {}

function getBook(bookId) {
  return storageService.get('books', bookId)
}

function updateBook(book) {
  if (book.id) {
    return storageService.put('books', book)
  } else {
    return storageService.post('books', book)
  }
}

function removeBook(bookId) {
  return storageService.remove('books', bookId)
}

function _createBooks2() {
  const books = []

  books.push(_createBook('OXeMG8wNskc', 'book1', 4))
  books.push(_createBook('hwrfq23', 'book2', 6))
  books.push(_createBook('qegeqgq231', 'book3', 5))

  utilService.saveToStorage('books', books)
}

function _createBooks() {
  const books = [
    {
      id: utilService.makeId(),
      title: 'To Kill a Mockingbird',
      subtitle: 'A classic tale of justice and racism in the American South',
      authors: ['Harper Lee'],
      publishedDate: 1960,
      description:
        "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.",
      pageCount: 281,
      categories: ['Fiction'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 120,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: '1984',
      subtitle: 'A dystopian novel by George Orwell',
      authors: ['George Orwell'],
      publishedDate: 1949,
      description:
        "1984 is a dystopian novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. Thematically, 1984 centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviours within society.",
      pageCount: 328,
      categories: ['Fiction', 'Dystopian'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 110,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Great Gatsby',
      subtitle: 'A portrait of the Jazz Age in all its decadence',
      authors: ['F. Scott Fitzgerald'],
      publishedDate: 1925,
      description:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
      pageCount: 180,
      categories: ['Fiction', 'Classics'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 95,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Hobbit',
      subtitle: 'A story of adventure and courage',
      authors: ['J.R.R. Tolkien'],
      publishedDate: 1937,
      description:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
      pageCount: 310,
      categories: ['Fantasy'],
      thumbnail:
        'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 135,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: "Harry Potter and the Philosopher's Stone",
      subtitle: 'The first book in the Harry Potter series',
      authors: ['J.K. Rowling'],
      publishedDate: 1997,
      description:
        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
      pageCount: 223,
      categories: ['Fantasy', 'Young Adult'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 115,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'Pride and Prejudice',
      subtitle: 'A classic romantic novel',
      authors: ['Jane Austen'],
      publishedDate: 1813,
      description:
        'Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
      pageCount: 279,
      categories: ['Romance', 'Classics'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 90,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Catcher in the Rye',
      subtitle: 'A novel by J.D. Salinger',
      authors: ['J.D. Salinger'],
      publishedDate: 1951,
      description:
        'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society.',
      pageCount: 234,
      categories: ['Fiction', 'Coming-of-age'],
      thumbnail:
        'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 105,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'Lord of the Flies',
      subtitle: 'A study of human nature in isolation',
      authors: ['William Golding'],
      publishedDate: 1954,
      description:
        "Lord of the Flies is a 1954 novel by Nobel Prize-winning British author William Golding. The book focuses on a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves. The novel examines the dark side of human nature as the children's civilized veneer erodes away.",
      pageCount: 224,
      categories: ['Fiction', 'Classics'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81RtEeL+wCL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 98,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Alchemist',
      subtitle: 'A philosophical novel by Paulo Coelho',
      authors: ['Paulo Coelho'],
      publishedDate: 1988,
      description:
        'The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller. The Alchemist follows the journey of an Andalusian shepherd boy named Santiago.',
      pageCount: 197,
      categories: ['Fiction', 'Philosophy'],
      thumbnail: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg',
      language: 'en',
      listPrice: {
        amount: 110,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'Brave New World',
      subtitle: 'A dystopian social science fiction novel',
      authors: ['Aldous Huxley'],
      publishedDate: 1932,
      description:
        'Brave New World is a dystopian social science fiction novel by English author Aldous Huxley, written in 1931 and published in 1932. Largely set in a futuristic World State, whose citizens are environmentally engineered into an intelligence-based social hierarchy.',
      pageCount: 311,
      categories: ['Fiction', 'Dystopian'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 120,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Hunger Games',
      subtitle: 'A dystopian novel set in a post-apocalyptic future',
      authors: ['Suzanne Collins'],
      publishedDate: 2008,
      description:
        'The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.',
      pageCount: 374,
      categories: ['Fiction', 'Dystopian', 'Young Adult'],
      thumbnail: 'https://m.media-amazon.com/images/I/61+t8dh4BEL.jpg',
      language: 'en',
      listPrice: {
        amount: 115,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Da Vinci Code',
      subtitle: 'A mystery thriller novel',
      authors: ['Dan Brown'],
      publishedDate: 2003,
      description:
        'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It follows symbologist Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.',
      pageCount: 454,
      categories: ['Mystery', 'Thriller'],
      thumbnail:
        'https://m.media-amazon.com/images/I/91Q5dCjc2KL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 125,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Road',
      subtitle: 'A post-apocalyptic novel',
      authors: ['Cormac McCarthy'],
      publishedDate: 2006,
      description:
        'The Road is a 2006 post-apocalyptic novel by American writer Cormac McCarthy. The book details the journey of a father and his young son over a period of several months, across a landscape blasted by an unspecified cataclysm that has destroyed most of civilization and, in the intervening years, almost all life on Earth.',
      pageCount: 287,
      categories: ['Fiction', 'Post-Apocalyptic'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71IJ1HC2a0L._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 115,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Kite Runner',
      subtitle: 'A novel about friendship, betrayal, and redemption',
      authors: ['Khaled Hosseini'],
      publishedDate: 2003,
      description:
        'The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003 by Riverhead Books, it tells the story of Amir, a young boy from the Wazir Akbar Khan district of Kabul, whose closest friend is Hassan.',
      pageCount: 371,
      categories: ['Fiction', 'Historical Fiction'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81IzbD2IiIL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 110,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'Sapiens: A Brief History of Humankind',
      subtitle: 'A history of humanity',
      authors: ['Yuval Noah Harari'],
      publishedDate: 2011,
      description:
        'Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 based on a series of lectures Harari taught at The Hebrew University of Jerusalem, and in English in 2014.',
      pageCount: 443,
      categories: ['Non-fiction', 'History'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71xm91sk+yL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 145,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'Educated',
      subtitle: 'A memoir by Tara Westover',
      authors: ['Tara Westover'],
      publishedDate: 2018,
      description:
        'Educated is a memoir by the American author Tara Westover. Westover recounts overcoming her survivalist Mormon family in order to go to college, and emphasizes the importance of education in enlarging her world.',
      pageCount: 334,
      categories: ['Non-fiction', 'Memoir'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81NwOj14S6L._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 130,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'A Brief History of Time',
      subtitle: 'From the Big Bang to Black Holes',
      authors: ['Stephen Hawking'],
      publishedDate: 1988,
      description:
        'A Brief History of Time: From the Big Bang to Black Holes is a popular-science book on cosmology by English physicist Stephen Hawking. It was first published in 1988. Hawking wrote the book for readers without prior knowledge of the universe and people who are just interested in learning something new.',
      pageCount: 212,
      categories: ['Non-fiction', 'Science'],
      thumbnail:
        'https://m.media-amazon.com/images/I/A1xkFZX5k-L._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 135,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Art of War',
      subtitle: 'An ancient Chinese military treatise',
      authors: ['Sun Tzu'],
      publishedDate: -500, // Approximating 500 BCE
      description:
        'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters. Each one is devoted to an aspect of warfare and how it applies to military strategy and tactics.',
      pageCount: 273,
      categories: ['Non-fiction', 'Military'],
      thumbnail:
        'https://m.media-amazon.com/images/I/71LHQGXCsXL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 95,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
    {
      id: utilService.makeId(),
      title: 'Thinking, Fast and Slow',
      subtitle: 'A book about the two systems that drive the way we think',
      authors: ['Daniel Kahneman'],
      publishedDate: 2011,
      description:
        "Thinking, Fast and Slow is a 2011 book by psychologist Daniel Kahneman. The book's main thesis is that of a dichotomy between two modes of thought: 'System 1' is fast, instinctive and emotional; 'System 2' is slower, more deliberative, and more logical.",
      pageCount: 499,
      categories: ['Non-fiction', 'Psychology'],
      thumbnail:
        'https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 140,
        currencyCode: 'EUR',
        isOnSale: false,
      },
    },
    {
      id: utilService.makeId(),
      title: 'The Four Agreements',
      subtitle: 'A Practical Guide to Personal Freedom',
      authors: ['Don Miguel Ruiz'],
      publishedDate: 1997,
      description:
        "The Four Agreements: A Practical Guide to Personal Freedom is a self-help book by bestselling author Don Miguel Ruiz with Janet Mills. The book offers a code of conduct based on ancient Toltec wisdom that advocates freedom from self-limiting beliefs that may cause suffering and limitation in a person's life.",
      pageCount: 168,
      categories: ['Non-fiction', 'Self-help'],
      thumbnail:
        'https://m.media-amazon.com/images/I/81hHy5XrdKL._AC_UF1000,1000_QL80_.jpg',
      language: 'en',
      listPrice: {
        amount: 90,
        currencyCode: 'EUR',
        isOnSale: true,
      },
    },
  ]

  console.log('Real books created:', books.length)
  utilService.saveToStorage('books', books)
  return books
}

function _createBook(id, title, listPrice) {
  const book = { id, title, listPrice }

  return book
}

function getDefaultFilter() {
  return {
    title: '',
    listPrice: { amount: '' },
  }
}

function getEmptyBook() {
  return {
    id: '',
    title: '',
    subtitle: '',
    authors: [],
    publishedDate: '',
    description: '',
    pageCount: '',
    categories: [],
    thumbnail: '',
    language: '',
    listPrice: {
      amount: '',
      currencyCode: '',
      isOnSale: false,
    },
  }
}
