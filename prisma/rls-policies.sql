-- Enable RLS for real application tables. Do not enable RLS for _prisma_migrations.

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudentProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IndustryProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "University" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subcategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectOpportunity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectLink" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectMedia" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectFile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectTeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectSupervisor" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectOwnershipDeclaration" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BadgeAssignment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContactRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PrivateAccessRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FileAccessGrant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NdaAgreement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ConversationParticipant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DealRoom" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DealDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Plan" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContactCredit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FeaturedListing" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectReview" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Report" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ModerationAction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SavedProject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectView" ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM "User"
    WHERE "authUserId" = auth.uid()::text
    AND "userType" = 'ADMIN'
    AND "status" = 'ACTIVE'
  );
$$;

CREATE POLICY "Public can read active categories" ON "Category" FOR SELECT USING ("isActive" = true);
CREATE POLICY "Public can read active subcategories" ON "Subcategory" FOR SELECT USING ("isActive" = true);
CREATE POLICY "Public can read universities" ON "University" FOR SELECT USING (true);
CREATE POLICY "Public can read tags" ON "Tag" FOR SELECT USING (true);
CREATE POLICY "Public can read badges" ON "Badge" FOR SELECT USING (true);

CREATE POLICY "Public can read published projects"
ON "Project"
FOR SELECT
USING ("reviewStatus" = 'PUBLISHED' AND "visibility" IN ('PUBLIC', 'REQUEST_ONLY'));

CREATE POLICY "Public can read published project media"
ON "ProjectMedia"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Project"
    WHERE "Project"."id" = "ProjectMedia"."projectId"
    AND "Project"."reviewStatus" = 'PUBLISHED'
    AND "Project"."visibility" IN ('PUBLIC', 'REQUEST_ONLY')
  )
);

CREATE POLICY "Public can read public project links"
ON "ProjectLink"
FOR SELECT
USING (
  "visibility" = 'PUBLIC'
  AND EXISTS (
    SELECT 1 FROM "Project"
    WHERE "Project"."id" = "ProjectLink"."projectId"
    AND "Project"."reviewStatus" = 'PUBLISHED'
    AND "Project"."visibility" IN ('PUBLIC', 'REQUEST_ONLY')
  )
);

CREATE POLICY "Public can read project opportunities"
ON "ProjectOpportunity"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Project"
    WHERE "Project"."id" = "ProjectOpportunity"."projectId"
    AND "Project"."reviewStatus" = 'PUBLISHED'
    AND "Project"."visibility" IN ('PUBLIC', 'REQUEST_ONLY')
  )
);

CREATE POLICY "Public can read project tags"
ON "ProjectTag"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "Project"
    WHERE "Project"."id" = "ProjectTag"."projectId"
    AND "Project"."reviewStatus" = 'PUBLISHED'
    AND "Project"."visibility" IN ('PUBLIC', 'REQUEST_ONLY')
  )
);

CREATE POLICY "Users can read own user"
ON "User"
FOR SELECT
USING ("authUserId" = auth.uid()::text OR public.is_admin());

CREATE POLICY "Users can update own user"
ON "User"
FOR UPDATE
USING ("authUserId" = auth.uid()::text OR public.is_admin())
WITH CHECK ("authUserId" = auth.uid()::text OR public.is_admin());

CREATE POLICY "Students can manage own profile"
ON "StudentProfile"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "StudentProfile"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "StudentProfile"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Industry partners can manage own profile"
ON "IndustryProfile"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "IndustryProfile"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "IndustryProfile"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Project owners can manage own projects"
ON "Project"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "Project"."ownerId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "Project"."ownerId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Project owners can manage media"
ON "ProjectMedia"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "Project"
    JOIN "User" ON "User"."id" = "Project"."ownerId"
    WHERE "Project"."id" = "ProjectMedia"."projectId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Project"
    JOIN "User" ON "User"."id" = "Project"."ownerId"
    WHERE "Project"."id" = "ProjectMedia"."projectId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Project owners can manage files"
ON "ProjectFile"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "Project"
    JOIN "User" ON "User"."id" = "Project"."ownerId"
    WHERE "Project"."id" = "ProjectFile"."projectId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "Project"
    JOIN "User" ON "User"."id" = "Project"."ownerId"
    WHERE "Project"."id" = "ProjectFile"."projectId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Users can read related contact requests"
ON "ContactRequest"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "User"."id" IN ("ContactRequest"."requesterId", "ContactRequest"."ownerId")
  )
  OR public.is_admin()
);

CREATE POLICY "Authenticated users can create contact requests"
ON "ContactRequest"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "User"."id" = "ContactRequest"."requesterId"
  )
);

CREATE POLICY "Owners and requesters can update contact requests"
ON "ContactRequest"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "User"."id" IN ("ContactRequest"."requesterId", "ContactRequest"."ownerId")
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "User"."id" IN ("ContactRequest"."requesterId", "ContactRequest"."ownerId")
  )
  OR public.is_admin()
);

CREATE POLICY "Users can read related private access requests"
ON "PrivateAccessRequest"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    JOIN "Project" ON "Project"."ownerId" = "User"."id"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "Project"."id" = "PrivateAccessRequest"."projectId"
  )
  OR EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "User"."id" = "PrivateAccessRequest"."requesterId"
  )
  OR public.is_admin()
);

CREATE POLICY "Authenticated users can create private access requests"
ON "PrivateAccessRequest"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."authUserId" = auth.uid()::text
    AND "User"."id" = "PrivateAccessRequest"."requesterId"
  )
);

CREATE POLICY "Conversation participants can read conversations"
ON "Conversation"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "ConversationParticipant"
    JOIN "User" ON "User"."id" = "ConversationParticipant"."userId"
    WHERE "ConversationParticipant"."conversationId" = "Conversation"."id"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Conversation participants can read messages"
ON "Message"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "ConversationParticipant"
    JOIN "User" ON "User"."id" = "ConversationParticipant"."userId"
    WHERE "ConversationParticipant"."conversationId" = "Message"."conversationId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Users can read own notifications"
ON "Notification"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "Notification"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Users can manage own saved projects"
ON "SavedProject"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "SavedProject"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = "SavedProject"."userId"
    AND "User"."authUserId" = auth.uid()::text
  )
  OR public.is_admin()
);

CREATE POLICY "Admins can manage all rows on BadgeAssignment" ON "BadgeAssignment" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ProjectTeamMember" ON "ProjectTeamMember" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ProjectSupervisor" ON "ProjectSupervisor" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ProjectOwnershipDeclaration" ON "ProjectOwnershipDeclaration" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on VerificationRequest" ON "VerificationRequest" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on FileAccessGrant" ON "FileAccessGrant" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on NdaAgreement" ON "NdaAgreement" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ConversationParticipant" ON "ConversationParticipant" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on DealRoom" ON "DealRoom" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on DealDocument" ON "DealDocument" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on Plan" ON "Plan" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on Subscription" ON "Subscription" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ContactCredit" ON "ContactCredit" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on Payment" ON "Payment" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on FeaturedListing" ON "FeaturedListing" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ProjectReview" ON "ProjectReview" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on Report" ON "Report" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage all rows on ModerationAction" ON "ModerationAction" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can read audit logs" ON "AuditLog" FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage all rows on ProjectView" ON "ProjectView" FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
