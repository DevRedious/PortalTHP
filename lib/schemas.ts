import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  age: z.number().int().min(0).max(150).optional(),
  department: z.string().min(1, "Le département est requis"),
  bio: z.string().max(500, "La bio ne doit pas dépasser 500 caractères"),
  linkedin: z.string().url("URL LinkedIn invalide").optional().or(z.literal("")),
  github: z.string().url("URL GitHub invalide").optional().or(z.literal("")),
  discord: z.string().optional(),
  stackTags: z.array(z.string()).default([]),
  availability: z.enum(["available", "busy", "unavailable"]).default("available"),
  avatarCID: z.string().optional(),
});

export type Profile = z.infer<typeof profileSchema>;

export const profileIPFSSchema = profileSchema.extend({
  version: z.literal("1.0"),
  updatedAt: z.string(),
});

export type ProfileIPFS = z.infer<typeof profileIPFSSchema>;
