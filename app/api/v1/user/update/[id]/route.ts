// app/api/v1/user/update/[id]/route.ts
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { hashedPassword } from "@/app/utils/hashing";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { name, email, password } = await req.json();
  await connectToDatabase();
  
  try {
    const updateData: any = { 
      name, 
      email,
      email_verified_at: null,
      remember_token: null,
      updated_at: new Date().toISOString()
    };
    
    if (password && password.trim() !== "") {
      const encryptedPassword = await hashedPassword(password);
      updateData.password = encryptedPassword;
    }
    
    await User.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}