import Book from "../models/bookModel.js"

export async function getAllBooks(_,res){
    //console.log("Get all books")
    try{
        const books=await Book.find().sort({createdAt:-1})
        res.status(200).json(books)
    }catch(error){
        console.error("Error in getAllBooks controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function getBookById(req,res){
    //console.log("Getting books by id")
    try{
        const book=await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message:"Book not found!"})
            res.status(200).json(book)
    }catch(error){
        console.error("Error in getBookById controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}
export async function createBook(req,res){
    //console.log("Creating the books")
    try{
        const {title,author,publishYear}=req.body
        if(!title || !author || !publishYear){
            return res.status(404).json({message:'All fields required'})
        }
        const book=new Book({title,author,publishYear})

        const savedBook=await book.save()

        res.status(201).json({savedBook})
    }catch(error){
        console.error("Error in createBook controller", error)
        res.status(500).json({message:"Internal message error"})
    }

}
export async function updateBook(req,res){
    //console.log("Updating books")
    try{
        const{title,author,publishYear}=req.body
        const updateBook=await
        Book.findByIdAndUpdate(req.params.id, {title,author,publishYear}, {new:true})
        if(!updateBook) return res.status(404).json({message:"Book not found"})
            res.status(200).json(updateBook)
    }catch(error){
        console.error("Error in update book controller",error)
        res.status(500).json({message:"Internal message error"})
    }
}

export async function deleteBook(req,res){
    //console.log("Delete the books")
    try{
        const deletedBook=await
        Book.findByIdAndDelete(req.params.id)
        if(!deletedBook) return res.status(404).json({message:"Book Not found"})
            res.status(200).json({message:"Book Deleted Successfully"})

    }catch(error){
        console.error("Error in deleted Book controller", error)
        res.status(500).json({message:"Internal server error"})
    }

}
