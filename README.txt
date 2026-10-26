KITSAMBA WRITES AFRICA — SITE UPDATE PACK

IMPORTANT
I could read your public GitHub files, but the connected GitHub integration refused write access. So these are prepared edits, not live website changes yet.

WHAT'S INCLUDED
1. homepage-founder-section.html
   Replace the existing <section class="author-section">...</section> in index.html.
   The image path is images/kitsamba-joshua-new.jpg.

2. stakeholders-supporters-section.html
   Replace only the lower cards/support section in stakeholders.html.
   Keep the hero and the founder/CEO/inspiration section above it.
   Kitamba Paul's photo is represented by a temporary KP placeholder. When you get his photo, upload it into the images folder and replace the placeholder with an img element.

3. theme-overrides.css
   Add these rules inside the CSS template string in theme.js, immediately before the template string's closing backtick. This keeps the existing theme toggle and makes dark mode consistently black/navy and light mode consistently cream/white.

IMPORTANT THEME NOTE
Your existing theme.js remembers the user's theme in localStorage. Pages that don't load theme.js won't share the toggle yet. Ensure poems.html and plays.html also include <script src="theme.js"></script> before </head>. We should check any other page that lacks it before calling the theme rollout complete.

No changes have been published to the live website by this pack alone. After you open the files in GitHub, I can guide you through applying each part one step at a time.
