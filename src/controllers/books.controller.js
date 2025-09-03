import { Book } from "../models/Book.js";

export const findBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    
    if (!book) {
        res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { id } });
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: "Book not found" });
    }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
    }

    const newBook = await Book.create({
      title,
      author,
      rating,
      pageCount,
      summary,
      imageUrl,
      available
    });

    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    await book.update({
      title,
      author,
      rating,
      pageCount,
      summary,
      imageUrl,
      available
    });
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





