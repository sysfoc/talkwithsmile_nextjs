// app/api/v1/user/contact/add/route.ts
import Contact from "@/app/model/Contact.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { fname, lname, email, message } = await req.json();

  if (!fname || !lname || !email || !message) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }
  
  try {
    // Generate incremented contact id (highest one)
    const allContacts = await Contact.find({}, { id: 1 }).lean();

    let maxContactId = 0;
    allContacts.forEach((contact) => {
      const parsedId = parseInt(contact.id);
      if (!isNaN(parsedId) && parsedId > maxContactId) {
        maxContactId = parsedId;
      }
    });

    const nextId = (maxContactId + 1).toString();
    const currentTimestamp = new Date().toISOString();

    await Contact.create({
      id: nextId,
      fname,
      lname,
      email,
      message,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    });
    
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}