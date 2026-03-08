insert into public.notes (title, body)
values
  (
    'Start with a single feature slice',
    'Pick one user-facing workflow and carry it from schema to UI before expanding the app.'
  ),
  (
    'Keep auth and app data separate',
    'Use auth to protect the route, then load your product data inside that protected area.'
  ),
  (
    'Add migrations next',
    'Once you are happy with the notes example, track the table in Supabase migrations and seed it locally.'
  )
on conflict do nothing;
