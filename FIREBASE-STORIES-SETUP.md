# Enable community story publishing

The editor uses this website's existing Firebase project, `kitsamba-writes-africa`.
GitHub Pages serves the editor; Firebase Authentication identifies writers; Firestore stores published stories.

1. Open the existing Firebase project in the Firebase console.
2. Enable Cloud Firestore, using production mode rather than open test rules.
3. Review the current database rules. Merge the `match /communityStories/{storyId}` block from `firebase-stories.rules` inside the existing `/databases/{database}/documents` block. Preserve any rules for other collections. Publish the rules. Do not simply enable unrestricted public writes.
4. Keep the site's existing Authentication providers enabled, and ensure `kitsambajoshua.github.io` is an authorised domain.
5. Test while signed out: Add a Story must lead to sign-in. Sign in, write a test, publish it, and confirm it appears under the selected category on another device. Remove any test content through the Firebase console afterwards.

Only the author may write or update their stories; published stories are publicly readable. Text is rendered as text, never HTML. Drafts are browser-local and account-specific. No Firebase admin credential belongs in this repository.

The GitHub connection cannot enable the database or publish Firebase security rules. Until that setup is complete, writers can sign in and save drafts locally, but cloud publication may be unavailable. Public visibility should not be claimed until a cross-device publication test succeeds.
