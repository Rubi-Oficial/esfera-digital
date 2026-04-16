-- 1. Admin-only DELETE policy on user_roles (allows revoking roles)
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Realtime channel authorization: restrict realtime.messages so a user can
--    only subscribe to topics that include their own user_id.
--    Convention used by clients: topic = 'subscriptions:' || auth.uid()
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- Authenticated users may only read broadcast/presence events on a topic
-- that ends with their own user_id (e.g. 'subscriptions:<uuid>'),
-- or on topics that do NOT carry sensitive user data.
DROP POLICY IF EXISTS "Authenticated can read own user-scoped topics" ON realtime.messages;
CREATE POLICY "Authenticated can read own user-scoped topics"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  -- Allow only when the topic explicitly targets this user
  realtime.topic() = 'subscriptions:' || auth.uid()::text
  OR realtime.topic() = 'user:' || auth.uid()::text
);

-- Authenticated users may only send broadcast/presence to their own topic.
DROP POLICY IF EXISTS "Authenticated can write own user-scoped topics" ON realtime.messages;
CREATE POLICY "Authenticated can write own user-scoped topics"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (
  realtime.topic() = 'subscriptions:' || auth.uid()::text
  OR realtime.topic() = 'user:' || auth.uid()::text
);