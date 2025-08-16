import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import LinkModal from "@/lib/models/LinkSchema";
import mongoose from "mongoose";

export async function GET(req, { params }){
    await dbConnect();
     try{
        const { id } = await params; 
        if (!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({ error: "Invalid link ID" }, {status: 400 });
        }
        const link = await LinkModal.findById(id);
        if (!link) {
            return NextResponse.json({ error: "Link not found" }, { status: 404 });
        }   
        return NextResponse.json(link, {status :200});
}catch (error){
    console.error( "Error fetching link:", error.message);
    return NextResponse.json( {message : "Internal server error"}, {status: 500});

}
};

export async function PUT(req, {params}) {
    await dbConnect();
    try {
        const { id } =await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid link ID" }, { status: 400 });
        }

        const body = await req.json();
        const updatedLink = await LinkModal.findByIdAndUpdate(id, body, { new: true });

        if (!updatedLink) {
            return NextResponse.json({ error: "Link not found" }, { status: 404 });
        }

        return NextResponse.json(updatedLink, { status: 200 });
    } catch (error) {
        console.error("Error updating link:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const { id } =await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid link ID" }, { status: 400 });
        }

        const deletedLink = await LinkModal.findByIdAndDelete(id);
        if (!deletedLink) {
            return NextResponse.json({ error: "Link not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Link deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting link:", error.message);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}