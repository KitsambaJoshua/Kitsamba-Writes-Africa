# Story publishing and administrator setup

See `ADMIN-SETUP.md` for the one-time Firebase configuration, protected administrator role and acceptance tests. The reader editor now submits stories as **pending**. Administrators approve them in `admin.html`; only approved stories appear publicly.

Firestore and Storage rules must be reviewed and deployed to the existing Firebase project before enabling public writes. Committing rule files to GitHub does not activate them.
