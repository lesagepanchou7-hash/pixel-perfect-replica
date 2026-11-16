REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (display_name, learning_level, environment, interests) ON public.profiles TO authenticated;
CREATE TABLE public.ai_service_state (id text PRIMARY KEY, reason text NOT NULL, status integer NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.ai_service_state TO service_role;
ALTER TABLE public.ai_service_state ENABLE ROW LEVEL SECURITY;