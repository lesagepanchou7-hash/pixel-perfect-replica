<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Use shared workspace shells and browser-safe content definitions with distinct TanStack leaf routes, so public, learning and technical pages remain consistent and individually discoverable.
- Keep anonymous demo preferences in validated tab-scoped sessionStorage, restored after hydration; defer durable cross-device preferences and accounts to Cloud integration to avoid collecting personal information during onboarding.
- Keep one pure versioned circuit model for 2D/3D and an ml-matrix modified-nodal-analysis solver; report only validated numerical outputs and reject invalid or underdetermined topologies.
- Mount the procedural electrical teaching apparatus behind a client-only lazy R3F boundary; convert CSS OKLCH material tokens to browser-resolved RGB before passing them to Three.js.
- Keep live tutor calls authenticated and check protected adult_access in profiles; never grant clients write access to access-approval fields.
<!-- AGENT-MEMORY:END -->
