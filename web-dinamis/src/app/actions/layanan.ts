"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLayanan(formData: FormData) {
  const nama = formData.get("nama") as string;
  const icon = formData.get("icon") as string || "⚔️";
  const deskripsi = formData.get("deskripsi") as string;
  const urutan = Number(formData.get("urutan")) || 0;
  const harga = formData.get("harga") as string || "";
  const kategori = formData.get("kategori") as string || "";
  const kekuatan = formData.get("kekuatan") as string || "";
  const image = formData.get("image") as string || null;

  await query(
    "INSERT INTO layanan (nama, icon, deskripsi, urutan, harga, kategori, kekuatan, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [nama, icon, deskripsi, urutan, harga, kategori, kekuatan, image]
  );

  revalidatePath("/admin/layanan");
  revalidatePath("/");
  redirect("/admin/layanan");
}

export async function updateLayanan(id: number, formData: FormData) {
  const nama = formData.get("nama") as string;
  const icon = formData.get("icon") as string || "⚔️";
  const deskripsi = formData.get("deskripsi") as string;
  const urutan = Number(formData.get("urutan")) || 0;
  const harga = formData.get("harga") as string || "";
  const kategori = formData.get("kategori") as string || "";
  const kekuatan = formData.get("kekuatan") as string || "";
  const image = formData.get("image") as string || null;

  await query(
    "UPDATE layanan SET nama = ?, icon = ?, deskripsi = ?, urutan = ?, harga = ?, kategori = ?, kekuatan = ?, image = ? WHERE id = ?",
    [nama, icon, deskripsi, urutan, harga, kategori, kekuatan, image, id]
  );

  revalidatePath("/admin/layanan");
  revalidatePath("/");
  redirect("/admin/layanan");
}

export async function deleteLayanan(id: number) {
  await query("DELETE FROM layanan WHERE id = ?", [id]);
  revalidatePath("/admin/layanan");
  revalidatePath("/");
}
