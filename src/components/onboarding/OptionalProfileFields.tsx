import { TextAreaField, TextField } from "./StudentOnboardingFields";

export function OptionalProfileFields({
  defaults,
  errors,
}: {
  defaults: {
    universityEmail?: string | null;
    bio?: string | null;
    portfolioUrl?: string | null;
    linkedinUrl?: string | null;
    avatarUrl?: string | null;
  };
  errors: Record<string, string>;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-1 rounded-3xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-2">
      <TextField name="universityEmail" label="University email" type="email" defaultValue={defaults.universityEmail ?? ""} helper="This can help with future university verification." error={errors.universityEmail} />
      <TextField name="portfolioUrl" label="Portfolio URL" defaultValue={defaults.portfolioUrl ?? ""} error={errors.portfolioUrl} />
      <TextField name="linkedinUrl" label="LinkedIn URL" defaultValue={defaults.linkedinUrl ?? ""} error={errors.linkedinUrl} />
      <TextField name="avatarUrl" label="Avatar URL" defaultValue={defaults.avatarUrl ?? ""} />
      <TextAreaField name="bio" label="Short bio" defaultValue={defaults.bio ?? ""} placeholder="Tell partners about your academic interests, skills, or project focus." />
    </div>
  );
}
