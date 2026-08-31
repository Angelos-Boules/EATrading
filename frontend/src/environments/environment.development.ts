// Local dev backend. Requests go through the ng serve proxy (see proxy.conf.json)
// so the browser never makes a cross-origin call and CORS never comes into play.
// Point proxy.conf.json's target at whichever host you're testing against.
export const environment = {
    production: false,
    apiBaseUrl: '',
    // Supabase project's URL and anon (public) key.
    supabaseUrl: 'https://fnefqtyromkitlflsksh.supabase.co',
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuZWZxdHlyb21raXRsZmxza3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NzIzNjIsImV4cCI6MjEwMzM0ODM2Mn0.BqTuAmAEArVwtRDdM3ec6XXyHCGvXOw44-G_1QFNKvk',
};
