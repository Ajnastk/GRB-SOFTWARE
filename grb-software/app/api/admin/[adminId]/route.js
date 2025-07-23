import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";

export async function GET(req, {params}){
    try {
        
        const { adminId } = await params;
        await dbConnect();
        const admin = await Admin.findById(adminId).lean();

        if(!admin){
            return NextResponse.json({error : "Admin not found"}, { status : 404});
        }

        return NextResponse.json(admin,{status : 200});
    
    } catch (error) {
        console.error("Error fetching admin : ", error)
        return NextResponse.json({error : "Server error "},{message : error.message},{status : 500});
    }
}