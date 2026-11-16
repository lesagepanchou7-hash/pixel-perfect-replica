CREATE TABLE public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name text NOT NULL DEFAULT '', learning_level text NOT NULL DEFAULT 'foundation', environment text NOT NULL DEFAULT 'learn', interests text[] NOT NULL DEFAULT '{}', adult_access boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_profile_read ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY own_profile_update ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE FUNCTION public.create_engineering_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN INSERT INTO public.profiles(id) VALUES (NEW.id); RETURN NEW; END; $$;
CREATE TRIGGER engineering_profile_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_engineering_profile();