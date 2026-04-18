# Security Specification - StudentJobsPK

## Data Invariants
1. A user can only access their own profile and saved jobs.
2. Jobs can be read by anyone if they are 'approved'.
3. Only admins can create, update, or delete jobs.
4. Users can save/remove jobs for themselves.
5. Admin status is determined by existence in the `/admins/` collection.

## The "Dirty Dozen" Payloads (Deny Cases)
1. **Identity Spoofing**: User A trying to update User B's profile.
2. **Privilege Escalation**: Non-admin user trying to create a job.
3. **Shadow Update**: Admin trying to update a job with an unlisted field `isFeatured: true`.
4. **ID Poisoning**: Creating a job with a 2MB string as ID.
5. **PII Leak**: Guest user trying to list all users' emails.
6. **State Shortcutting**: Non-admin user trying to 'approve' their own manually submitted job.
7. **Value Poisoning**: Updating a job's salary with an array instead of a string.
8. **Orphaned Record**: Saving a job that doesn't exist in the `/jobs/` collection.
9. **Terminal State Lockdown**: Trying to edit a job that is marked as 'expired'.
10. **Resource Exhaustion**: Sending a 10,000 element `tags` array.
11. **Timestamp Spoofing**: Setting `createdAt` to a date in the future.
12. **Self-Promotion**: User trying to add their own UID to the `/admins/` collection.

## Test Runner (firestore.rules.test.ts)
(Logic for these tests will be implemented to ensure PERMISSION_DENIED on all above).
