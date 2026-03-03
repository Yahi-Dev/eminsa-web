import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

function isBase64(str: string | null | undefined): boolean {
  return !!str && str.startsWith("data:");
}

async function uploadBase64(
  base64: string,
  folder: string,
  resourceType: "image" | "raw" = "image"
): Promise<string> {
  const result = await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: resourceType,
  });
  return result.secure_url;
}

async function migrateNoticias() {
  const noticias = await prisma.noticia.findMany({
    select: { id: true, titulo: true, imagen: true, imagenes: true },
  });

  console.log(`\nNoticias: ${noticias.length} total`);
  let migrated = 0;

  for (const n of noticias) {
    let updated = false;
    const data: Record<string, unknown> = {};

    if (isBase64(n.imagen)) {
      console.log(`  [${n.id}] "${n.titulo}" — uploading imagen...`);
      const url = await uploadBase64(n.imagen!, "eminsa/noticias");
      data.imagen = url;
      updated = true;
      console.log(`    -> ${url}`);
    }

    if (Array.isArray(n.imagenes)) {
      const urls: string[] = [];
      let galleryUpdated = false;
      for (const img of n.imagenes as string[]) {
        if (isBase64(img)) {
          const url = await uploadBase64(img, "eminsa/noticias");
          urls.push(url);
          galleryUpdated = true;
        } else {
          urls.push(img);
        }
      }
      if (galleryUpdated) {
        data.imagenes = urls;
        updated = true;
      }
    }

    if (updated) {
      await prisma.noticia.update({ where: { id: n.id }, data });
      migrated++;
      console.log(`  [${n.id}] updated.`);
    }
  }

  console.log(`  Migrated: ${migrated}/${noticias.length}`);
}

async function migrateProyectos() {
  const proyectos = await prisma.proyecto.findMany({
    select: { id: true, titulo: true, imagen: true, imagenes: true },
  });

  console.log(`\nProyectos: ${proyectos.length} total`);
  let migrated = 0;

  for (const p of proyectos) {
    let updated = false;
    const data: Record<string, unknown> = {};

    if (isBase64(p.imagen)) {
      console.log(`  [${p.id}] "${p.titulo}" — uploading imagen...`);
      const url = await uploadBase64(p.imagen!, "eminsa/proyectos");
      data.imagen = url;
      updated = true;
      console.log(`    -> ${url}`);
    }

    if (Array.isArray(p.imagenes)) {
      const urls: string[] = [];
      let galleryUpdated = false;
      for (const img of p.imagenes as string[]) {
        if (isBase64(img)) {
          const url = await uploadBase64(img, "eminsa/proyectos");
          urls.push(url);
          galleryUpdated = true;
        } else {
          urls.push(img);
        }
      }
      if (galleryUpdated) {
        data.imagenes = urls;
        updated = true;
      }
    }

    if (updated) {
      await prisma.proyecto.update({ where: { id: p.id }, data });
      migrated++;
      console.log(`  [${p.id}] updated.`);
    }
  }

  console.log(`  Migrated: ${migrated}/${proyectos.length}`);
}

async function migrateRecursos() {
  const recursos = await prisma.recurso.findMany({
    select: { id: true, nombre: true, archivo: true, tipo: true },
  });

  console.log(`\nRecursos: ${recursos.length} total`);
  let migrated = 0;

  for (const r of recursos) {
    if (isBase64(r.archivo)) {
      console.log(`  [${r.id}] "${r.nombre}" — uploading archivo...`);
      const resourceType = r.tipo === "img" ? "image" as const : "raw" as const;
      const url = await uploadBase64(r.archivo!, "eminsa/recursos", resourceType);
      await prisma.recurso.update({
        where: { id: r.id },
        data: { archivo: url },
      });
      migrated++;
      console.log(`    -> ${url}`);
    }
  }

  console.log(`  Migrated: ${migrated}/${recursos.length}`);
}

async function main() {
  console.log("=== Cloudinary Migration Script ===");
  console.log(`Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log(`Date: ${new Date().toISOString()}\n`);

  await migrateNoticias();
  await migrateProyectos();
  await migrateRecursos();

  console.log("\n=== Migration complete! ===");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
