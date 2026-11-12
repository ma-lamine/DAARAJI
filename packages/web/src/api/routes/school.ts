import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import { base } from "../__core/app";
import { auth } from "../auth";
import { db } from "../database";
import { siteContent, inquiries } from "../database/schema";
import { contentSchema, defaults } from "../../shared/content";

const admin = base.use(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  if (!session)
    throw new ORPCError("UNAUTHORIZED", { message: "Connectez-vous pour accéder à cet espace." });
  if (
    session.user.email.toLowerCase() !== "laminebarrandiaye1@gmail.com" ||
    !session.user.emailVerified
  )
    throw new ORPCError("FORBIDDEN", {
      message: "Accès réservé à l’adresse vérifiée de l’enseignant.",
    });
  return next({ context: { user: session.user } });
});
const text = z.string().trim().max(300);
const inquirySchema = z
  .object({
    name: text.min(1),
    age: z.enum(["6–11 ans", "12–17 ans", "18 ans et plus"]),
    guardian: text,
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(40),
    level: z.enum(["Débutant", "Intermédiaire", "Avancé", "Je ne sais pas encore"]),
    course: z.enum([
      "Langue arabe",
      "Lecture du Coran",
      "Tajwid",
      "Bases du fiqh",
      "À définir ensemble",
    ]),
    format: z.enum(["En ligne", "À domicile", "Présentiel à préciser"]),
    plan: z.enum(["Standard", "Intensive", "Complète", "À définir ensemble"]),
    accompaniment: z
      .enum(["Cours individuels", "À préciser ensemble"])
      .default("À préciser ensemble"),
    availability: z.string().trim().min(1).max(1200),
    message: z.string().trim().max(2000),
    channel: z.enum(["E-mail", "WhatsApp"]),
    consent: z.literal(true),
    website: z.string().max(200),
  })
  .superRefine((data, ctx) => {
    if (
      (data.plan === "Complète" && data.format === "En ligne") ||
      ((data.plan === "Standard" || data.plan === "Intensive") && data.format === "À domicile")
    )
      ctx.addIssue({
        code: "custom",
        path: ["plan"],
        message: "La formule doit correspondre au format choisi.",
      });
    if (data.age !== "18 ans et plus" && !data.guardian)
      ctx.addIssue({
        code: "custom",
        path: ["guardian"],
        message: "Indiquez le nom du responsable.",
      });
    if (data.channel === "WhatsApp" && !data.phone)
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Un numéro WhatsApp est nécessaire.",
      });
  });
const recent = new Map<string, number>();
export const school = {
  setPassword: admin
    .input(z.object({ password: z.string().min(12).max(128) }))
    .handler(async ({ input, context }) => {
      await auth.api.setPassword({
        headers: context.headers,
        body: { newPassword: input.password },
      });
      return { saved: true };
    }),
  content: base.handler(async () => {
    const [row] = await db.select().from(siteContent).where(eq(siteContent.id, 1));
    return row ? contentSchema.parse(JSON.parse(row.data)) : defaults;
  }),
  submit: base.input(inquirySchema).handler(async ({ input }) => {
    if (input.website) throw new ORPCError("BAD_REQUEST");
    const key = input.email.toLowerCase();
    const now = Date.now();
    for (const [k, time] of recent) if (now - time > 60000) recent.delete(k);
    if (recent.has(key))
      throw new ORPCError("TOO_MANY_REQUESTS", {
        message: "Patientez une minute avant une nouvelle demande.",
      });
    recent.set(key, now);
    try {
      const { consent: _consent, website: _website, ...data } = input;
      const id = crypto.randomUUID();
      await db.insert(inquiries).values({ ...data, id, createdAt: new Date().toISOString() });
      return { id };
    } catch (error) {
      recent.delete(key);
      throw error;
    }
  }),
  admin: admin.handler(({ context }) => ({ email: context.user.email })),
  requests: admin.handler(() => db.select().from(inquiries).orderBy(desc(inquiries.createdAt))),
  save: admin.input(contentSchema).handler(async ({ input }) => {
    await db
      .insert(siteContent)
      .values({ id: 1, data: JSON.stringify(input) })
      .onConflictDoUpdate({ target: siteContent.id, set: { data: JSON.stringify(input) } });
    return { saved: true };
  }),
  status: admin
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.enum(["Nouveau", "Contacté", "Inscrit", "Archivé"]),
      }),
    )
    .handler(async ({ input }) => {
      await db.update(inquiries).set({ status: input.status }).where(eq(inquiries.id, input.id));
      return { saved: true };
    }),
};
