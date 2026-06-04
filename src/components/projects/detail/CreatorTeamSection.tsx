import type { ProjectDetail } from "@/lib/projects/detail-queries";
import { formatProjectValue, TrustBadge } from "./project-detail-utils";
import { RequestContactModal } from "./RequestContactModal";

export function CreatorTeamSection({ project }: { project: ProjectDetail }) {
  const profile = project.owner.studentProfile;
  const team = project.teamMembers.filter((member) => member.consentStatus === "ACCEPTED").slice(0, 6);
  const supervisorCount = project.supervisors.length;
  const teamCount = project.teamMembers.length;

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/[0.04]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Creator / Team</p>
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="!text-slate-950 text-2xl font-black">{project.owner.fullName}</h2>
          <p className="mt-2 text-sm font-bold text-slate-500">
            {profile?.degreeProgram ?? profile?.faculty ?? "Student creator"} {project.university ? `- ${project.university.name}` : ""}
          </p>
          {profile?.bio ? <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{profile.bio}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {profile?.verificationStatus === "VERIFIED" ? <TrustBadge label="Student Verified" /> : null}
            {project.verified ? <TrustBadge label="Admin Reviewed" /> : null}
            {project.ownership?.allMembersAgreed ? <TrustBadge label="Team Consent Added" /> : null}
          </div>
        </div>
        <RequestContactModal
          projectTitle={project.title}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white"
        />
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Team members</p>
          <p className="mt-2 text-lg font-black text-slate-950">{teamCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Supervisor records</p>
          <p className="mt-2 text-lg font-black text-slate-950">{supervisorCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Consent status</p>
          <p className="mt-2 text-sm font-black text-slate-950">{project.ownership?.allMembersAgreed ? "Recorded" : "Review during request"}</p>
        </div>
      </div>

      {team.length > 0 ? (
        <div className="mt-7">
          <h3 className="!text-slate-950 text-lg font-black">Public team members</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {team.map((member) => (
              <div key={`${member.fullName}-${member.role}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-black text-slate-950">{member.fullName}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{member.role ?? "Team member"}</p>
                <p className="mt-2 text-xs font-bold text-slate-400">{formatProjectValue(member.consentStatus)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {project.supervisors.length > 0 ? (
        <div className="mt-7">
          <h3 className="!text-slate-950 text-lg font-black">Supervisor records</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.supervisors.map((supervisor) => (
              <div key={`${supervisor.name}-${supervisor.role}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="font-black text-slate-950">{supervisor.name}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{supervisor.role ?? "Supervisor"}</p>
                <p className="mt-2 text-xs font-bold text-slate-400">{formatProjectValue(supervisor.permissionStatus)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
