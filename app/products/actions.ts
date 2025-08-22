'use server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma';
 
export async function createProduct(formData: FormData) {
  console.log("");
  console.log("FORM DATA");
  console.log("");
  console.log(...formData.entries());
 
  // Redirect to the new post
  redirect(`/products`)
}
